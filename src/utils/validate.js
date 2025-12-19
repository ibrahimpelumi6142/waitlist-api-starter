export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function isValidEmail(email) {
  const e = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function cleanString(s, max = 80) {
  const v = String(s || "").trim();
  return v.length > max ? v.slice(0, max) : v;
}

export function cleanFeatures(arr, maxItems = 12) {
  if (!Array.isArray(arr)) return [];
  const cleaned = arr
    .map((x) => cleanString(x, 40))
    .filter(Boolean);

  return [...new Set(cleaned)].slice(0, maxItems);
}
