export function adminAuth(req, res, next) {
  const apiKey = req.header("x-admin-key");
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  next();
}
