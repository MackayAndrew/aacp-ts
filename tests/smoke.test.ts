/**
 * AACP TypeScript SDK — Smoke Tests
 * Run: npx tsx tests/smoke.test.ts
 * No test framework needed — pure assertions.
 */

import {
  PayrollEncoder, ITEncoder, InvoiceEncoder, ContractEncoder,
  AACPValidator, AACPDecoder, AACP_VERSION,
} from "../src/index.js";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${label}`);
    failed++;
  }
}

function section(label: string) {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`  ${label}`);
  console.log("=".repeat(50));
}

// ── Payroll encoder ────────────────────────────────────────
section("PayrollEncoder");
const payroll = new PayrollEncoder();

const p1 = payroll.fetchEmployees("2026-03");
console.log(`  ${p1.packet}`);
assert(p1.packet.startsWith("FETCH|HR|"), "FETCH|HR packet");
assert(p1.packet.includes("res:emp_salary"), "res:emp_salary");
assert(p1.packet.includes("period:2026-03"), "period:2026-03");
assert(p1.packet.includes("filter:status=active"), "filter:status=active");
assert(p1.packet.includes(`aacp:${AACP_VERSION}`), "correct version");
assert(p1.apiCostUsd === 0.0, "zero cost");
assert(p1.encoderType === "rule_based", "rule_based encoder");

const p2 = payroll.fetchBudgets("2026-03");
console.log(`  ${p2.packet}`);
assert(p2.packet.startsWith("FETCH|FIN|"), "FETCH|FIN packet");

const p3 = payroll.mergeAndCalculate("2026-03");
console.log(`  ${p3.packet}`);
assert(p3.packet.startsWith("MERGE|HR|"), "MERGE|HR packet");
assert(p3.packet.includes("rules:payroll_v2"), "rules:payroll_v2");

const p4 = payroll.generateReport("2026-03", "2026-02");
console.log(`  ${p4.packet}`);
assert(p4.packet.startsWith("REPORT|HR|"), "REPORT|HR packet");

const fullRun = payroll.fullRun("2026-03", "2026-02");
assert(fullRun.length === 6, "full run returns 6 packets");
assert(fullRun.every(p => p.apiCostUsd === 0.0), "all packets zero cost");

// ── IT encoder ────────────────────────────────────────────
section("ITEncoder");
const it = new ITEncoder();

const it1 = it.createAccount("j.smith", "Engineering");
console.log(`  ${it1.packet}`);
assert(it1.packet.startsWith("BUILD|IT|"), "BUILD|IT packet");
assert(it1.packet.includes("usr=j.smith"), "username in filter");

const itRun = it.fullProvision("j.smith", "Engineering", ["M365", "Slack"]);
assert(itRun.length === 5, "IT full provision returns 5 packets");

// ── Invoice encoder ───────────────────────────────────────
section("InvoiceEncoder");
const inv = new InvoiceEncoder();

const inv1 = inv.processInvoice("Acme-Ltd", 4200, "GBP", "PO-441");
console.log(`  ${inv1.packet}`);
assert(inv1.packet.startsWith("PROC|FIN|"), "PROC|FIN packet");
assert(inv1.packet.includes("amt:4200"), "amount present");
assert(inv1.packet.includes("ccy:GBP"), "currency present");
assert(inv1.packet.includes("match:PO-441"), "PO number present");

const invRun = inv.fullProcess("Acme-Ltd", 4200, "GBP", "PO-441");
assert(invRun.length === 3, "invoice full process returns 3 packets");

// ── Contract encoder ──────────────────────────────────────
section("ContractEncoder");
const contract = new ContractEncoder();

const c1 = contract.flagClause(
  "NDA", "Acme-Ltd", "s7", "ip_rights_restriction", "high", "signature"
);
console.log(`  ${c1.packet}`);
assert(c1.packet.startsWith("FLAG|LEGAL|"), "FLAG|LEGAL packet");
assert(c1.packet.includes("risk:high"), "risk level present");
assert(c1.packet.includes("block:signature"), "block action present");

// ── Validator ────────────────────────────────────────────
section("AACPValidator");
const v = new AACPValidator();

const goodPacket = "FETCH|HR|return:HR-Agent|p:1|aacp:1.1|res:emp_salary|period:2026-03";
const r1 = v.validate(goodPacket);
assert(r1.valid, "valid packet passes");
assert(r1.errors.length === 0, "no errors on valid packet");

const badPacket = "INVALID|NODOMAIN|return:agent|aacp:1.1";
const r2 = v.validate(badPacket);
assert(!r2.valid, "invalid TASK fails validation");
assert(r2.errors.length > 0, "errors returned on invalid packet");

const emptyPacket = "";
const r3 = v.validate(emptyPacket);
assert(!r3.valid, "empty packet fails validation");

// ── Decoder ──────────────────────────────────────────────
section("AACPDecoder");
const dec = new AACPDecoder();

const decoded = dec.decode(
  "FETCH|HR|return:HR-Agent|p:1|aacp:1.1|res:emp_salary|period:2026-03|filter:status=active|fmt:json"
);
console.log(`  ${decoded.english}`);
assert(decoded.isComplete, "decode returns complete result");
assert(decoded.english.length > 0, "decoded English is non-empty");
assert(decoded.parsed["task"] === "FETCH", "task parsed correctly");
assert(decoded.parsed["domain"] === "HR", "domain parsed correctly");
assert(decoded.parsed["res"] === "emp_salary", "res parsed correctly");
assert(decoded.caveat.length > 0, "caveat present");

// ── All packets validate ──────────────────────────────────
section("All generated packets validate");
const allPackets = [
  ...payroll.fullRun("2026-03", "2026-02"),
  ...it.fullProvision("j.smith", "Engineering", ["M365"]),
  ...inv.fullProcess("Acme-Ltd", 4200, "GBP", "PO-441"),
  ...contract.fullReview("NDA", "Acme-Ltd", "tpl_nda_v2"),
];

let allValid = true;
for (const pkt of allPackets) {
  const result = v.validate(pkt.packet);
  if (!result.valid) {
    console.error(`  ✗ Invalid: ${pkt.packet}`);
    console.error(`    Errors: ${result.errors.join(", ")}`);
    allValid = false;
  }
}
assert(allValid, `all ${allPackets.length} generated packets validate`);

// ── Summary ───────────────────────────────────────────────
console.log(`\n${"=".repeat(50)}`);
console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
console.log("=".repeat(50));

if (failed > 0) {
  process.exit(1);
} else {
  console.log("\n  TypeScript SDK v1.1 — all tests passed\n");
}

// ── New v1.3 encoders ─────────────────────────────────────────────────────
import {
  SalesEncoder, JMLEncoder, CSResolutionEncoder, MonthEndEncoder,
} from "../src/index.js";

section("SalesEncoder — Sales Qualification");
const sales = new SalesEncoder();
const s1 = sales.fetchLead("L-7712");
console.log(`  ${s1.packet}`);
assert(s1.packet.startsWith("FETCH|SALES|"), "FETCH|SALES packet");
assert(s1.packet.includes("id=L-7712"), "lead id in filter");
assert(s1.apiCostUsd === 0.0, "zero cost");
const sRun = sales.fullQualification("L-7712");
assert(sRun.length === 5, "full qualification returns 5 packets");
assert(sRun.every(p => v.validate(p.packet).valid), "all sales packets valid");

section("JMLEncoder — HR Onboarding / JML");
const jml = new JMLEncoder();
const j1 = jml.createAccount("j.smith", "Engineering");
console.log(`  ${j1.packet}`);
assert(j1.packet.startsWith("BUILD|IT|"), "BUILD|IT packet");
assert(j1.packet.includes("usr=j.smith"), "username in filter");
const jRun = jml.fullJoiner("E009", "j.smith", "Engineering");
assert(jRun.length === 6, "full joiner returns 6 packets");
assert(jRun.every(p => v.validate(p.packet).valid), "all JML packets valid");
const mover = jml.updateAccess("j.smith", "senior_engineer");
assert(mover.packet.includes("no_privilege_creep"), "mover has privilege check");

section("CSResolutionEncoder — Complaint Resolution");
const cs = new CSResolutionEncoder();
const cs1 = cs.resolveComplaint("T-9912", { sentiment: "negative", tone: "empathetic", ltv: 8000, goodwill: true });
console.log(`  ${c1.packet}`);
assert(cs1.packet.startsWith("RESOLVE|CS|"), "RESOLVE|CS packet");
assert(cs1.packet.includes("sentiment:negative"), "sentiment present");
assert(cs1.packet.includes("tone:empathetic"), "tone present");
assert(cs1.packet.includes("ltv:8000"), "ltv present");
assert(cs1.packet.includes("goodwill_consider"), "goodwill in req");
const cRun = cs.fullResolution("C-4421", "T-9912", { ltv: 8000 });
assert(cRun.length === 5, "full resolution returns 5 packets");
assert(cRun.every(p => v.validate(p.packet).valid), "all CS packets valid");

section("MonthEndEncoder — Finance Month-End Close");
const me = new MonthEndEncoder();
const me1 = me.fetchTrialBalance("2026-03");
console.log(`  ${me1.packet}`);
assert(me1.packet.startsWith("FETCH|FIN|"), "FETCH|FIN packet");
assert(me1.packet.includes("period:2026-03"), "period present");
const me4 = me.varianceAnalysis("2026-03", "2026-02");
assert(me4.packet.includes("MATERIAL_VARIANCE"), "material variance highlight");
const meRun = me.fullClose("2026-03", "2026-02");
assert(meRun.length === 6, "full close returns 6 packets");
assert(meRun.every(p => v.validate(p.packet).valid), "all month-end packets valid");
