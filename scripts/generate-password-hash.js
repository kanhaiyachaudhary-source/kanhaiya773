// Run this once to generate your ADMIN_PASSWORD_HASH
// Usage: node scripts/generate-password-hash.js
//   Then enter your desired password when prompted
//   Copy the output hash to your Vercel env var ADMIN_PASSWORD_HASH

const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n🔐 Admin Password Hash Generator\n");
console.log("This generates a bcrypt hash of your admin password.");
console.log("Copy the output to your Vercel env var: ADMIN_PASSWORD_HASH\n");

rl.question("Enter desired admin password (min 8 chars): ", async (password) => {
  if (!password || password.length < 8) {
    console.log("❌ Password must be at least 8 characters");
    rl.close();
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  console.log("\n✅ Password hash generated:\n");
  console.log(hash);
  console.log("\nAdd this to Vercel:");
  console.log("  ADMIN_USERNAME=kanhaiya  (or your choice)");
  console.log(`  ADMIN_PASSWORD_HASH=${hash}\n`);
  rl.close();
});
