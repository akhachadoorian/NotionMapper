
import { getNotionDatabase } from "@/library/notion";

export const revalidate = 300;

export default async function CollectionPage({ params }: { params: { slug: string } }) {
    const pages = await getNotionDatabase();
    const page = pages.find(p => p.slug === params.slug);

    return (
        <div className="">

        </div>
    )
}

