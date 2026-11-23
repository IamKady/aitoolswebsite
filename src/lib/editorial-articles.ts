export type EditorialSource = {
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
};

export type EditorialArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: null;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: null;
  metaTitle: string;
  metaDescription: string;
  published: true;
  featured: boolean;
  viewCount: number;
  readingTime: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  sources: EditorialSource[];
};

const publishedAt = new Date("2026-11-23T12:00:00Z");

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: "editorial-ai-funding-india-2026",
    title: "India’s AI funding reached $1.6B. The concentration matters as much as the total.",
    slug: "india-ai-funding-2026-concentration",
    excerpt:
      "A 2026 funding headline points to a fast-growing AI sector—but a closer look shows how a small number of large rounds shaped the total.",
    content: `India’s AI companies raised $1.6 billion in equity funding during the first nine months of 2026, according to figures from Tracxn reported by The Hindu BusinessLine on November 23. That is a sharp year-over-year increase. But the headline number alone does not tell us how widely that capital was distributed.

## A record total, concentrated in a few deals

The report covered January through September. It counted 87 funding rounds, compared with 149 in the same period of 2025. The ten largest rounds accounted for $1.5 billion—about 90% of the total. In other words, the total rose even as the number of rounds fell.

The gap between those two measures changes the story. A large aggregate can indicate major investor confidence in AI infrastructure and applications, while still leaving many early companies without new funding. It is more accurate to describe this as a strong period for a handful of large deals than as a broad funding boom for every AI startup.

## Where the money went

The BusinessLine report says the largest disclosed round was a $600 million Series B for Mumbai-based AI cloud provider Neysa. Bengaluru-based Sarvam raised $255 million in a Series B and a further $90.4 million in August. Mumbai and Bengaluru together accounted for most of the reported funding.

Those examples also point to a wider industry question: will the next phase of AI growth reward companies building expensive compute infrastructure, or companies turning AI into products customers repeatedly pay for? Funding figures show where investors placed capital; they do not prove which business models will become sustainable.

## How to read AI funding headlines

When comparing funding reports, look beyond the headline total:

- **Count the rounds as well as the dollars.** A bigger total with fewer deals may signal concentration.
- **Check the period and comparison.** Nine-month figures should not be compared casually with full-year totals.
- **Separate announced funding from operating results.** Capital raised is not revenue, product adoption, or profitability.
- **Look at the source and method.** Tracxn’s report is the underlying dataset cited in the news coverage; the figures depend on how companies and rounds are classified.

The useful takeaway is not that every AI startup is suddenly better funded. It is that investor interest is substantial, but uneven. For founders, workers, and customers, the next signals to watch are follow-on funding, customer adoption, and whether infrastructure spending turns into useful services.`,
    coverImage: null,
    category: "news",
    tags: ["AI funding", "India", "startups", "AI industry"],
    author: "ToolWire Editorial",
    authorAvatar: null,
    metaTitle: "India AI Funding 2026: Why Deal Concentration Matters",
    metaDescription:
      "India AI companies raised $1.6B in the first nine months of 2026. See why fewer rounds and a handful of large deals put that headline in context.",
    published: true,
    featured: true,
    viewCount: 0,
    readingTime: 4,
    publishedAt,
    createdAt: publishedAt,
    updatedAt: publishedAt,
    sources: [
      {
        title: "India AI funding nearly doubles to $1.6 billion in 9M 2026: Tracxn",
        publisher: "The Hindu BusinessLine",
        url: "https://www.thehindubusinessline.com/info-tech/india-ai-funding-nearly-doubles-to-16-billion-in-9m-2026-tracxn/article71734283.ece",
        publishedAt: "November 23, 2026",
      },
    ],
  },
  {
    id: "editorial-medchembench-ai-drug-discovery",
    title: "AI drug-discovery benchmarks: what MedChemBench can—and can’t—prove",
    slug: "ai-drug-discovery-medchembench-explained",
    excerpt:
      "MedChemBench tests AI on medicinal-chemistry problems. Here is what a benchmark can measure, what it cannot establish, and why lab validation still matters.",
    content: `AI in drug research is often described in sweeping terms: finding new medicines, accelerating discovery, or replacing costly experiments. A new benchmark can help make those claims more precise—but it cannot answer all of them.

OpenAI introduced MedChemBench on November 20, 2026. The company describes it as a set of 99 problems drawn from 117 papers and patents, covering 761 molecular structures. The tasks ask models to interpret chemical structures and experimental evidence, compare compounds, and predict properties.

## What the benchmark tests

Medicinal chemists often have to balance competing properties. A chemical change might improve a compound’s activity against a biological target but make it less absorbable or less stable. MedChemBench tests several parts of this reasoning process:

- Reconstructing molecular structures, including atom connections and stereochemistry.
- Explaining conclusions using the experimental evidence provided.
- Ranking or selecting compounds against stated criteria.
- Predicting measured or calculated chemical properties.

OpenAI reports stronger results on structure reconstruction and evidence-based explanations than on compound selection and numerical predictions. Those are the company’s reported benchmark results, not an independent assessment of a medicine’s effectiveness.

## What a benchmark score does not mean

A benchmark is a controlled evaluation. It can show how a model performs on a defined set of tasks, but it does not demonstrate that the model discovered a viable drug or improved outcomes for patients.

The authors note important limitations: the problems come from published research, previous exposure to source material cannot be ruled out, and each response was a single attempt without tools, feedback, or new experiments. Real research includes uncertainty, changing hypotheses, specialized instruments, and results that may not match the literature.

That distinction matters for everyone reading AI science news. Strong performance on historical problems is a useful research signal. It is not the same as testing a new compound in a lab, establishing safety, or proving clinical benefit.

## Questions worth asking about AI research claims

Before treating a benchmark as evidence of real-world impact, ask:

- What task was measured, and what was outside the test?
- Were the examples drawn from public sources that may have appeared in training data?
- Were results repeated, independently reviewed, or tested with tools and expert feedback?
- Is the claim about a benchmark score, a laboratory result, or a treatment outcome?

Benchmarks like MedChemBench can help researchers identify where models may assist and where errors remain. The next meaningful step is careful validation in the workflows and experiments where these systems are intended to help.`,
    coverImage: null,
    category: "guide",
    tags: ["AI research", "drug discovery", "science", "benchmarks"],
    author: "ToolWire Editorial",
    authorAvatar: null,
    metaTitle: "MedChemBench Explained: AI Drug Discovery Limits",
    metaDescription:
      "Learn what MedChemBench evaluates, what its results can show about AI and medicinal chemistry, and why benchmark scores are not drug discoveries.",
    published: true,
    featured: true,
    viewCount: 0,
    readingTime: 5,
    publishedAt,
    createdAt: publishedAt,
    updatedAt: publishedAt,
    sources: [
      {
        title: "Can AI help scientists identify promising drug candidates? Introducing MedChemBench",
        publisher: "OpenAI Research",
        url: "https://openai.com/index/introducing-medchembench/",
        publishedAt: "November 20, 2026",
      },
    ],
  },
  {
    id: "editorial-ai-perplexity-metric",
    title: "AI model perplexity explained: a useful progress signal, not a measure of everything",
    slug: "ai-model-perplexity-progress-metric",
    excerpt:
      "OpenAI’s recent proposal has renewed discussion about perplexity as a way to track model progress. Learn what it measures—and what it leaves out.",
    content: `A model can produce fluent answers and still be unreliable, unsafe, or poor at a specific job. That is why the choice of evaluation metric matters. In a November 22, 2026 essay, OpenAI Chief Scientist Jakub Pachocki argued that perplexity could help the AI industry compare pretraining progress and develop shared safety standards.

## What perplexity measures

In simple terms, perplexity describes how well a language model predicts the next token in text it has not seen during evaluation. Lower perplexity generally means the model assigned higher probability to the observed sequence on that dataset. Researchers often report log perplexity, also called cross-entropy loss.

It is a signal about prediction on a particular set of data. It is not a direct score for whether a chatbot gives useful advice, cites sources correctly, follows instructions, or behaves safely.

## Why researchers are discussing it

Pachocki’s argument is that pretraining metrics may offer a relatively stable way to track one part of model development as task-specific benchmarks change or become saturated. He also suggests that shared transparency around such measurements could support discussion of safety thresholds.

That is a proposal from one AI developer, not an established cross-industry standard. The essay itself describes several caveats: different labs use different datasets and data mixtures; perplexity does not directly measure a task people care about; and it misses capability changes that come from techniques outside pretraining, such as inference-time reasoning.

## How to use this idea when choosing AI tools

For people comparing assistants, perplexity is usually not a practical product-selection score. A lower number on one dataset does not guarantee better performance on your writing, research, coding, or accessibility needs.

Instead, test a tool on representative tasks and check:

- Whether its answer is accurate and appropriately uncertain.
- Whether important claims can be verified from trustworthy sources.
- How it handles your data and whether the settings fit your privacy needs.
- Whether it performs consistently, not just on one polished example.

Perplexity can contribute to a broader research picture, but no single metric captures intelligence, usefulness, or risk. Good evaluation combines measurements with real task tests, transparent limitations, and safety review.`,
    coverImage: null,
    category: "guide",
    tags: ["AI research", "machine learning", "evaluation", "AI safety"],
    author: "ToolWire Editorial",
    authorAvatar: null,
    metaTitle: "AI Model Perplexity: Meaning, Uses, and Limits",
    metaDescription:
      "Understand AI model perplexity, why researchers use it to track language-model progress, and why it cannot measure usefulness or safety by itself.",
    published: true,
    featured: true,
    viewCount: 0,
    readingTime: 5,
    publishedAt,
    createdAt: publishedAt,
    updatedAt: publishedAt,
    sources: [
      {
        title: "Perplexity and Intelligence",
        publisher: "OpenAI",
        url: "https://openai.com/index/perplexity-and-intelligence/",
        publishedAt: "November 22, 2026",
      },
    ],
  },
  {
    id: "editorial-frontier-ai-safety-lifecycle",
    title: "AI safety does not end at training: safeguards across deployment",
    slug: "frontier-ai-safety-training-to-deployment",
    excerpt:
      "As AI tools gain access to files, software, and networks, safety depends on more than model training. Here are the lifecycle controls worth understanding.",
    content: `AI assistants are moving from answering questions to using tools, editing files, and taking actions in software. That shift makes a simple question more important: what safeguards apply after a model leaves the training environment?

An OpenAI safety post published on November 18, 2026 describes a “defense in depth” approach across research, internal use, and external deployment. The details are the company’s description of its own process, not a universal standard. But the lifecycle framing is useful for organizations deciding how to adopt agentic tools.

## Different stages have different risks

During research, systems may be tested in restricted environments while their behavior is still being evaluated. In internal deployment, an assistant may receive access to real company tools and information. Public release adds a larger and more varied group of users, including people who may deliberately misuse the system.

A safeguard that is sufficient for a narrow experiment may not be sufficient once a model can browse, run code, or interact with business data. Risk changes with the model’s capabilities, the permissions it receives, and the scale of its use.

## Layers work better than a single promise

The company’s post describes combining isolation, monitoring, evaluations, system-level controls, and review before advancing between stages. The general lesson is broader than any one vendor: do not rely on a model’s training alone to prevent every failure.

For teams using AI tools, a practical baseline is:

- Give the assistant only the file, account, and tool access it needs.
- Require human review before important external actions or irreversible changes.
- Keep activity logs and make it possible to pause or revoke access.
- Test the workflow with realistic edge cases before expanding who can use it.
- Revisit controls when the tool gains new capabilities or integrations.

These are not guarantees of safety. They make it easier to limit mistakes, notice unexpected behavior, and respond when something goes wrong.

## What users should look for

When evaluating an AI agent, ask what it can access, which actions require approval, what gets recorded, and how to disable it. For business use, also check the provider’s data-retention terms and your organization’s own review process.

The central point is that deployment is not a one-time handoff. A useful safety program follows the system as it gains access and responsibility, and adjusts controls as the risks change.`,
    coverImage: null,
    category: "guide",
    tags: ["AI safety", "AI agents", "privacy", "business"],
    author: "ToolWire Editorial",
    authorAvatar: null,
    metaTitle: "AI Safety Beyond Training: Deployment Safeguards",
    metaDescription:
      "Learn why AI safety needs layered safeguards across research, internal use, and public deployment—and what teams should check before using AI agents.",
    published: true,
    featured: true,
    viewCount: 0,
    readingTime: 5,
    publishedAt,
    createdAt: publishedAt,
    updatedAt: publishedAt,
    sources: [
      {
        title: "Managing frontier AI risk: From training to deployment",
        publisher: "OpenAI",
        url: "https://openai.com/index/managing-frontier-ai-risk/",
        publishedAt: "November 18, 2026",
      },
    ],
  },
];

export function getEditorialArticle(slug: string) {
  return EDITORIAL_ARTICLES.find((article) => article.slug === slug);
}

export function mergeEditorialArticles<
  T extends { slug: string; publishedAt?: Date | null },
>(databasePosts: T[]) {
  const postsBySlug = new Map<string, T | EditorialArticle>();

  for (const article of EDITORIAL_ARTICLES) {
    postsBySlug.set(article.slug, article);
  }
  for (const post of databasePosts) {
    if (!postsBySlug.has(post.slug)) postsBySlug.set(post.slug, post);
  }

  return [...postsBySlug.values()].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime(),
  );
}
