"use strict";
/**
 * AACP v1.1 Schema
 * Types and constants for the Agent Action Compression Protocol.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTENDED_FIELDS = exports.VALID_PRIORITIES = exports.VALID_DOMAINS = exports.VALID_TASKS = exports.AACP_VERSION = void 0;
exports.AACP_VERSION = "1.1";
exports.VALID_TASKS = new Set([
    "FETCH", "PROC", "FLAG", "RESOLVE", "LOG", "SEND",
    "BUILD", "MERGE", "CALC", "REPORT", "ACK", "SYNC",
]);
exports.VALID_DOMAINS = new Set([
    "HR", "FIN", "SALES", "LEGAL", "IT", "CS", "MKT",
]);
exports.VALID_PRIORITIES = new Set(["1", "2", "3"]);
exports.EXTENDED_FIELDS = new Set([
    "src", "src_prev", "rules", "validate", "tmpl", "data_ptr",
    "amt", "ccy", "sup", "match", "terms", "type", "party",
    "clause", "issue", "risk", "block", "flags", "req",
    "highlight", "status", "to", "subj", "att", "flag_msg",
    "tone", "sentiment", "actor", "chain", "prog",
    "ltv", "loyalty", "urgency",
]);
//# sourceMappingURL=schema.js.map