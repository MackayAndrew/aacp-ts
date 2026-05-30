/**
 * AACP v1.1 Payroll Workflow Encoder
 * Zero-cost deterministic encoding for HR payroll workflows.
 * Mirrors Python PayrollEncoder exactly.
 */
import { EncodedPacket } from "../../schema";
export declare class PayrollEncoder {
    private enc;
    fetchEmployees(period: string, returnAgent?: string, priority?: string): EncodedPacket;
    fetchBudgets(period: string, returnAgent?: string, priority?: string): EncodedPacket;
    mergeAndCalculate(period: string, rules?: string, returnAgent?: string, priority?: string): EncodedPacket;
    generateReport(period: string, _prevPeriod: string, returnAgent?: string, priority?: string): EncodedPacket;
    logRun(_period: string, actor?: string, chain?: string[], status?: string, returnAgent?: string, priority?: string): EncodedPacket;
    sendReport(period: string, to?: string[], flagMsg?: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullRun(period: string, prevPeriod: string): EncodedPacket[];
}
//# sourceMappingURL=payrollEncoder.d.ts.map