import { fetchNotesServer } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] || "All Notes";

  const title = `${category} Notes | NoteHub`;
  const description = `Browse all notes under the "${category}" category.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://08-zustand-beige-six.vercel.app/notes/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Open Graph Image",
        },
      ],
    },
  };
}

const topic = "";
const page = 1;

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const category = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", topic, page, category],
    queryFn: () => fetchNotesServer(topic, page, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
