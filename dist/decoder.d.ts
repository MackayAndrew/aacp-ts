/**
 * AACP v1.1 Decoder
 * Expands AACP packets into human-readable English.
 * Pure logic. No LLM calls.
 * Note: decoded output is structural, not semantic.
 * The packet is always the canonical record.
 */
import { DecodedPacket } from "./schema";
export declare class AACPDecoder {
    decode(packet: string): DecodedPacket;
}
//# sourceMappingURL=decoder.d.ts.map