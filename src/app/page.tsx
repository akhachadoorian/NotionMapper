import Link from "next/link";

import { getNotionDatabase } from "../library/notion";
import "./page.scss";

export const revalidate = 300;

export default async function Home() {
    const pages = await getNotionDatabase();
    if (pages) {
        // const db_page = await getDatabasePage(pages[0].id);
    }

    return (
        <div className="home_page pages">
            <aside className="left">
                {pages.map((p) => (
                    <div className="page_section">
                        <p className="eyebrow">{p.title}</p>
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
