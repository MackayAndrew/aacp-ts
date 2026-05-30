# aacp-ts — AACP TypeScript SDK

**Agent Action Compression Protocol — TypeScript SDK**

Deterministic, zero-cost encoding of agent coordination messages.
TypeScript port of the [Python SDK](https://github.com/MackayAndrew/aacp).

## Install

```bash
npm install aacp-ts
```

## Quick start

```typescript
import { PayrollEncoder, AACPValidator, AACPDecoder } from "aacp-ts";

// Zero-cost rule-based encoding
const enc = new PayrollEncoder();
const pkt = enc.fetchEmployees("2026-03");
console.log(pkt.packet);
// FETCH|HR|return:HR-Agent|p:1|aacp:1.1|res:emp_salary|period:2026-03|filter:status=active|fmt:json
console.log(pkt.apiCostUsd); // 0

// Validate any packet
const validator = new AACPValidator();
const result = validator.validate(pkt.packet);
console.log(result.valid);   // true
console.log(result.summary());

// Decode any packet to English
const decoder = new AACPDecoder();
const decoded = decoder.decode(pkt.packet);
console.log(decoded.english);
```

## Workflow encoders

```typescript
import {
  PayrollEncoder,   // HR payroll — 6 hops
  ITEncoder,        // IT provisioning — 5 hops
  InvoiceEncoder,   // AP invoice processing — 3 hops
  ContractEncoder,  // Legal contract review — 2+ hops
} from "aacp-ts";

// Full payroll run — all 6 packets, $0.00 total
const payroll = new PayrollEncoder();
const packets = payroll.fullRun("2026-03", "2026-02");

// IT provisioning
const it = new ITEncoder();
const provision = it.fullProvision("j.smith", "Engineering", ["M365", "Slack"]);

// Invoice processing
const inv = new InvoiceEncoder();
const invoice = inv.fullProcess("Acme-Ltd", 4200, "GBP", "PO-441");

// Legal contract review
const contract = new ContractEncoder();
contract.flagClause("NDA", "Acme-Ltd", "s7", "ip_rights_restriction", "high", "signature");
```

## Rule-based encoder (direct)

```typescript
import { RuleBasedEncoder } from "aacp-ts";

const enc = new RuleBasedEncoder();
const pkt = enc.encode({
  task: "FETCH",
  domain: "HR",
  returnAgent: "HR-Agent",
  res: "emp_salary",
  period: "2026-03",
  filterExpr: "status=active",
  fmt: "json",
});
```

## Packet format

```
TASK|DOM|return:AGENT|p:PRIORITY|aacp:1.1|key:value...

TASK and DOM are positional. Everything else is named key:value.
No empty positional slots.

Valid TASK: FETCH PROC FLAG RESOLVE LOG SEND BUILD MERGE CALC REPORT ACK SYNC
Valid DOM:  HR FIN SALES LEGAL IT CS MKT
```

## Development

```bash
npm install
npm run build
npm test
```

## Relationship to Python SDK

This TypeScript SDK mirrors the Python SDK exactly:
- Same packet format and AACP version (v1.1)
- Same workflow encoders with identical output
- Same validator logic and rules
- Same decoder output structure

Packets produced by the TypeScript SDK are valid inputs
to the Python SDK and vice versa.

## Links

- Spec: https://aacp.dev
- Python SDK: https://github.com/MackayAndrew/aacp
- IETF Draft: https://datatracker.ietf.org/doc/draft-mackay-aacp/
- PyPI: https://pypi.org/project/aacp/

## Licence

MIT
