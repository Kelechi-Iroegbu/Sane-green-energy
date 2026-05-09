// Whitelist of frontend origins allowed to call this API
const staticOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

// Regex patterns for dynamic preview/published origins
const originPatterns = [
  /^https:\/\/([a-z0-9-]+\.)*lovable\.app$/i,
  /^https:\/\/([a-z0-9-]+\.)*lovableproject\.com$/i,
  /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i,
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (staticOrigins.includes(origin)) return callback(null, true);
    if (originPatterns.some((re) => re.test(origin))) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

module.exports = corsOptions;
