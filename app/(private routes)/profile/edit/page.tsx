"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getUser, updateUser } from "../../../../lib/api/clientApi";
import { ApiError } from "../../../../app/api/api";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "../../../../lib/store/authStore";

export default function EditProfile() {
  const [userName, setUserName] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    getUser().then((user) => {
      setUserName(user.username);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSaveUser = async (formData: FormData) => {
    if (!user) return;

    const username = formData.get("username") as string;

    try {
      const res = await updateUser({ username });
      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      toast.error(
        (error as ApiError).response?.data?.response?.validation?.body
          ?.message ??
          (error as ApiError).response?.data?.response?.message ??
          (error as ApiError).response?.data?.error ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form action={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
              required
            />
          </div>

          <p>Email: {user?.email || "—"}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
