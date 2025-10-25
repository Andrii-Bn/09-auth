"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";

interface NotesClientProps {
  category?: string;
}

export default function NotesClient({ category }: NotesClientProps) {
  const params = useParams();

  const activeCategory = category ?? (params?.category as string | undefined);

  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["notes", topic, page, activeCategory],
    queryFn: () => fetchNotes(topic, page, activeCategory),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setTopic(searchWord);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchWord} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            updatePage={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isError && (
        <ErrorMessage errorText="There was an error, please try again..." />
      )}
      {data && data.notes.length === 0 && (
        <ErrorMessage errorText="No notes found" />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      <Toaster />
    </div>
  );
}
