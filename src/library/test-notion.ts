// test-notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

(async () => {
  const res = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DB_ID!,
    page_size: 3,
  });
  console.log(JSON.stringify(res.results, null, 2));
})();
