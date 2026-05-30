/**
 * AACP v1.1 Rule-Based Encoder
 * Deterministic, zero-cost encoding for structured input.
 * Everything except TASK and DOM is a named key:value pair.
 * No empty positional slots. No LLM calls.
 */
import { EncodeParams, EncodedPacket } from "../schema";
export declare class RuleBasedEncoder {
    private validator;
    encode(params: EncodeParams): EncodedPacket;
}
//# sourceMappingURL=ruleBasedEncoder.d.ts.map