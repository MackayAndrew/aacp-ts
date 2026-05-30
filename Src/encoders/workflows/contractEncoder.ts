/**
 * AACP v1.1 Contract Review Workflow Encoder
 * Zero-cost deterministic encoding for legal contract review workflows.
 */

import { RuleBasedEncoder } from "../ruleBasedEncoder";
import { EncodedPacket } from "../../schema";

export class ContractEncoder {
  private enc = new RuleBasedEncoder();

  flagClause(
    docType: string,
    party: string,
    clause: string,
    issue: string,
    risk: "low" | "medium" | "high" | "critical",
    blockAction?: string,
    returnAgent = "LEG-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "FLAG", domain: "LEGAL",
      docType, party, clause, issue, risk,
      block: blockAction,
      returnAgent, priority,
    });
  }

  reviewContract(
    docType: string,
    party: string,
    rules: string,
    returnAgent = "LEG-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "FLAG", domain: "LEGAL",
      docType, party, rules,
      returnAgent, priority,
    });
  }

  logReview(
    docType: string,
    party: string,
    status: string,
    returnAgent = "AUD-Agent",
    priority = "3",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "LEGAL",
      docType, party, status,
      returnAgent, priority,
    });
  }

  fullReview(
    docType: string,
    party: string,
    rules: string,
  ): EncodedPacket[] {
    return [
      this.reviewContract(docType, party, rules),
      this.logReview(docType, party, "under_review"),
    ];
  }
}
