export type Confidence = "rumor" | "leaked" | "confirmed";

export interface UpcomingModel {
  name: string;
  org: string;
  releaseWindow: string;
  /** Sort key: estimated release as YYYY-MM (approximate) */
  releaseSortKey: string;
  confidence: Confidence;
  sourceUrl: string;
  sourceLabel: string;
  lastUpdated: string;
  notes?: string;
}

export const models: UpcomingModel[] = [
  {
    name: "DeepSeek V4",
    org: "DeepSeek",
    releaseWindow: "Q2 2026",
    releaseSortKey: "2026-04",
    confidence: "leaked",
    sourceUrl: "https://evolink.ai/blog/deepseek-v4-release-window-prep",
    sourceLabel: "Evolink",
    lastUpdated: "2026-03-31",
    notes:
      "~1T params, optimized for coding/long-context. Originally targeted Feb 2026 but delayed. V4 Lite appeared on DeepSeek website March 9.",
  },
  {
    name: "DeepSeek R2",
    org: "DeepSeek",
    releaseWindow: "Q2 2026",
    releaseSortKey: "2026-05",
    confidence: "leaked",
    sourceUrl: "https://manifold.markets/Bayesian/when-will-deepseek-release-r2",
    sourceLabel: "Manifold Markets",
    lastUpdated: "2026-03-31",
    notes:
      "Next-gen reasoning model. Rumored double-release synced with V4.",
  },
  {
    name: "Llama 4 Behemoth",
    org: "Meta",
    releaseWindow: "H2 2026",
    releaseSortKey: "2026-09",
    confidence: "rumor",
    sourceUrl: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
    sourceLabel: "Meta AI Blog",
    lastUpdated: "2026-03-31",
    notes:
      "288B-active MoE, largest Llama 4 variant. Meta pushed release to fall 2026 or later. Originally announced alongside Scout/Maverick.",
  },
  {
    name: "Llama 5 / Avocado",
    org: "Meta",
    releaseWindow: "H2 2026 – 2027",
    releaseSortKey: "2026-09",
    confidence: "rumor",
    sourceUrl: "https://news.aibase.com/news/23528",
    sourceLabel: "AI Base",
    lastUpdated: "2026-03-31",
    notes:
      "Codenamed 'Avocado'. May abandon open-source for closed-source commercial approach. Timeline uncertain.",
  },
  {
    name: "Nemotron 3 Ultra",
    org: "NVIDIA",
    releaseWindow: "H1 2026",
    releaseSortKey: "2026-06",
    confidence: "confirmed",
    sourceUrl: "https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models",
    sourceLabel: "NVIDIA Newsroom",
    lastUpdated: "2026-03-31",
    notes:
      "Largest Nemotron 3 variant. Enterprise-focused, expected alongside Super.",
  },
  {
    name: "Qwen 4",
    org: "Alibaba",
    releaseWindow: "Q3 2026",
    releaseSortKey: "2026-08",
    confidence: "rumor",
    sourceUrl: "https://huggingface.co/Qwen",
    sourceLabel: "Qwen HuggingFace",
    lastUpdated: "2026-03-31",
    notes:
      "Expected successor to Qwen 3 series. Alibaba has maintained ~6-month release cadence. No official announcement yet.",
  },
  {
    name: "Gemma 4",
    org: "Google",
    releaseWindow: "Q3 2026",
    releaseSortKey: "2026-08",
    confidence: "rumor",
    sourceUrl: "https://blog.google/technology/developers/gemma-3/",
    sourceLabel: "Google Blog",
    lastUpdated: "2026-03-31",
    notes:
      "Expected follow-up to Gemma 3. Google maintains steady open-model cadence.",
  },
  {
    name: "Kimi K3",
    org: "Moonshot AI",
    releaseWindow: "H2 2026",
    releaseSortKey: "2026-10",
    confidence: "rumor",
    sourceUrl: "https://www.moonshot.cn/",
    sourceLabel: "Moonshot AI",
    lastUpdated: "2026-03-31",
    notes:
      "Successor to K2.5. Moonshot AI rapidly iterating on MoE architectures.",
  },
];
