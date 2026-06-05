"use strict";
/**
 * AACP v1.1 HR Onboarding / JML Workflow Encoder
 * Zero-cost deterministic encoding for Joiner-Mover-Leaver workflows.
 *
 * Real-world basis:
 *   JML Best Practices for IT Teams 2025 (CloudEagle, Oct 2025)
 *   8-Step IAM Implementation Plan (ConductorOne, March 2026)
 *   Perfecting the JML Process with Entra ID (Kocho, May 2026)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JMLEncoder = void 0;
const ruleBasedEncoder_js_1 = require("../ruleBasedEncoder.js");
class JMLEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_js_1.RuleBasedEncoder();
    }
    // ── Joiner ────────────────────────────────────────────────────────────────
    fetchNewHire(employeeId, returnAgent = "HR-Agent", priority = "1") {
        return this.enc.encode({
            task: "FETCH", domain: "HR",
            res: "employee_record",
            filterExpr: `id=${employeeId}`,
            fmt: "json",
            returnAgent, priority,
        });
    }
    createAccount(username, _dept, returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "BUILD", domain: "IT",
            res: "ad_account",
            filterExpr: `usr=${username}`,
            fields: ["email", "dept", "grp", "pwd_reset"],
            returnAgent, priority,
        });
    }
    assignLicences(username, licences = ["M365", "Slack", "VPN"], returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "PROC", domain: "IT",
            res: "licence_assignment",
            filterExpr: `usr=${username}`,
            req: licences,
            returnAgent, priority,
        });
    }
    configureAccess(username, systems = ["email", "vpn", "sharepoint"], returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "BUILD", domain: "IT",
            res: "access_profile",
            filterExpr: `usr=${username}`,
            req: systems,
            returnAgent, priority,
        });
    }
    sendWelcome(username, returnAgent = "HR-Agent", priority = "2") {
        return this.enc.encode({
            task: "SEND", domain: "HR",
            to: [username],
            subj: `welcome_${username}_onboarding`,
            flagMsg: "onboarding_complete",
            returnAgent, priority,
        });
    }
    logProvisioning(username, actor = "IT-Agent", status = "provisioned", returnAgent = "AUD-Agent", priority = "2") {
        return this.enc.encode({
            task: "LOG", domain: "IT",
            actor, status,
            filterExpr: `usr=${username}`,
            chain: ["HR-Agent", "IT-Agent", "IT-Agent", "IT-Agent", "HR-Agent"],
            returnAgent, priority,
        });
    }
    fullJoiner(employeeId, username, dept, licences) {
        return [
            this.fetchNewHire(employeeId),
            this.createAccount(username, dept),
            this.assignLicences(username, licences),
            this.configureAccess(username),
            this.sendWelcome(username),
            this.logProvisioning(username),
        ];
    }
    // ── Mover ─────────────────────────────────────────────────────────────────
    updateAccess(username, newRole, returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "PROC", domain: "IT",
            res: "access_update",
            filterExpr: `usr=${username}`,
            rules: `role=${newRole}`,
            validate: "no_privilege_creep",
            returnAgent, priority,
        });
    }
    // ── Leaver ────────────────────────────────────────────────────────────────
    revokeAccess(username, returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "PROC", domain: "IT",
            res: "access_revocation",
            filterExpr: `usr=${username}`,
            req: ["disable_ad", "revoke_licences", "revoke_vpn"],
            returnAgent, priority,
        });
    }
    logOffboarding(username, actor = "IT-Agent", returnAgent = "AUD-Agent", priority = "1") {
        return this.enc.encode({
            task: "LOG", domain: "IT",
            actor, status: "offboarded",
            filterExpr: `usr=${username}`,
            returnAgent, priority,
        });
    }
}
exports.JMLEncoder = JMLEncoder;
//# sourceMappingURL=jmlEncoder.js.map