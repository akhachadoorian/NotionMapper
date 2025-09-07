import Link from "next/link";

import { getNotionDatabase } from "../library/notion";
import "./page.scss";

export const revalidate = 300;

type SubDb = { id: string; title: string };

export default async function Home() {
    const pages = await getNotionDatabase();
    // const subPagesById: Record<string, SubDb[]> = Object.fromEntries(
    //     await Promise.all(
    //         pages.map(async (p) => {
    //             const subs = (await getSubDatabases(p.id)) ?? [];
    //             return [p.id, subs] as const;
    //         })
    //     )
    // );

    return (
        <div className="home_page pages">
            <aside className="left">
                {pages.map((p) => (
                    <div className="page_section" key={p.id}>
                        <p className="eyebrow">{p.title}</p>
                        {/* {subPagesById[p.id].map((sp) => {
                            <p>{sp.title}</p>;
                        })} */}
                    </div>
                ))}
            </aside>

            <div className="body_content">
                <ul className="collection_btns">
                    {pages.map((p) => (
                        <li key={p.id} className="collection_btn">
                            <Link className="collection_btn-inner" href={`/${p.slug}`}>
                                <div className="header_text">
                                    <p className="icon">{p.icon}</p>
                                    <h5 className="title">{p.title}</h5>
                                </div>

                                <p className="desc">{p.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <aside className="right"></aside>
        </div>
    );
}
