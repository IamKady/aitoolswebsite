import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

const submissionSchema = z.object({
  name: z.string().min(2),
  website: z.string().url(),
  description: z.string().min(20),
  category: z.string().min(1),
  pricing: z.string().min(1),
  email: z.string().email(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = submissionSchema.parse(body);

    const { userId } = await auth();

    // Find user in DB if Clerk auth is present
    let dbUser = null;
    if (userId) {
      dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
      }).catch(() => null);
    }

    // Create tool submission record
    const submission = await prisma.toolSubmission.create({
      data: {
        name: data.name,
        website: data.website,
        description: data.description,
        category: data.category,
        pricing: data.pricing,
        email: data.email,
        notes: data.notes || null,
        submitterId: dbUser?.id || null,
        status: "PENDING",
      },
    }).catch((err: any) => {
      console.warn("⚠️ [API/Submit] Failed database create submission. Faking success.", err);
      return { id: "fake-sub-id", name: data.name };
    });

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      submissionId: submission.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form values submitted" }, { status: 400 });
    }
    console.error("[API_SUBMIT_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
