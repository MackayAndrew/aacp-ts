/**
 * AACP v1.1 Decoder
 * Expands AACP packets into human-readable English.
 * Pure logic. No LLM calls.
 * Note: decoded output is structural, not semantic.
 * The packet is always the canonical record.
 */

import { DecodedPacket } from "./schema";

const TASK_VERBS: Record<string, string> = {
  FETCH:   "Retrieve",
  PROC:    "Process",
  FLAG:    "Flag for review",
  RESOLVE: "Resolve",
  LOG:     "Log to audit trail",
  SEND:    "Send",
  BUILD:   "Build or provision",
  MERGE:   "Merge and process",
  CALC:    "Calculate",
  REPORT:  "Generate report",
  ACK:     "Acknowledge",
  SYNC:    "Synchronise",
};

const DOMAIN_NAMES: Record<string, string> = {
  HR:     "Human Resources",
  FIN:    "Finance",
  SALES:  "Sales",
  LEGAL:  "Legal",
  IT:     "IT",
  CS:     "Customer Services",
  MKT:    "Marketing",
};

export class AACPDecoder {

  decode(packet: string): DecodedPacket {
    if (!packet || !packet.trim()) {
      return {
        english: "Empty packet.",
        parsed: {},
        isComplete: false,
        caveat: "Decoded output is structural. Packet is the canonical record.",
      };
    }

    const fields = packet.trim().split("|");
    const task = fields[0]?.trim() ?? "";
    const dom  = fields[1]?.trim() ?? "";

    const named: Record<string, string> = {};
    for (const f of fields.slice(2)) {
      const trimmed = f.trim();
      if (!trimmed) continue;
      const colonIdx = trimmed.indexOf(":");
      if (colonIdx !== -1) {
        const key = trimmed.slice(0, colonIdx).toLowerCase();
        const val = trimmed.slice(colonIdx + 1);
        named[key] = val;
      }
    }

    const verb       = TASK_VERBS[task]   ?? task.toLowerCase();
    const domainName = DOMAIN_NAMES[dom]  ?? dom;
    const returnTo   = named["return"]    ?? "unknown agent";
    const priority   = named["p"]         ?? "2";
    const priorityLabel = priority === "1" ? "critical priority"
                        : priority === "3" ? "low priority"
                        : "standard priority";

    const parts: string[] = [];

    // Core action
    const res = named["res"];
    if (res) {
      parts.push(`${verb} ${res.replace(/_/g, " ")} from the ${domainName} domain`);
    } else {
      parts.push(`${verb} in the ${domainName} domain`);
    }

    // Time period
    if (named["period"]) parts.push(`for period ${named["period"]}`);

    // Filter
    if (named["filter"]) parts.push(`filtered to ${named["filter"].replace(/=/g, ": ").replace(/_/g, " ")}`);

    // Format
    if (named["fmt"]) parts.push(`return as ${named["fmt"].toUpperCase()}`);

    // Rules
    if (named["rules"]) parts.push(`using rules ${named["rules"]}`);

    // Validate
    if (named["validate"]) parts.push(`validate against ${named["validate"].replace(/_/g, " ")}`);

    // Flags
    if (named["flags"]) parts.push(`flag: ${named["flags"].replace(/,/g, ", ")}`);

    // Highlight
    if (named["highlight"]) parts.push(`highlight: ${named["highlight"].replace(/_/g, " ")}`);

    // Risk
    if (named["risk"]) parts.push(`risk level: ${named["risk"]}`);

    // Amount
    if (named["amt"]) {
      const ccy = named["ccy"] ?? "";
      parts.push(`amount: ${ccy} ${named["amt"]}`.trim());
    }

    // Recipient
    if (named["to"]) parts.push(`send to: ${named["to"].replace(/,/g, ", ")}`);

    // Actor / chain
    if (named["actor"]) parts.push(`initiated by ${named["actor"]}`);
    if (named["chain"]) parts.push(`agent chain: ${named["chain"].replace(/,/g, " → ")}`);

    // Routing
    parts.push(`return result to ${returnTo} (${priorityLabel})`);

    const english = parts.join(", ") + ".";

    return {
      english,
      parsed: { task, domain: dom, ...named },
      isComplete: true,
      caveat: "Decoded output is structural. Packet is the canonical record.",
    };
  }
}
