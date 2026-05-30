"use strict";
/**
 * AACP v1.1 IT Provisioning Workflow Encoder
 * Zero-cost deterministic encoding for IT provisioning workflows.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEncoder = void 0;
const ruleBasedEncoder_1 = require("../ruleBasedEncoder");
class ITEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_1.RuleBasedEncoder();
    }
    createAccount(username, dept, returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "BUILD", domain: "IT",
            res: "ad_account",
            filterExpr: `usr=${username}`,
            fields: ["email", "dept", "grp", "pwd_reset"],
            returnAgent, priority,
        });
    }
    assignLicences(username, licences, returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "PROC", domain: "IT",
            res: "licences",
            filterExpr: `usr=${username}`,
            req: licences,
            returnAgent, priority,
        });
    }
    configureAccess(username, systems, returnAgent = "IT-Agent", priority = "1") {
        return this.enc.encode({
            task: "BUILD", domain: "IT",
            res: "access_profile",
            filterExpr: `usr=${username}`,
            req: systems,
            returnAgent, priority,
        });
    }
    sendWelcome(username, returnAgent = "IT-Agent", priority = "2") {
        return this.enc.encode({
            task: "SEND", domain: "IT",
            to: [username],
            subj: `welcome_${username}_onboarding`,
            flagMsg: "onboarding_complete",
            returnAgent, priority,
        });
    }
    logProvisioning(username, actor = "IT-Agent", returnAgent = "AUD-Agent", priority = "2") {
        return this.enc.encode({
            task: "LOG", domain: "IT",
            actor,
            status: "provisioned",
            filterExpr: `usr=${username}`,
            returnAgent, priority,
        });
    }
    fullProvision(username, dept, licences) {
        return [
            this.createAccount(username, dept),
            this.assignLicences(username, licences),
            this.configureAccess(username, ["email", "vpn", "sharepoint"]),
            this.sendWelcome(username),
            this.logProvisioning(username),
        ];
    }
}
exports.ITEncoder = ITEncoder;
//# sourceMappingURL=itEncoder.js.map