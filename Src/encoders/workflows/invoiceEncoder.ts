/**
 * AACP v1.1 Invoice Processing Workflow Encoder
 * Zero-cost deterministic encoding for AP invoice workflows.
 */

import { RuleBasedEncoder } from "../ruleBasedEncoder";
import { EncodedPacket } from "../../schema";

export class InvoiceEncoder {
  private enc = new RuleBasedEncoder();

  processInvoice(
    supplier: string,
    amount: number,
    currency: string,
    poNumber: string,
    terms = "net30",
    returnAgent = "FIN-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "FIN",
      res: "invoice",
      supplier, amt: amount, ccy: currency,
      match: poNumber, terms,
      returnAgent, priority,
    });
  }

  approvePayment(
    poNumber: string,
    returnAgent = "FIN-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "FIN",
      res: "payment",
      match: poNumber,
      req: ["approve"],
      returnAgent, priority,
    });
  }

  logInvoice(
    poNumber: string,
    status = "approved",
    returnAgent = "AUD-Agent",
    priority = "3",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "FIN",
      res: "invoice",
      match: poNumber,
      status,
      returnAgent, priority,
    });
  }

  fullProcess(
    supplier: string,
    amount: number,
    currency: string,
    poNumber: string,
  ): EncodedPacket[] {
    return [
      this.processInvoice(supplier, amount, currency, poNumber),
      this.approvePayment(poNumber),
      this.logInvoice(poNumber),
    ];
  }
}
