/**
 * AACP v1.1 HR Onboarding / JML Workflow Encoder
 * Zero-cost deterministic encoding for Joiner-Mover-Leaver workflows.
 *
 * Real-world basis:
 *   JML Best Practices for IT Teams 2025 (CloudEagle, Oct 2025)
 *   8-Step IAM Implementation Plan (ConductorOne, March 2026)
 *   Perfecting the JML Process with Entra ID (Kocho, May 2026)
 */

import { RuleBasedEncoder } from "../ruleBasedEncoder.js";
import { EncodedPacket } from "../../schema.js";

export class JMLEncoder {
  private enc = new RuleBasedEncoder();

  // ── Joiner ────────────────────────────────────────────────────────────────

  fetchNewHire(
    employeeId: string,
    returnAgent = "HR-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "FETCH", domain: "HR",
      res: "employee_record",
      filterExpr: `id=${employeeId}`,
      fmt: "json",
      returnAgent, priority,
    });
  }

  createAccount(
    username: string,
    _dept: string,
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
    licences: string[] = ["M365", "Slack", "VPN"],
    returnAgent = "IT-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "IT",
      res: "licence_assignment",
      filterExpr: `usr=${username}`,
      req: licences,
      returnAgent, priority,
    });
  }

  configureAccess(
    username: string,
    systems: string[] = ["email", "vpn", "sharepoint"],
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
    returnAgent = "HR-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "SEND", domain: "HR",
      to: [username],
      subj: `welcome_${username}_onboarding`,
      flagMsg: "onboarding_complete",
      returnAgent, priority,
    });
  }

  logProvisioning(
    username: string,
    actor = "IT-Agent",
    status = "provisioned",
    returnAgent = "AUD-Agent",
    priority = "2",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "IT",
      actor, status,
      filterExpr: `usr=${username}`,
      chain: ["HR-Agent", "IT-Agent", "IT-Agent", "IT-Agent", "HR-Agent"],
      returnAgent, priority,
    });
  }

  fullJoiner(
    employeeId: string,
    username: string,
    dept: string,
    licences?: string[],
  ): EncodedPacket[] {
    return [
      this.fetchNewHire(employeeId),
      this.createAccount(username, dept),
      this.assignLicences(username, licences),
      this.configureAccess(username),
      this.sendWelcome(username),
      this.logProvisioning(username),
    ];
  }

  // ── Mover ─────────────────────────────────────────────────────────────────

  updateAccess(
    username: string,
    newRole: string,
    returnAgent = "IT-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "IT",
      res: "access_update",
      filterExpr: `usr=${username}`,
      rules: `role=${newRole}`,
      validate: "no_privilege_creep",
      returnAgent, priority,
    });
  }

  // ── Leaver ────────────────────────────────────────────────────────────────

  revokeAccess(
    username: string,
    returnAgent = "IT-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "PROC", domain: "IT",
      res: "access_revocation",
      filterExpr: `usr=${username}`,
      req: ["disable_ad", "revoke_licences", "revoke_vpn"],
      returnAgent, priority,
    });
  }

  logOffboarding(
    username: string,
    actor = "IT-Agent",
    returnAgent = "AUD-Agent",
    priority = "1",
  ): EncodedPacket {
    return this.enc.encode({
      task: "LOG", domain: "IT",
      actor, status: "offboarded",
      filterExpr: `usr=${username}`,
      returnAgent, priority,
    });
  }
}
