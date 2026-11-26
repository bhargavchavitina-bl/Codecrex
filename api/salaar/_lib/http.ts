import type { IncomingMessage, ServerResponse } from "node:http";

export type NodeRequest = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
};

export type NodeResponse = ServerResponse & {
  status?: (code: number) => NodeResponse;
  json?: (payload: unknown) => void;
};

export function sendJson(res: NodeResponse, statusCode: number, payload: unknown): void {
  if (typeof res.status === "function" && typeof res.json === "function") {
    const nextRes = res.status(statusCode);
    if (typeof nextRes.json === "function") {
      nextRes.json(payload);
      return;
    }
  }
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export function getQueryParams(req: NodeRequest): URLSearchParams {
  const urlStr = req.url || "/";
  const idx = urlStr.indexOf("?");
  if (idx >= 0) {
    return new URLSearchParams(urlStr.slice(idx + 1));
  }
  const params = new URLSearchParams();
  if (req.query) {
    for (const [k, v] of Object.entries(req.query)) {
      if (typeof v === "string") params.set(k, v);
      else if (Array.isArray(v) && typeof v[0] === "string") params.set(k, v[0]);
    }
  }
  return params;
}

export async function readJsonBody<T = Record<string, unknown>>(req: NodeRequest): Promise<T> {
  if (req.body && typeof req.body === "object") {
    return req.body as T;
  }
  if (typeof req.body === "string" && req.body.trim()) {
    return JSON.parse(req.body) as T;
  }

  return await new Promise<T>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;
    const MAX_BYTES = 512 * 1024; // 512 KB cap

    req.on("data", (chunk: Buffer) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BYTES) {
        reject(new Error("Request payload too large."));
        req.destroy();
        return;
      }
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) {
        resolve({} as T);
        return;
      }
      try {
        resolve(JSON.parse(raw) as T);
      } catch {
        reject(new Error("Invalid JSON request body."));
      }
    });
    req.on("error", (err) => reject(err));
  });
}
