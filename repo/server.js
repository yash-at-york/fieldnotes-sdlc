"use strict";

const http = require("http");
const crypto = require("crypto");

// Minimal capability registry for the demo. In a real system this is derived
// from the tenant/org/office hierarchy and role grants.
const capabilitiesByUser = {
  alice: ["rates.read"],
  bob: ["rates.read", "rates.publish"]
};

const auditLog = [];

function hasCapability(userId, capability) {
  const capabilities = capabilitiesByUser[userId] || [];
  return capabilities.includes(capability);
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function handlePublish(req, res) {
  let rawBody = "";
  req.on("data", (chunk) => {
    rawBody += chunk;
  });
  req.on("end", () => {
    let userId = req.headers["x-user-id"];
    if (!userId && rawBody) {
      try {
        const parsed = JSON.parse(rawBody);
        if (parsed && typeof parsed.userId === "string") {
          userId = parsed.userId;
        }
      } catch (_) {
        // Ignore malformed JSON; fall back to header/anonymous.
      }
    }
    if (!userId) {
      userId = "anonymous";
    }

    if (!hasCapability(userId, "rates.publish")) {
      const auditId = crypto.randomUUID();
      const reason = "User lacks required capability: rates.publish";
      const auditEvent = {
        id: auditId,
        timestamp: new Date().toISOString(),
        actor: userId,
        action: "rates.publish",
        decision: "deny",
        reason
      };
      auditLog.push(auditEvent);
      sendJson(res, 403, {
        status: 403,
        error: "Forbidden",
        reason,
        auditId,
        audit: auditEvent
      });
      return;
    }

    sendJson(res, 200, { status: 200, ok: true });
  });
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  if (req.method === "POST" && pathname === "/publish") {
    handlePublish(req, res);
    return;
  }
  sendJson(res, 404, { status: 404, error: "Not found" });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

module.exports = { server, auditLog, hasCapability };
