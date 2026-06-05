/**
 * AACP v1.1 Sales Qualification Workflow Encoder
 * Zero-cost deterministic encoding for sales qualification workflows.
 *
 * Real-world basis:
 *   Salesforce Agentforce 2026 CRM Automation Guide (Digital Applied, Feb 2026)
 *   HubSpot State of Marketing Report 2025
 */
import { EncodedPacket } from "../../schema.js";
export declare class SalesEncoder {
    private enc;
    fetchLead(leadId: string, returnAgent?: string, priority?: string): EncodedPacket;
    scoreLead(leadId: string, framework?: string, returnAgent?: string, priority?: string): EncodedPacket;
    routeLead(leadId: string, scoreThreshold?: string, returnAgent?: string, priority?: string): EncodedPacket;
    logQualification(leadId: string, status?: string, actor?: string, returnAgent?: string, priority?: string): EncodedPacket;
    notifyRep(leadId: string, to?: string[], returnAgent?: string, priority?: string): EncodedPacket;
    fullQualification(leadId: string, framework?: string): EncodedPacket[];
}
//# sourceMappingURL=salesEncoder.d.ts.map