/*! Copyright (c) 2025, XAPP AI */
// convert.js
const fs = require("fs");

console.log("🚀 Script started...");

try {
  // Source for this csv file is https://gist.github.com/benjiwheeler/47a18c46b7324759ab28
  const csv = fs.readFileSync("./zip2tz.csv", "utf-8");
  console.log("✅ CSV read successfully");

  const lines = csv.trim().split("\n");
  const zipMap = {};

  for (const line of lines) {
    const [zip, , , timezone] = line.replace(/'/g, "").split(",");
    console.log(`Processing ZIP: ${zip}, Timezone: ${timezone}`);
    zipMap[zip] = timezone;
  }

  fs.writeFileSync("./zip-to-timezone-flat.json", JSON.stringify(zipMap, null, 2));
  console.log("✅ Wrote zip-to-timezone-flat.json");
} catch (err) {
  console.error("❌ Error:", err);
}
