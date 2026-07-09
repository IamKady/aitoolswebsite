import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const reviewSchema = z.object({
  toolId: z.string(),
  title: z.string().min(5).max(100),
  body: z.string().min(20).max(2000),
  rating: z.number().min(1).max(5),
  easeOfUse: z.number().min(1).max(5).optional(),
  valueForMoney: z.number().min(1).max(5).optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from DB
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const data = reviewSchema.parse(body);

    // Check for duplicate review
    const existing = await prisma.review.findFirst({
      where: { userId: user.id, toolId: data.toolId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You have already reviewed this tool" },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    // Recalculate tool rating
    const ratings = await prisma.review.aggregate({
      where: { toolId: data.toolId, status: "APPROVED" },
      _avg: { rating: true },
      _count: { id: true },
    });

    await prisma.aITool.update({
      where: { id: data.toolId },
      data: {
        rating: ratings._avg.rating || 0,
        reviewCount: ratings._count.id,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    console.error("[REVIEW_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
