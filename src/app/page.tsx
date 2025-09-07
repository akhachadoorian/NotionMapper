import { getNotionDatabase } from "../library/notion";
import "./page.scss";

export default async function Home() {
    const pages = await getNotionDatabase();
    if (pages) {
        // const db_page = await getDatabasePage(pages[0].id);
    }

    return (
        <div className="home_page">
            <div className="banner">
                <h1>Caboose Guides</h1>
            </div>


            <ul className="collection_btns">
                {pages.map((p) => (
                    <li key={p.id} className="collection_btn">
                        <p className="icon">{p.icon}</p>
                        <h5 className="title">{p.title}</h5>
                        <p className="desc">{p.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
