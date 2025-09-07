import { Client, isFullPage } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export type CleanPage = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  slug: string;
};


function slugify(s: string) {
  return s.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Get the Database data from Notion
export async function getNotionDatabase() {
    const res = await notion.dataSources.query({
        data_source_id: process.env.NOTION_DB_ID!,
    });
    // console.log(JSON.stringify(res.results, null, 2));

    const pages = res.results.filter(isFullPage).map((p): CleanPage => {
        // if (isFullPage(p)) {
            // Get Props
            // console.log("properties", p.properties);
            const props = p.properties;

            // Get Icon
            const i = p.icon;
            let icon = "";
            if (i && i.type === "emoji") {
                icon = i.emoji;
            }

            // Get Collection Title
            // console.log("collection title", props["Collection Title"]);
            const collect_title = props["Collection Title"];

            // Get Collection Title
            // const title = collect_title.map((t) => t.plain_text).join("")
            let title = "";
            if (collect_title.type === "title") {
                for (let i = 0; i < collect_title.title.length; i++) {
                    const span = collect_title.title[i];
                    title += span.plain_text ?? "";
                }
            }

            // Get Collection Description
            // console.log("collection desc", props["Collection Description"]);
            const collect_desc = props["Collection Description"];

            // Get Collection Title
            // const title = collect_title.map((t) => t.plain_text).join("")
            let desc = "";
            if (collect_desc.type === "rich_text") {
                for (let i = 0; i < collect_desc.rich_text.length; i++) {
                    const span = collect_desc.rich_text[i];
                    desc += span.plain_text ?? "";
                }
            }

            // Get slug
            const slug = slugify(title);



            return { id: p.id, title: title, description: desc, icon: icon, slug: slug}
        // }
    });

    return pages;
}

// Get each Database page from Notion
export async function getDatabasePageBlocks(page_id: string) {
    console.log("page_id", page_id)

    const res = await notion.blocks.children.list({
        block_id: page_id
    })

    console.log(JSON.stringify(res.results, null));
}

// Get each block from each Database Page in Notion
