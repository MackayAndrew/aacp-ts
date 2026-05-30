"use strict";
/**
 * AACP v1.1 Rule-Based Encoder
 * Deterministic, zero-cost encoding for structured input.
 * Everything except TASK and DOM is a named key:value pair.
 * No empty positional slots. No LLM calls.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleBasedEncoder = void 0;
const schema_1 = require("../schema");
const validator_1 = require("../validator");
class EncodedPacketImpl {
    constructor(packet, domain, task, tokenEstimateEnglish, tokenEstimatePacket, compressionLoss, lossNote, aacpVersion, encoderType, apiCostUsd) {
        this.packet = packet;
        this.domain = domain;
        this.task = task;
        this.tokenEstimateEnglish = tokenEstimateEnglish;
        this.tokenEstimatePacket = tokenEstimatePacket;
        this.compressionLoss = compressionLoss;
        this.lossNote = lossNote;
        this.aacpVersion = aacpVersion;
        this.encoderType = encoderType;
        this.apiCostUsd = apiCostUsd;
    }
    get compressionRatio() {
        if (this.tokenEstimateEnglish === 0)
            return 0;
        return 1 - this.tokenEstimatePacket / this.tokenEstimateEnglish;
    }
    get reductionPct() {
        return `${(this.compressionRatio * 100).toFixed(1)}%`;
    }
    summary() {
        return [
            `PACKET [${this.domain}/${this.task}]`,
            `  Encoder: ${this.encoderType}  Cost: $${this.apiCostUsd.toFixed(4)}`,
            `  Loss:    ${this.compressionLoss}`,
            "",
            this.packet,
        ].join("\n");
    }
}
class RuleBasedEncoder {
    constructor() {
        this.validator = new validator_1.AACPValidator();
    }
    encode(params) {
        const { task, domain, returnAgent, priority = "2", res, period, filterExpr, fields, fmt, src, srcPrev, rules, validate, template, dataPtr, amt, ccy, supplier, match, terms, docType, party, clause, issue, risk, block, flags, flagsInherit, req, highlight, status, to, subj, att, flagMsg, tone, sentiment, actor, chain, prog, ltv, loyalty, urgency, } = params;
        // Core: TASK and DOM positional, everything else named
        const parts = [
            task.toUpperCase(),
            domain.toUpperCase(),
            `return:${returnAgent}`,
            `p:${priority}`,
            `aacp:${schema_1.AACP_VERSION}`,
        ];
        const add = (key, val) => {
            if (val !== null && val !== undefined && String(val).trim() !== "") {
                parts.push(`${key}:${val}`);
            }
        };
        add("res", res);
        add("period", period);
        add("filter", filterExpr);
        add("fields", fields?.join(","));
        add("fmt", fmt);
        add("src", src?.join(","));
        add("src_prev", srcPrev);
        add("rules", rules);
        add("validate", validate);
        add("tmpl", template);
        add("data_ptr", dataPtr);
        add("amt", amt !== undefined ? String(amt) : undefined);
        add("ccy", ccy?.toUpperCase());
        add("sup", supplier?.replace(/ /g, "-"));
        add("match", match);
        add("terms", terms);
        add("type", docType?.toUpperCase());
        add("party", party?.replace(/ /g, "-"));
        add("clause", clause);
        add("issue", issue?.replace(/ /g, "_").toLowerCase());
        add("risk", risk?.toLowerCase());
        add("block", block);
        add("flags", flags?.join(","));
        add("flags_inherit", flagsInherit?.join(","));
        add("req", req?.join(","));
        add("highlight", highlight);
        add("status", status);
        add("to", to?.join(","));
        add("subj", subj?.replace(/ /g, "_"));
        add("att", att);
        add("flag_msg", flagMsg?.replace(/ /g, "_"));
        add("sentiment", sentiment?.toLowerCase());
        add("tone", tone?.toLowerCase());
        add("prog", prog !== undefined ? prog.toFixed(2) : undefined);
        add("actor", actor);
        add("chain", chain?.join(","));
        add("ltv", ltv !== undefined ? String(ltv) : undefined);
        add("loyalty", loyalty);
        add("urgency", urgency?.toLowerCase());
        const packet = parts.join("|");
        const validation = this.validator.validate(packet);
        if (!validation.valid) {
            throw new Error(`Rule-based encoder produced invalid packet:\n` +
                validation.errors.join("\n") + "\n" + packet);
        }
        const tokenEstimatePacket = Math.max(1, Math.floor(packet.length / 4));
        const tokenEstimateEnglish = 15 + parts.length * 8;
        return new EncodedPacketImpl(packet, domain.toUpperCase(), task.toUpperCase(), tokenEstimateEnglish, tokenEstimatePacket, "none", null, schema_1.AACP_VERSION, "rule_based", 0.0);
    }
}
exports.RuleBasedEncoder = RuleBasedEncoder;
//# sourceMappingURL=ruleBasedEncoder.js.map