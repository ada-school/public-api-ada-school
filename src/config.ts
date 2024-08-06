/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

const privateKeyJweTest = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNHqAsiLEi36dY
/4vvePW97HSJri3QSxLNEcH9+VXR17qg09WwQYk/6R+KRJYiRYOdpGeC0m9cf0ga
857+jAwJNlII8ZJfSZ9Alkl/L8Nyeoi3NWJSMAWaKhoQ9J7HThaPpW5yG12LAUOU
CP51gQezPKvC7yZB/On9FtgEZW6XUSLvjnYkKMMeptixtD3Ivv8geJJeshjN2qEk
aReNlDQjiOQw69s230rQQH7T1tnlQm7byjnO0IaywfM4PPxDb5h2CFJ1NJwKKiFY
0FiCiqgJsfzslM/2mGE8Pn68fMJbckT5SSFH4CZAnjLN0TwnHKJmTCLLu5TPaLvx
P/GU8adbAgMBAAECggEASTSEatBwE6ephJhTe2h6n8lLgDWzMRMSBzEuwHMjn0w0
VaC0s354OuB6+rBmup1/jxv1O1naF7NvavsGhAc8Zm9GEN4SZMKUPQtF+Mf1o546
u9QoHnf4D+C1w9Zh8nSalbKve7briCgv053wHsSpmFzvWhda2pMmeUaVWuBOe177
z8Ui+YBelcS6F1gtxOOwqs3rfqwg3/kLdJm23hHnPH5kfM5IpnSjFFyu9+8T8Qqs
aCQNF33BvsWiCNS276EyUhRlKx4pEErbjq/GeJL1TojxhTTNylIDAI54UenhG1XA
nvL0L9w8L+u4mqeSUGAkIkhXBtKx1aliCAGz0jXvXQKBgQD9A5fQsiIec0UTAKCn
BGzhKrAqfFwp3HYrDyFkVkiKEUgp6USHMxeFexDrwKpeobJif26YgM5C0EO5Xcly
n6dwO9oDfmop+jzf69w0FV+OjWrWIhReBoJfRFXnbamrnk4mYWDvnY4q/oI8fDpN
2vaB6mVH4E3l+UnMyUBjgHur9wKBgQDPilV6LZDwWmrwtefjsvknn+mIhXceS7Tn
JlM/Wo1b3UWSMP0mKGCoJdAJaAfM6E6K41EU+5rgFlBbdemcO1CoxjRWI209n/We
h4qGp5xDFnmYyExYtUOHvQpt2syN7EcStzyKcWKAp7rXOZ+WuJDhMH2N+rotKSA+
2T2IjblevQKBgQDkyeD4KHxNyLJHcqPTI19JZQ6T/IxiliaM3Uu2rYc+wk3dCECd
eQfl/djZNglZNSJXix/461CYfjcfYb2N1uzTwmtsCV36w3tUiLVAq6sS/rIDHCIK
vBwcBXEgqrtooufMMPY09uXd3vLpuvQF/uA1rj0Td7M5J+kiM0H0N/SdFQKBgE/v
fgCy8DJDARF5XrlKw8BJTU9x6HFYw3KMRmAOZofNb/BgwgAiaSgaeEhHM0nu5+GC
sEYeqoZI0eaIQdQU3HpE7P+IYZjstVO77NT0VbFZRLhd3VoFZt8vJoctUMARE0bY
II9KIKBg+gvPe/I3YEX7wUAgI/kk7/CFB7hCrfUZAoGBAPfEaxbKg5rNbc9iyJFh
eGbjY1e3siX+AULwgj5hqCJXm+alxjxlAUAQbULRW1ZV7GmlFDDCbB+CbaGg9fnD
OxhfkV+BDhTOBckVUj5otd3CX65lQvjAIOFVA8VH431bUh000BhQqhBvUZko0i3O
8ZyTJzPxRD59pT1u75PPakKw
-----END PRIVATE KEY-----`;

export const config = {
  ADA_PUBLIC_API_KEY: process.env.ADA_PUBLIC_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 7000,
  ADA_LXP_URL: process.env.ADA_LXP_URL || "https://localhost:4000/graphql",
  MONGO_DB_URI:
    process.env.MONGO_DB_URI ||
    "mongodb://localhost:27017/public-api-ada-school",
  WORKERS: process.env.WEB_CONCURRENCY || 1,
  JWT_SECRET: process.env.JWT_SECRET || "test-secret",
  CRON_JOB_API_KEY: process.env.CRON_JOB_API_KEY || "cron-job-secret",
  JWE_PRIVATE_KEY: process.env.JWE_PRIVATE_KEY || privateKeyJweTest,
};
