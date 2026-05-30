"use strict";
/**
 * AACP v1.1 Validator
 * Validates pipe-delimited AACP packets against the v1.1 schema.
 * Pure logic. No LLM calls. Fast and free.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AACPValidator = void 0;
const schema_1 = require("./schema");
class ValidationResultImpl {
    constructor(valid, errors = [], warnings = []) {
        this.valid = valid;
        this.errors = errors;
        this.warnings = warnings;
    }
    summary() {
        const lines = [
            "VALIDATION RESULT",
            `  Status: ${this.valid ? "VALID" : "INVALID"}`,
        ];
        for (const e of this.errors)
            lines.push(`    ERROR: ${e}`);
        for (const w of this.warnings)
            lines.push(`    WARN:  ${w}`);
        if (!this.errors.length && !this.warnings.length) {
            lines.push("  No issues.");
        }
        return lines.join("\n");
    }
}
class AACPValidator {
    validate(packet) {
        const errors = [];
        const warnings = [];
        if (!packet || !packet.trim()) {
            return new ValidationResultImpl(false, ["Empty packet."]);
        }
        const fields = packet.trim().split("|");
        if (fields.length < 3) {
            return new ValidationResultImpl(false, [
                `Packet has ${fields.length} fields. Minimum required: TASK|DOM|return:AGENT|aacp:VERSION`,
            ]);
        }
        const task = fields[0].trim();
        const dom = fields[1].trim();
        // Named fields from position 2 onwards
        const named = {};
        for (const f of fields.slice(2)) {
            const trimmed = f.trim();
            if (!trimmed)
                continue;
            const colonIdx = trimmed.indexOf(":");
            if (colonIdx === -1) {
                warnings.push(`Field "${trimmed}" has no colon separator — expected key:value.`);
                continue;
            }
            const key = trimmed.slice(0, colonIdx).toLowerCase();
            const val = trimmed.slice(colonIdx + 1);
            named[key] = val;
        }
        // Required: TASK
        if (!task) {
            errors.push(`Field 0 (TASK) is empty. Valid: ${[...schema_1.VALID_TASKS].sort().join(", ")}`);
        }
        else if (!schema_1.VALID_TASKS.has(task)) {
            errors.push(`Unknown TASK "${task}". Valid: ${[...schema_1.VALID_TASKS].sort().join(", ")}`);
        }
        // Required: DOM
        if (!dom) {
            errors.push(`Field 1 (DOM) is empty. Valid: ${[...schema_1.VALID_DOMAINS].sort().join(", ")}`);
        }
        else if (!schema_1.VALID_DOMAINS.has(dom)) {
            errors.push(`Unknown DOM "${dom}". Valid: ${[...schema_1.VALID_DOMAINS].sort().join(", ")}`);
        }
        // Required: return:
        if (!named["return"]) {
            errors.push("Missing required field: return: (receiving agent identifier)");
        }
        // Required: aacp:
        if (!named["aacp"]) {
            warnings.push(`Missing aacp: version field. Expected aacp:${schema_1.AACP_VERSION}`);
        }
        else if (named["aacp"] !== schema_1.AACP_VERSION) {
            warnings.push(`AACP version "${named["aacp"]}" — current is ${schema_1.AACP_VERSION}`);
        }
        // Optional: priority
        if (named["p"] && !schema_1.VALID_PRIORITIES.has(named["p"])) {
            warnings.push(`Priority "${named["p"]}" non-standard. Expected 1, 2, or 3.`);
        }
        // Extended field validation
        for (const key of Object.keys(named)) {
            if (["return", "aacp", "p", "res", "period", "filter", "fields", "fmt"].includes(key)) {
                continue;
            }
            if (!schema_1.EXTENDED_FIELDS.has(key)) {
                warnings.push(`Unknown extended field "${key}". ` +
                    `May be a valid extension — ensure receiving agent supports it.`);
            }
        }
        // Companion rules
        if (named["sentiment"] && !named["tone"]) {
            warnings.push("sentiment field present without tone. " +
                "Add tone:empathetic|formal|terse for human-facing tasks.");
        }
        if (named["ltv"] && !named["ccy"]) {
            warnings.push("ltv field present without ccy — add currency context.");
        }
        return new ValidationResultImpl(errors.length === 0, errors, warnings);
    }
}
exports.AACPValidator = AACPValidator;
//# sourceMappingURL=validator.js.map