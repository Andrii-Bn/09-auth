import { nextServerApi } from "./api";
import { CreateNoteProps, Note } from "@/types/note";
import { User } from "../../types/user";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesResponseOptions {
  params: {
    search: string;
    tag?: string;
    page: number;
    perPage: number;
  };
  headers?: { Cookie: string };
}

export type UserRequest = {
  email: string;
  password: string;
};

export interface UpdateUser {
  username: string;
}

export interface CheckSessionOptions {
  success: boolean;
}

export async function fetchNotes(
  searchWord: string,
  page: number,
  tag?: string
) {
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
  };

  const res = await nextServerApi.get<NotesResponse>("/notes", options);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await nextServerApi.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNoteRequest(data: CreateNoteProps) {
  const res = await nextServerApi.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await nextServerApi.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function register(data: UserRequest) {
  const res = await nextServerApi.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: UserRequest) {
  const res = await nextServerApi.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServerApi.post("/auth/logout");
}

export async function getUser() {
  const res = await nextServerApi.get<User>("/users/me");
  return res.data;
}

export async function updateUser(payload: UpdateUser) {
  const res = await nextServerApi.patch<User>("/users/me", payload);
  return res.data;
}

export const checkSession = async () => {
  const res = await nextServerApi.get<CheckSessionOptions>("/auth/session");
  return res.data.success;
};
