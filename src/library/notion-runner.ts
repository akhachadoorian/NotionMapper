// src/library/notion-runner.ts
import { getNotionDatabase, getSubDatabases } from "./notion";

(async () => {
  const pages = await getNotionDatabase();
  console.log("count:", pages.length);
  if (!pages.length) return;
  console.log("first:", pages[0]);
    const first  = pages[0];
  const p1 = getSubDatabases(first.id);

})().catch(err => {
  console.error(err);
  process.exit(1);
});
