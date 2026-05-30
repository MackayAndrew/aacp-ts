/**
 * AACP v1.1 IT Provisioning Workflow Encoder
 * Zero-cost deterministic encoding for IT provisioning workflows.
 */

import { RuleBasedEncoder } from "../ruleBasedEncoder";
import { EncodedPacket } from "../../schema";

export class ITEncoder {
  private enc = new RuleBasedEncoder();

  createAccount(
    username: string,
    dept: string,
    returnAgent = "IT-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "BUILD", domain: "IT",
      res: "ad_account",
      filterExpr: `usr=${username}`,
      fields: ["email", "dept", "grp", "pwd_reset"],
      returnAgent, priority,
    });
  }

  assignLicences(
    username: string,
    licences: string[],
    returnAgent = "IT-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "IT",
      res: "licences",
      filterExpr: `usr=${username}`,
      req: licences,
      returnAgent, priority,
    });
  }

  configureAccess(
    username: string,
    systems: string[],
    returnAgent = "IT-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "BUILD", domain: "IT",
      res: "access_profile",
      filterExpr: `usr=${username}`,
      req: systems,
      returnAgent, priority,
    });
  }

  sendWelcome(
    username: string,
    returnAgent = "IT-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "SEND", domain: "IT",
      to: [username],
      subj: `welcome_${username}_onboarding`,
      flagMsg: "onboarding_complete",
      returnAgent, priority,
    });
  }

  logProvisioning(
    username: string,
    actor = "IT-Agent",
    returnAgent = "AUD-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "IT",
      actor,
      status: "provisioned",
      filterExpr: `usr=${username}`,
      returnAgent, priority,
    });
  }

  fullProvision(username: string, dept: string, licences: string[]): EncodedPacket[] {
    return [
      this.createAccount(username, dept),
      this.assignLicences(username, licences),
      this.configureAccess(username, ["email", "vpn", "sharepoint"]),
      this.sendWelcome(username),
      this.logProvisioning(username),
    ];
  }
}
