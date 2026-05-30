/**
 * AACP v1.1 Schema
 * Types and constants for the Agent Action Compression Protocol.
 */

export const AACP_VERSION = "1.1";

export const VALID_TASKS = new Set([
  "FETCH", "PROC", "FLAG", "RESOLVE", "LOG", "SEND",
  "BUILD", "MERGE", "CALC", "REPORT", "ACK", "SYNC",
]);

export const VALID_DOMAINS = new Set([
  "HR", "FIN", "SALES", "LEGAL", "IT", "CS", "MKT",
]);

export const VALID_PRIORITIES = new Set(["1", "2", "3"]);

export const EXTENDED_FIELDS = new Set([
  "src", "src_prev", "rules", "validate", "tmpl", "data_ptr",
  "amt", "ccy", "sup", "match", "terms", "type", "party",
  "clause", "issue", "risk", "block", "flags", "req",
  "highlight", "status", "to", "subj", "att", "flag_msg",
  "tone", "sentiment", "actor", "chain", "prog",
  "ltv", "loyalty", "urgency",
]);

export type CompressionLoss = "none" | "minor" | "partial" | "significant";
export type EncoderType = "rule_based" | "llm" | "fallback";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  summary(): string;
}

export interface EncodedPacket {
  packet: string;
  domain: string;
  task: string;
  tokenEstimateEnglish: number;
  tokenEstimatePacket: number;
  compressionLoss: CompressionLoss;
  lossNote: string | null;
  aacpVersion: string;
  encoderType: EncoderType;
  apiCostUsd: number;
  readonly compressionRatio: number;
  readonly reductionPct: string;
  summary(): string;
}

export interface DecodedPacket {
  english: string;
  parsed: Record<string, string>;
  isComplete: boolean;
  caveat: string;
}

/** Encode parameters for the rule-based encoder */
export interface EncodeParams {
  task: string;
  domain: string;
  returnAgent: string;
  res?: string;
  period?: string;
  filterExpr?: string;
  fields?: string[];
  fmt?: string;
  priority?: string;
  src?: string[];
  srcPrev?: string;
  rules?: string;
  validate?: string;
  template?: string;
  dataPtr?: string;
  amt?: string | number;
  ccy?: string;
  supplier?: string;
  match?: string;
  terms?: string;
  docType?: string;
  party?: string;
  clause?: string;
  issue?: string;
  risk?: string;
  block?: string;
  flags?: string[];
  flagsInherit?: string[];
  req?: string[];
  highlight?: string;
  status?: string;
  to?: string[];
  subj?: string;
  att?: string;
  flagMsg?: string;
  tone?: string;
  sentiment?: string;
  actor?: string;
  chain?: string[];
  prog?: number;
  ltv?: string | number;
  loyalty?: string;
  urgency?: string;
  [key: string]: unknown;
}
