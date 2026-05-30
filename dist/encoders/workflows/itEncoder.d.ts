/**
 * AACP v1.1 IT Provisioning Workflow Encoder
 * Zero-cost deterministic encoding for IT provisioning workflows.
 */
import { EncodedPacket } from "../../schema";
export declare class ITEncoder {
    private enc;
    createAccount(username: string, dept: string, returnAgent?: string, priority?: string): EncodedPacket;
    assignLicences(username: string, licences: string[], returnAgent?: string, priority?: string): EncodedPacket;
    configureAccess(username: string, systems: string[], returnAgent?: string, priority?: string): EncodedPacket;
    sendWelcome(username: string, returnAgent?: string, priority?: string): EncodedPacket;
    logProvisioning(username: string, actor?: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullProvision(username: string, dept: string, licences: string[]): EncodedPacket[];
}
//# sourceMappingURL=itEncoder.d.ts.map