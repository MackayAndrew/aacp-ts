/**
 * AACP v1.1 TypeScript SDK
 * Agent Action Compression Protocol
 *
 * @example
 * import { PayrollEncoder, AACPValidator, AACPDecoder } from "aacp-ts";
 *
 * const enc = new PayrollEncoder();
 * const pkt = enc.fetchEmployees("2026-03");
 * console.log(pkt.packet);
 * // FETCH|HR|return:HR-Agent|p:1|aacp:1.1|res:emp_salary|period:2026-03|filter:status=active|fmt:json
 */

export { AACP_VERSION, VALID_TASKS, VALID_DOMAINS, EXTENDED_FIELDS } from "./schema";
export type {
  EncodedPacket, DecodedPacket, ValidationResult,
  EncodeParams, CompressionLoss, EncoderType,
} from "./schema";

export { AACPValidator }   from "./validator";
export { AACPDecoder }     from "./decoder";
export { RuleBasedEncoder } from "./encoders/ruleBasedEncoder";

export { PayrollEncoder }  from "./encoders/workflows/payrollEncoder";
export { ITEncoder }       from "./encoders/workflows/itEncoder";
export { InvoiceEncoder }  from "./encoders/workflows/invoiceEncoder";
export { ContractEncoder } from "./encoders/workflows/contractEncoder";
