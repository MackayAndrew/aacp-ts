/**
 * AACP v1.1 HR Onboarding / JML Workflow Encoder
 * Zero-cost deterministic encoding for Joiner-Mover-Leaver workflows.
 *
 * Real-world basis:
 *   JML Best Practices for IT Teams 2025 (CloudEagle, Oct 2025)
 *   8-Step IAM Implementation Plan (ConductorOne, March 2026)
 *   Perfecting the JML Process with Entra ID (Kocho, May 2026)
 */
import { EncodedPacket } from "../../schema.js";
export declare class JMLEncoder {
    private enc;
    fetchNewHire(employeeId: string, returnAgent?: string, priority?: string): EncodedPacket;
    createAccount(username: string, _dept: string, returnAgent?: string, priority?: string): EncodedPacket;
    assignLicences(username: string, licences?: string[], returnAgent?: string, priority?: string): EncodedPacket;
    configureAccess(username: string, systems?: string[], returnAgent?: string, priority?: string): EncodedPacket;
    sendWelcome(username: string, returnAgent?: string, priority?: string): EncodedPacket;
    logProvisioning(username: string, actor?: string, status?: string, returnAgent?: string, priority?: string): EncodedPacket;
    fullJoiner(employeeId: string, username: string, dept: string, licences?: string[]): EncodedPacket[];
    updateAccess(username: string, newRole: string, returnAgent?: string, priority?: string): EncodedPacket;
    revokeAccess(username: string, returnAgent?: string, priority?: string): EncodedPacket;
    logOffboarding(username: string, actor?: string, returnAgent?: string, priority?: string): EncodedPacket;
}
//# sourceMappingURL=jmlEncoder.d.ts.map