"use strict";
/**
 * AACP v1.1 Contract Review Workflow Encoder
 * Zero-cost deterministic encoding for legal contract review workflows.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEncoder = void 0;
const ruleBasedEncoder_1 = require("../ruleBasedEncoder");
class ContractEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_1.RuleBasedEncoder();
    }
    flagClause(docType, party, clause, issue, risk, blockAction, returnAgent = "LEG-Agent", priority = "1") {
        return this.enc.encode({
            task: "FLAG", domain: "LEGAL",
            docType, party, clause, issue, risk,
            block: blockAction,
            returnAgent, priority,
        });
    }
    reviewContract(docType, party, rules, returnAgent = "LEG-Agent", priority = "1") {
        return this.enc.encode({
            task: "FLAG", domain: "LEGAL",
            docType, party, rules,
            returnAgent, priority,
        });
    }
    logReview(docType, party, status, returnAgent = "AUD-Agent", priority = "3") {
        return this.enc.encode({
            task: "LOG", domain: "LEGAL",
            docType, party, status,
            returnAgent, priority,
        });
    }
    fullReview(docType, party, rules) {
        return [
            this.reviewContract(docType, party, rules),
            this.logReview(docType, party, "under_review"),
        ];
    }
}
exports.ContractEncoder = ContractEncoder;
//# sourceMappingURL=contractEncoder.js.map