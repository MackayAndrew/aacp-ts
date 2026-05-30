"use strict";
/**
 * AACP v1.1 Payroll Workflow Encoder
 * Zero-cost deterministic encoding for HR payroll workflows.
 * Mirrors Python PayrollEncoder exactly.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollEncoder = void 0;
const ruleBasedEncoder_1 = require("../ruleBasedEncoder");
class PayrollEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_1.RuleBasedEncoder();
    }
    fetchEmployees(period, returnAgent = "HR-Agent", priority = "1") {
        return this.enc.encode({
            task: "FETCH", domain: "HR",
            res: "emp_salary", period,
            filterExpr: "status=active", fmt: "json",
            returnAgent, priority,
        });
    }
    fetchBudgets(period, returnAgent = "HR-Agent", priority = "1") {
        return this.enc.encode({
            task: "FETCH", domain: "FIN",
            res: "budget_cc", period,
            fmt: "json",
            returnAgent, priority,
        });
    }
    mergeAndCalculate(period, rules = "payroll_v2", returnAgent = "HR-Agent", priority = "1") {
        return this.enc.encode({
            task: "MERGE", domain: "HR",
            rules, validate: "budget_cc",
            returnAgent, priority,
        });
    }
    generateReport(period, _prevPeriod, returnAgent = "HR-Agent", priority = "2") {
        return this.enc.encode({
            task: "REPORT", domain: "HR",
            fmt: "pdf,xlsx", highlight: "REVIEW_REQ",
            returnAgent, priority,
        });
    }
    logRun(_period, actor = "HR-Agent", chain, status = "review_required", returnAgent = "AUD-Agent", priority = "2") {
        return this.enc.encode({
            task: "LOG", domain: "HR",
            actor,
            chain: chain ?? ["HRMS", "FIN", "PAY", "RPT"],
            status,
            returnAgent, priority,
        });
    }
    sendReport(period, to, flagMsg = "review_required", returnAgent = "HR-Agent", priority = "2") {
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
    fullRun(period, prevPeriod) {
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
exports.PayrollEncoder = PayrollEncoder;
//# sourceMappingURL=payrollEncoder.js.map