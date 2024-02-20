const https = require("https");

const apiKey = process.env.CRON_JOB_API_KEY;

const postData = JSON.stringify({});

const options = {
  hostname: "public-api.learn.ada-school.org",
  port: 443,
  path: "/system/cronjob",
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Origin: "https://public-api.learn.ada-school.org",
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
};

const req = https.request(options, (res) => {
  let responseBody = "";
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    responseBody += String(chunk);
  });
  res.on("end", () => {
    console.log("cronjob: response", responseBody);
  });
});

req.on("error", (e) => {
  console.error("cronjob: error parsing response", e);
});

req.write(postData);
req.end();
