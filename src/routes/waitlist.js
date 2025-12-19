import express from "express";
import { Waitlist } from "../models/Waitlist.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { normalizeEmail, isValidEmail, cleanString, cleanFeatures } from "../utils/validate.js";

export const waitlistRouter = express.Router();

/**
 * POST /api/waitlist
 * body: { email, firstName, incomeRange?, interestedFeatures? }
 */
waitlistRouter.post("/", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const firstName = cleanString(req.body.firstName, 40);
    const incomeRange = cleanString(req.body.incomeRange || "Not specified", 40);
    const interestedFeatures = cleanFeatures(req.body.interestedFeatures);

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }
    if (!firstName) {
      return res.status(400).json({ ok: false, error: "firstName is required" });
    }

    const created = await Waitlist.create({
      email,
      firstName,
      incomeRange,
      interestedFeatures
    });

    return res.status(201).json({
      ok: true,
      message: "Added to waitlist",
      data: {
        id: created._id,
        email: created.email,
        firstName: created.firstName
      }
    });
  } catch (err) {
    // Duplicate email
    if (err?.code === 11000) {
      return res.status(409).json({ ok: false, error: "Email already on waitlist" });
    }

    console.error("Waitlist POST error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

/**
 * GET /api/waitlist/health
 */
waitlistRouter.get("/health", (req, res) => {
  res.json({ ok: true, status: "up" });
});

/**
 * Admin: GET /api/waitlist/admin/list?limit=50&skip=0
 */
waitlistRouter.get("/admin/list", adminAuth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "50", 10), 200);
  const skip = Math.max(parseInt(req.query.skip || "0", 10), 0);

  const items = await Waitlist.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("email firstName incomeRange interestedFeatures createdAt");

  const total = await Waitlist.countDocuments();

  res.json({ ok: true, total, limit, skip, items });
});

/**
 * Admin: GET /api/waitlist/admin/export.csv
 */
waitlistRouter.get("/admin/export.csv", adminAuth, async (req, res) => {
  const rows = await Waitlist.find({})
    .sort({ createdAt: -1 })
    .select("email firstName incomeRange interestedFeatures createdAt");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="waitlist-export.csv"');

  const header = "email,firstName,incomeRange,interestedFeatures,createdAt\n";
  const lines = rows.map((r) => {
    const features = (r.interestedFeatures || []).join("|");
    const safe = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
    return [
      safe(r.email),
      safe(r.firstName),
      safe(r.incomeRange),
      safe(features),
      safe(r.createdAt?.toISOString?.() || "")
    ].join(",");
  });

  res.send(header + lines.join("\n"));
});
