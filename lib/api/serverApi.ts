import { cookies } from "next/headers";
import { nextServerApi } from "./api";
import {
  CheckSessionOptions,
  NotesResponseOptions,
  NotesResponse,
} from "./clientApi";
import { Note } from "../../types/note";
import { User } from "../../types/user";

export async function fetchNotesServer(
  searchWord: string,
  page: number,
  tag?: string
) {
  const cookieStore = await cookies();
  if (tag === "All") {
    tag = undefined;
  }

  const options: NotesResponseOptions = {
    params: {
      search: searchWord,
      tag: tag,
      page: page,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const { data } = await nextServerApi.get<NotesResponse>("/notes", options);
  return data;
}

export async function fetchNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const { data } = await nextServerApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSessionServer() {
  const cookieStore = await cookies();
  const res = await nextServerApi.get<CheckSessionOptions>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getUserServer() {
  const cookieStore = await cookies();
  const { data } = await nextServerApi.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
