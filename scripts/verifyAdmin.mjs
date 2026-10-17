import "dotenv/config";
import dns from "dns";
import mongoose from "mongoose";
import User from "../models/user.js";
import Product from "../models/Product.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {}

const BASE = "http://127.0.0.1:4001/api";
const ADMIN = {
  name: "temp admin",
  email: "zz-temp-admin@example.com",
  password: "secret123",
};
const PLAIN = {
  name: "temp user",
  email: "zz-temp-user@example.com",
  password: "secret123",
};

let pass = 0,
  fail = 0;
const check = (label, actual, expected) => {
  const ok = actual === expected;
  ok ? pass++ : fail++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label}  (got ${actual}, expected ${expected})`,
  );
};

const call = async (method, path, { token, body } = {}) => {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {}
  return { status: res.status, json };
};

await mongoose.connect(process.env.MONGO_URI);

const usersBefore = await User.countDocuments();
const productsBefore = await Product.countDocuments();
console.log(`\nBefore: ${usersBefore} users, ${productsBefore} products\n`);

await call("POST", "/auth/signup", { body: ADMIN });
await call("POST", "/auth/signup", { body: PLAIN });
await User.updateOne({ email: ADMIN.email }, { $set: { role: "admin" } });

const adminLogin = await call("POST", "/auth/login", {
  body: { email: ADMIN.email, password: ADMIN.password },
});
const plainLogin = await call("POST", "/auth/login", {
  body: { email: PLAIN.email, password: PLAIN.password },
});

console.log("--- LOGIN ---");
check("admin can log in", adminLogin.status, 200);
check("login response carries the role", adminLogin.json?.user?.role, "admin");
check(
  "password hash is NOT returned",
  adminLogin.json?.user?.password,
  undefined,
);

const adminToken = adminLogin.json?.token;
const plainToken = plainLogin.json?.token;

const shoe = {
  name: "ZZ Temp Runner",
  brand: "TestBrand",
  category: "men",
  price: 99,
  description: "Temporary product created by an automated check.",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
    "",
    "",
    "",
  ],
};

console.log("\nWHO MAY ADD A SHOE");
check(
  "no token -> 401",
  (await call("POST", "/products", { body: shoe })).status,
  401,
);
check(
  "garbage token -> 401",
  (await call("POST", "/products", { token: "nonsense", body: shoe })).status,
  401,
);
check(
  "logged in but NOT admin -> 403",
  (await call("POST", "/products", { token: plainToken, body: shoe })).status,
  403,
);

console.log("\nVALIDATION (as admin)");
check(
  "missing name -> 400",
  (
    await call("POST", "/products", {
      token: adminToken,
      body: { ...shoe, name: "" },
    })
  ).status,
  400,
);
check(
  "price of 0 -> 400",
  (
    await call("POST", "/products", {
      token: adminToken,
      body: { ...shoe, price: 0 },
    })
  ).status,
  400,
);
check(
  "bad category -> 400",
  (
    await call("POST", "/products", {
      token: adminToken,
      body: { ...shoe, category: "kids" },
    })
  ).status,
  400,
);
check(
  "no images -> 400",
  (
    await call("POST", "/products", {
      token: adminToken,
      body: { ...shoe, images: ["", "", "", ""] },
    })
  ).status,
  400,
);

console.log("\nTHE HAPPY PATH");
const created = await call("POST", "/products", {
  token: adminToken,
  body: shoe,
});
check("admin adds a shoe -> 201", created.status, 201);
check("empty image slots were stripped", created.json?.images?.length, 1);
check("price stored as a number", typeof created.json?.price, "number");

const listed = await call("GET", "/products");
check(
  "new shoe appears in the storefront list",
  listed.json?.some((p) => p._id === created.json?._id),
  true,
);

console.log("\nCLEANUP");
if (created.json?._id) await Product.deleteOne({ _id: created.json._id });
await User.deleteMany({
  email: { $in: [ADMIN.email, PLAIN.email, "zz-probe@example.com"] },
});

const usersAfter = await User.countDocuments();
const productsAfter = await Product.countDocuments();
check("users back to the original count", usersAfter, usersBefore);
check("products back to the original count", productsAfter, productsBefore);

console.log(
  `\n================  ${pass} passed, ${fail} failed  ================`,
);

await mongoose.disconnect();
process.exit(fail === 0 ? 0 : 1);
