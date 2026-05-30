/**
 * AACP v1.1 Invoice Processing Workflow Encoder
 * Zero-cost deterministic encoding for AP invoice workflows.
 */
import { EncodedPacket } from "../../schema";
export declare class InvoiceEncoder {
    private enc;
    processInvoice(supplier: string, amount: number, currency: string, poNumber: string, terms?: string, returnAgent?: string, priority?: string): EncodedPacket;
    approvePayment(poNumber: string, returnAgent?: string, priority?: string): EncodedPacket;
    logInvoice(poNumber: string, status?: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullProcess(supplier: string, amount: number, currency: string, poNumber: string): EncodedPacket[];
}
//# sourceMappingURL=invoiceEncoder.d.ts.map