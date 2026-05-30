/**
 * AACP v1.1 Contract Review Workflow Encoder
 * Zero-cost deterministic encoding for legal contract review workflows.
 */
import { EncodedPacket } from "../../schema";
export declare class ContractEncoder {
    private enc;
    flagClause(docType: string, party: string, clause: string, issue: string, risk: "low" | "medium" | "high" | "critical", blockAction?: string, returnAgent?: string, priority?: string): EncodedPacket;
    reviewContract(docType: string, party: string, rules: string, returnAgent?: string, priority?: string): EncodedPacket;
    logReview(docType: string, party: string, status: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullReview(docType: string, party: string, rules: string): EncodedPacket[];
}
//# sourceMappingURL=contractEncoder.d.ts.map