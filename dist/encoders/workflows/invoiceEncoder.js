"use strict";
/**
 * AACP v1.1 Invoice Processing Workflow Encoder
 * Zero-cost deterministic encoding for AP invoice workflows.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceEncoder = void 0;
const ruleBasedEncoder_1 = require("../ruleBasedEncoder");
class InvoiceEncoder {
    constructor() {
        this.enc = new ruleBasedEncoder_1.RuleBasedEncoder();
    }
    processInvoice(supplier, amount, currency, poNumber, terms = "net30", returnAgent = "FIN-Agent", priority = "2") {
        return this.enc.encode({
            task: "PROC", domain: "FIN",
            res: "invoice",
            supplier, amt: amount, ccy: currency,
            match: poNumber, terms,
            returnAgent, priority,
        });
    }
    approvePayment(poNumber, returnAgent = "FIN-Agent", priority = "1") {
        return this.enc.encode({
            task: "PROC", domain: "FIN",
            res: "payment",
            match: poNumber,
            req: ["approve"],
            returnAgent, priority,
        });
    }
    logInvoice(poNumber, status = "approved", returnAgent = "AUD-Agent", priority = "3") {
        return this.enc.encode({
            task: "LOG", domain: "FIN",
            res: "invoice",
            match: poNumber,
            status,
            returnAgent, priority,
        });
    }
    fullProcess(supplier, amount, currency, poNumber) {
        return [
            this.processInvoice(supplier, amount, currency, poNumber),
            this.approvePayment(poNumber),
            this.logInvoice(poNumber),
        ];
    }
}
exports.InvoiceEncoder = InvoiceEncoder;
//# sourceMappingURL=invoiceEncoder.js.map