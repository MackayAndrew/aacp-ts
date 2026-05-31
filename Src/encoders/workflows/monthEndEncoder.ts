/**
 * AACP v1.1 Finance Month-End Close Workflow Encoder
 * Zero-cost deterministic encoding for finance month-end close workflows.
 *
 * Real-world basis:
 *   NetSuite 2026.1 Autonomous Close (Oracle, March 2026)
 *   AI Agent Orchestration Reduces Month-End Close Time (Peakflo, May 2026)
 *   BlackLine Smart Close — automated reconciliation in SAP/Oracle (2025)
 */

import { RuleBasedEncoder } from "../ruleBasedEncoder.js";
import { EncodedPacket } from "../../schema.js";

export class MonthEndEncoder {
  private enc = new RuleBasedEncoder();

  fetchTrialBalance(
    period: string,
    entities?: string[],
    returnAgent = "FIN-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "FETCH", domain: "FIN",
      res: "trial_balance",
      period,
      filterExpr: entities ? `entities=${entities.join(",")}` : undefined,
      fmt: "json",
      returnAgent, priority,
    });
  }

  reconcileBank(
    period: string,
    returnAgent = "FIN-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "FIN",
      res: "bank_reconciliation",
      period,
      rules: "recon_v1",
      validate: "gl_match",
      returnAgent, priority,
    });
  }

  postAccruals(
    period: string,
    returnAgent = "FIN-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "CALC", domain: "FIN",
      res: "accruals",
      period,
      rules: "accrual_policy_v2",
      validate: "period_cutoff",
      returnAgent, priority,
    });
  }

  varianceAnalysis(
    period: string,
    prevPeriod: string,
    returnAgent = "FIN-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "CALC", domain: "FIN",
      res: "variance_analysis",
      period,
      srcPrev: `gl://close/${prevPeriod}`,
      highlight: "MATERIAL_VARIANCE",
      returnAgent, priority,
    });
  }

  generateManagementAccounts(
    period: string,
    returnAgent = "FIN-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "REPORT", domain: "FIN",
      period,
      template: "mgmt_accounts_v1",
      fmt: "pdf,xlsx",
      highlight: "REVIEW_REQ",
      returnAgent, priority,
    });
  }

  logCloseCertification(
    period: string,
    actor = "FIN-Agent",
    status = "certified",
    returnAgent = "AUD-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "FIN",
      res: "close_certification",
      period,
      actor, status,
      chain: ["FIN-Agent", "FIN-Agent", "FIN-Agent", "FIN-Agent", "FIN-Agent"],
      returnAgent, priority,
    });
  }

  fullClose(
    period: string,
    prevPeriod: string,
    entities?: string[],
  ): EncodedPacket[] {
    return [
      this.fetchTrialBalance(period, entities),
      this.reconcileBank(period),
      this.postAccruals(period),
      this.varianceAnalysis(period, prevPeriod),
      this.generateManagementAccounts(period),
      this.logCloseCertification(period),
    ];
  }
}
