import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/user.js";

async function run() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("Missing required environment variable: MONGO_URI");
  }
  await mongoose.connect(mongoUri);

  const email = process.argv[2];

  if (!email) {
    const users = await User.find().select("name email role").lean();

    console.log("\nAccounts in the database:\n");
    users.forEach((user) => {
      console.log(`  ${user.email}  —  ${user.role}`);
    });
    console.log("\nRe-run with an email to make that account an admin:");
    console.log("  npx tsx scripts/makeAdmin.ts you@example.com\n");

    await mongoose.disconnect();
    return;
  }

  const result = await User.updateOne(
    { email: email.toLowerCase() },
    { $set: { role: "admin" } },
  );

  if (result.matchedCount === 0) {
    console.log(`No account found for ${email}`);
  } else {
    console.log(
      `${email} is now an admin — log out and back in to pick it up.`,
    );
  }

  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
