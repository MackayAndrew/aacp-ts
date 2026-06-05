/**
 * AACP v1.1 Finance Month-End Close Workflow Encoder
 * Zero-cost deterministic encoding for finance month-end close workflows.
 *
 * Real-world basis:
 *   NetSuite 2026.1 Autonomous Close (Oracle, March 2026)
 *   AI Agent Orchestration Reduces Month-End Close Time (Peakflo, May 2026)
 *   BlackLine Smart Close — automated reconciliation in SAP/Oracle (2025)
 */
import { EncodedPacket } from "../../schema.js";
export declare class MonthEndEncoder {
    private enc;
    fetchTrialBalance(period: string, entities?: string[], returnAgent?: string, priority?: string): EncodedPacket;
    reconcileBank(period: string, returnAgent?: string, priority?: string): EncodedPacket;
    postAccruals(period: string, returnAgent?: string, priority?: string): EncodedPacket;
    varianceAnalysis(period: string, prevPeriod: string, returnAgent?: string, priority?: string): EncodedPacket;
    generateManagementAccounts(period: string, returnAgent?: string, priority?: string): EncodedPacket;
    logCloseCertification(period: string, actor?: string, status?: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullClose(period: string, prevPeriod: string, entities?: string[]): EncodedPacket[];
}
//# sourceMappingURL=monthEndEncoder.d.ts.map