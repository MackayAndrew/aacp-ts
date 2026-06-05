"use strict";
/**
 * AACP v1.1 Sales Qualification Workflow Encoder
 * Zero-cost deterministic encoding for sales qualification workflows.
 *
 * Real-world basis:
 *   Salesforce Agentforce 2026 CRM Automation Guide (Digital Applied, Feb 2026)
 *   HubSpot State of Marketing Report 2025
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesEncoder = void 0;
const ruleBasedEncoder_js_1 = require("../ruleBasedEncoder.js");
class SalesEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_js_1.RuleBasedEncoder();
    }
    fetchLead(leadId, returnAgent = "SALES-Agent", priority = "1") {
        return this.enc.encode({
            task: "FETCH", domain: "SALES",
            res: "lead_profile",
            filterExpr: `id=${leadId}`,
            fmt: "json",
            returnAgent, priority,
        });
    }
    scoreLead(leadId, framework = "BANT", returnAgent = "SALES-Agent", priority = "1") {
        return this.enc.encode({
            task: "CALC", domain: "SALES",
            res: "lead_score",
            filterExpr: `id=${leadId}`,
            rules: framework.toLowerCase(),
            returnAgent, priority,
        });
    }
    routeLead(leadId, scoreThreshold = "70", returnAgent = "SALES-Agent", priority = "2") {
        return this.enc.encode({
            task: "PROC", domain: "SALES",
            res: "lead_routing",
            filterExpr: `id=${leadId}`,
            validate: `score>=${scoreThreshold}`,
            returnAgent, priority,
        });
    }
    logQualification(leadId, status = "qualified", actor = "SALES-Agent", returnAgent = "AUD-Agent", priority = "3") {
        return this.enc.encode({
            task: "LOG", domain: "SALES",
            res: "qualification",
            filterExpr: `id=${leadId}`,
            actor, status,
            returnAgent, priority,
        });
    }
    notifyRep(leadId, to = ["sales_rep"], returnAgent = "SALES-Agent", priority = "1") {
        return this.enc.encode({
            task: "SEND", domain: "SALES",
            to,
            subj: `qualified_lead_${leadId}`,
            highlight: "ACTION_REQUIRED",
            returnAgent, priority,
        });
    }
    fullQualification(leadId, framework = "BANT") {
        return [
            this.fetchLead(leadId),
            this.scoreLead(leadId, framework),
            this.routeLead(leadId),
            this.logQualification(leadId),
            this.notifyRep(leadId),
        ];
    }
}
exports.SalesEncoder = SalesEncoder;
//# sourceMappingURL=salesEncoder.js.map