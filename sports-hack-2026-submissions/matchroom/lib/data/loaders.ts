import { getSeededBrief, gameMetadata, heroReplay, statcastSummary } from "@/lib/data/seeded";
import type { VerifiedBriefResponse } from "@/lib/types/matchroom";

export async function loadDemoBrief(coachQuestion?: string): Promise<VerifiedBriefResponse> {
  return getSeededBrief(coachQuestion);
}

export function loadSeededAssets() {
  return {
    brief: getSeededBrief(),
    gameMetadata,
    heroReplay,
    statcastSummary
  };
}
