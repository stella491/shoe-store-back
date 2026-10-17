function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const rawPort = requireEnv("PORT");
const PORT = Number(rawPort);
if (Number.isNaN(PORT)) {
  throw new Error(`Environment variable PORT must be a number, got: ${rawPort}`);
}

const MONGO_URI = requireEnv("MONGO_URI");
const JWT_SECRET = requireEnv("JWT_SECRET");

export const env = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
};

export default env;
