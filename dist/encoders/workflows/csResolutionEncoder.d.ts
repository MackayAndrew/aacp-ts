/**
 * AACP v1.1 Customer Service Complaint Resolution Workflow Encoder
 * Zero-cost deterministic encoding for CS complaint resolution workflows.
 *
 * Real-world basis:
 *   Zendesk Autonomous Service Workforce at Relate 2026 (CMSWire, May 2026)
 *   Zendesk Resolution Platform — 80% ticket resolution by AI (April 2026)
 *   ServiceNow Autonomous CRM — 100M+ cases monthly (May 2026)
 */
import { EncodedPacket } from "../../schema.js";
export declare class CSResolutionEncoder {
    private enc;
    fetchCustomer(customerId: string, returnAgent?: string, priority?: string): EncodedPacket;
    triageComplaint(ticketId: string, returnAgent?: string, priority?: string): EncodedPacket;
    resolveComplaint(ticketId: string, options?: {
        sentiment?: string;
        tone?: string;
        ltv?: number;
        ccy?: string;
        goodwill?: boolean;
    }, returnAgent?: string, priority?: string): EncodedPacket;
    sendResolution(ticketId: string, customerId: string, tone?: string, returnAgent?: string, priority?: string): EncodedPacket;
    logResolution(ticketId: string, status?: string, actor?: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullResolution(customerId: string, ticketId: string, options?: {
        sentiment?: string;
        ltv?: number;
        goodwill?: boolean;
    }): EncodedPacket[];
}
//# sourceMappingURL=csResolutionEncoder.d.ts.map