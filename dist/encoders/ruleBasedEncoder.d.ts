/**
 * AACP v1.1 Rule-Based Encoder — v1.3.0
 * Deterministic, zero-cost encoding for structured input.
 * Everything except TASK and DOM is a named key:value pair.
 */
import { EncodeParams, EncodedPacket } from "../schema.js";
export declare class RuleBasedEncoder {
    private validator;
    encode(params: EncodeParams): EncodedPacket;
}
//# sourceMappingURL=ruleBasedEncoder.d.ts.map