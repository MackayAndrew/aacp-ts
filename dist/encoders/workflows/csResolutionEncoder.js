"use strict";
/**
 * AACP v1.1 Customer Service Complaint Resolution Workflow Encoder
 * Zero-cost deterministic encoding for CS complaint resolution workflows.
 *
 * Real-world basis:
 *   Zendesk Autonomous Service Workforce at Relate 2026 (CMSWire, May 2026)
 *   Zendesk Resolution Platform — 80% ticket resolution by AI (April 2026)
 *   ServiceNow Autonomous CRM — 100M+ cases monthly (May 2026)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSResolutionEncoder = void 0;
const ruleBasedEncoder_js_1 = require("../ruleBasedEncoder.js");
class CSResolutionEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_js_1.RuleBasedEncoder();
    }
    fetchCustomer(customerId, returnAgent = "CS-Agent", priority = "1") {
        return this.enc.encode({
            task: "FETCH", domain: "CS",
            res: "customer_profile",
            filterExpr: `id=${customerId}`,
            fields: ["history", "ltv", "loyalty", "open_tickets", "sentiment"],
            fmt: "json",
            returnAgent, priority,
        });
    }
    triageComplaint(ticketId, returnAgent = "CS-Agent", priority = "1") {
        return this.enc.encode({
            task: "PROC", domain: "CS",
            res: "ticket_triage",
            filterExpr: `id=${ticketId}`,
            req: ["categorise", "sentiment_score", "priority_score"],
            returnAgent, priority,
        });
    }
    resolveComplaint(ticketId, options = {}, returnAgent = "CS-Agent", priority = "1") {
        const { sentiment = "negative", tone = "empathetic", ltv, ccy = "GBP", goodwill = false, } = options;
        const req = ["resolve"];
        if (goodwill)
            req.push("goodwill_consider");
        return this.enc.encode({
            task: "RESOLVE", domain: "CS",
            res: "complaint",
            filterExpr: `id=${ticketId}`,
            sentiment, tone,
            ltv: ltv !== undefined ? ltv : undefined,
            ccy: ltv !== undefined ? ccy : undefined,
            req,
            returnAgent, priority,
        });
    }
    sendResolution(ticketId, customerId, tone = "empathetic", returnAgent = "CS-Agent", priority = "1") {
        return this.enc.encode({
            task: "SEND", domain: "CS",
            to: [customerId],
            subj: `resolution_${ticketId}`,
            tone,
            flagMsg: "resolution_sent",
            returnAgent, priority,
        });
    }
    logResolution(ticketId, status = "resolved", actor = "CS-Agent", returnAgent = "AUD-Agent", priority = "3") {
        return this.enc.encode({
            task: "LOG", domain: "CS",
            res: "resolution",
            filterExpr: `id=${ticketId}`,
            actor, status,
            returnAgent, priority,
        });
    }
    fullResolution(customerId, ticketId, options = {}) {
        return [
            this.fetchCustomer(customerId),
            this.triageComplaint(ticketId),
            this.resolveComplaint(ticketId, options),
            this.sendResolution(ticketId, customerId),
            this.logResolution(ticketId),
        ];
    }
}
exports.CSResolutionEncoder = CSResolutionEncoder;
//# sourceMappingURL=csResolutionEncoder.js.map