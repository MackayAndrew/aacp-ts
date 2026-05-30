/**
 * AACP v1.1 Payroll Workflow Encoder
 * Zero-cost deterministic encoding for HR payroll workflows.
 * Mirrors Python PayrollEncoder exactly.
 */

import { RuleBasedEncoder } from "../ruleBasedEncoder";
import { EncodedPacket } from "../../schema";

export class PayrollEncoder {
  private enc = new RuleBasedEncoder();

  fetchEmployees(
    period: string,
    returnAgent = "HR-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "FETCH", domain: "HR",
      res: "emp_salary", period,
      filterExpr: "status=active", fmt: "json",
      returnAgent, priority,
    });
  }

  fetchBudgets(
    period: string,
    returnAgent = "HR-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "FETCH", domain: "FIN",
      res: "budget_cc", period,
      fmt: "json",
      returnAgent, priority,
    });
  }

  mergeAndCalculate(
    period: string,
    rules = "payroll_v2",
    returnAgent = "HR-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "MERGE", domain: "HR",
      rules, validate: "budget_cc",
      returnAgent, priority,
    });
  }

  generateReport(
    period: string,
    _prevPeriod: string,
    returnAgent = "HR-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "REPORT", domain: "HR",
      fmt: "pdf,xlsx", highlight: "REVIEW_REQ",
      returnAgent, priority,
    });
  }

  logRun(
    _period: string,
    actor = "HR-Agent",
    chain?: string[],
    status = "review_required",
    returnAgent = "AUD-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "HR",
      actor,
      chain: chain ?? ["HRMS", "FIN", "PAY", "RPT"],
      status,
      returnAgent, priority,
    });
  }

  sendReport(
    period: string,
    to?: string[],
    flagMsg = "review_required",
    returnAgent = "HR-Agent",
    priority = "2",
  ): EncodedPacket {
    const periodLabel = period.replace(/-/g, "_");
    return this.enc.encode({
      task: "SEND", domain: "HR",
      to: to ?? ["fin_director", "hr_director"],
      subj: `payroll_${periodLabel}_REVIEW_REQ`,
      att: `rpt://payroll/${period}:pdf`,
      flagMsg,
      returnAgent, priority,
    });
  }

  fullRun(period: string, prevPeriod: string): EncodedPacket[] {
    return [
      this.fetchEmployees(period),
      this.fetchBudgets(period),
      this.mergeAndCalculate(period),
      this.generateReport(period, prevPeriod),
      this.logRun(period),
      this.sendReport(period),
    ];
  }
}
