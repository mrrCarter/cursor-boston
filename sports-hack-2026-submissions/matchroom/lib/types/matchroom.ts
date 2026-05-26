export type Confidence = "low" | "medium" | "high";

export interface EvidenceRef {
  pitchId: string;
  gamePk: number;
  inning: number;
  halfInning: "top" | "bottom";
  atBatIndex: number;
  pitchNumber: number;
  pitcher?: string;
  batter?: string;
  pitchType?: string;
  description: string;
  plateX?: number;
  plateZ?: number;
  exitVelocity?: number;
  launchAngle?: number;
}

export interface TacticalInsight {
  id: string;
  title: string;
  claim: string;
  confidence: Confidence;
  status: "accepted" | "revised" | "rejected";
  evidence: EvidenceRef[];
  skepticNote?: string;
  whyItMatters: string;
  recommendedAction: string;
}

export interface VerifiedBriefResponse {
  mode: "seeded" | "live";
  generatedAt: string;
  game: {
    league: "MLB";
    season: number;
    gamePk: number;
    date: string;
    homeTeam: string;
    awayTeam: string;
    score?: string;
    stadium?: string;
    dataSource: string;
  };
  coachQuestion: string;
  executiveSummary: string;
  attackingPlan: TacticalInsight[];
  defensiveAlignment: TacticalInsight[];
  pitchingPlan: TacticalInsight[];
  riskFlags: TacticalInsight[];
  coachActions: string[];
  evidenceNotes: string[];
}

export interface PitchPoint {
  pitchId: string;
  t: number;
  plateX: number;
  plateZ: number;
  pitchType: string;
  velocity: number;
  result: "ball" | "called_strike" | "swing_miss" | "foul" | "in_play";
  label?: string;
}

export interface BattedBallPoint {
  x: number;
  y: number;
  exitVelocity: number;
  launchAngle: number;
  result: string;
}

export interface HeroAtBat {
  gamePk: number;
  label: string;
  pitches: PitchPoint[];
  battedBall?: BattedBallPoint;
  computedFrom: "statcast";
}

export interface StatcastSummary {
  canonicalGamePk: number;
  evidenceGamePk: number;
  generatedAt: string;
  sourceEndpoints: string[];
  sample: {
    team: "Atlanta Braves";
    opponent: "Boston Red Sox";
    date: string;
    halfInnings: "bottom";
    trackedPitches: number;
    trackedBattedBalls: number;
  };
  pitchMix: Record<string, number>;
  zoneDiscipline: {
    outsideZonePitches: number;
    swings: number;
    chaseSwings: number;
    chaseRatePct: number;
    whiffs: number;
    whiffRatePct: number;
  };
  contactQuality: {
    hardHitBalls95PlusMph: number;
    battedBallLocations: Record<string, number>;
    trajectories: Record<string, number>;
  };
}
