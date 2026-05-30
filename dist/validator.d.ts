/**
 * AACP v1.1 Validator
 * Validates pipe-delimited AACP packets against the v1.1 schema.
 * Pure logic. No LLM calls. Fast and free.
 */
import { ValidationResult } from "./schema";
export declare class AACPValidator {
    validate(packet: string): ValidationResult;
}
//# sourceMappingURL=validator.d.ts.map