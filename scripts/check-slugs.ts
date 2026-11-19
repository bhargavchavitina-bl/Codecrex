import { slugs } from "../src/data/slug-check.ts";

const results = await Promise.all(
  slugs.map(async (slug) => {
    try {
      const response = await fetch(`https://leetcode.com/problems/${slug}/`, {
        method: "HEAD",
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0 CodeCrestSlugCheck/1.0" },
      });
      if (response.ok) return { slug, status: "valid" as const };
      if (response.status === 404 || response.status === 410)
        return { slug, status: "broken" as const, code: response.status };
      return { slug, status: "inconclusive" as const, code: response.status };
    } catch {
      return { slug, status: "inconclusive" as const };
    }
  }),
);
const broken = results.filter((item) => item.status === "broken");
const inconclusive = results.filter((item) => item.status === "inconclusive");
if (broken.length) {
  console.error(
    `Broken LeetCode slugs (${broken.length}/${slugs.length}):\n${broken.map((item) => `${item.slug} (${item.code})`).join("\n")}`,
  );
  process.exitCode = 1;
} else if (inconclusive.length) {
  console.log(
    `${results.length - inconclusive.length}/${results.length} slugs resolved. ${inconclusive.length} could not be verified because LeetCode denied or blocked the request (for example, HTTP 403).`,
  );
} else {
  console.log(`Verified ${slugs.length} unique LeetCode problem slugs.`);
}
