// Whitelist of frontend origins allowed to call this API
const allowedOrigins = [
process.env.CLIENT_URL,
"https://sanegreenenergy.com",
"https://www.sanegreenenergy.com",
].filter(Boolean);

// Allow any Lovable preview/published subdomain + any *.pages.dev (Cloudflare) host
const allowedOriginPatterns = [
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*pages\.dev$/i,
];

// Local dev servers run on a sandbox-assigned port that changes between sessions —
// allow any localhost/127.0.0.1 port outside production instead of hardcoding one.
if (process.env.NODE_ENV !== "production") {
  allowedOriginPatterns.push(/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/i);
}

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (allowedOriginPatterns.some((re) => re.test(origin))) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

module.exports = corsOptions;
