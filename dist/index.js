"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEncoder = exports.InvoiceEncoder = exports.ITEncoder = exports.PayrollEncoder = exports.RuleBasedEncoder = exports.AACPDecoder = exports.AACPValidator = exports.EXTENDED_FIELDS = exports.VALID_DOMAINS = exports.VALID_TASKS = exports.AACP_VERSION = void 0;
var schema_1 = require("./schema");
Object.defineProperty(exports, "AACP_VERSION", { enumerable: true, get: function () { return schema_1.AACP_VERSION; } });
Object.defineProperty(exports, "VALID_TASKS", { enumerable: true, get: function () { return schema_1.VALID_TASKS; } });
Object.defineProperty(exports, "VALID_DOMAINS", { enumerable: true, get: function () { return schema_1.VALID_DOMAINS; } });
Object.defineProperty(exports, "EXTENDED_FIELDS", { enumerable: true, get: function () { return schema_1.EXTENDED_FIELDS; } });
var validator_1 = require("./validator");
Object.defineProperty(exports, "AACPValidator", { enumerable: true, get: function () { return validator_1.AACPValidator; } });
var decoder_1 = require("./decoder");
Object.defineProperty(exports, "AACPDecoder", { enumerable: true, get: function () { return decoder_1.AACPDecoder; } });
var ruleBasedEncoder_1 = require("./encoders/ruleBasedEncoder");
Object.defineProperty(exports, "RuleBasedEncoder", { enumerable: true, get: function () { return ruleBasedEncoder_1.RuleBasedEncoder; } });
var payrollEncoder_1 = require("./encoders/workflows/payrollEncoder");
Object.defineProperty(exports, "PayrollEncoder", { enumerable: true, get: function () { return payrollEncoder_1.PayrollEncoder; } });
var itEncoder_1 = require("./encoders/workflows/itEncoder");
Object.defineProperty(exports, "ITEncoder", { enumerable: true, get: function () { return itEncoder_1.ITEncoder; } });
var invoiceEncoder_1 = require("./encoders/workflows/invoiceEncoder");
Object.defineProperty(exports, "InvoiceEncoder", { enumerable: true, get: function () { return invoiceEncoder_1.InvoiceEncoder; } });
var contractEncoder_1 = require("./encoders/workflows/contractEncoder");
Object.defineProperty(exports, "ContractEncoder", { enumerable: true, get: function () { return contractEncoder_1.ContractEncoder; } });
//# sourceMappingURL=index.js.map