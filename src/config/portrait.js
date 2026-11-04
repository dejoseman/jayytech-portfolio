/**
 * Profile photograph — responsive sources built from src/assets/profile/.
 *
 * Files follow the pattern portrait-<width>.webp (+ one portrait-<width>.jpg
 * fallback), all cropped to a 4:5 portrait. Vite fingerprints and serves them.
 * If the folder is empty, PORTRAIT is null and the hero falls back to the
 * code-window visual, so the build never breaks.
 */
const files = import.meta.glob("../assets/profile/portrait-*.{webp,jpg}", {
    eager: true,
    query: "?url",
    import: "default",
});

const ASPECT = 5 / 4; // height / width

const entries = Object.entries(files)
    .map(([path, url]) => {
        const match = path.match(/portrait-(\d+)\.(webp|jpg)$/);
        return match ? { url, width: Number(match[1]), type: match[2] } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.width - b.width);

const webp = entries.filter((e) => e.type === "webp");
const jpg = entries.filter((e) => e.type === "jpg");
const fallback = jpg[jpg.length - 1] || webp[webp.length - 1];

export const PORTRAIT = fallback
    ? {
          webpSrcSet: webp.map((e) => `${e.url} ${e.width}w`).join(", "),
          src: fallback.url,
          width: fallback.width,
          height: Math.round(fallback.width * ASPECT),
          alt: "Portrait of Okechukwu Joseph, Full-Stack Developer and Software Engineer at Jayy Tech",
      }
    : null;
