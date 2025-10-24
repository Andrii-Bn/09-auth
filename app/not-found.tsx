import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 — Page Not Found | NoteHub",
  description:
    "The page you're looking for doesn't exist or has been moved. Return to the NoteHub homepage to continue exploring.",
  openGraph: {
    title: "404 — Page Not Found | NoteHub",
    description:
      "The page you're looking for doesn't exist or has been moved. Return to the NoteHub homepage to continue exploring.",
    url: "https://08-zustand-beige-six.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — note management app",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={`${css.container} ${css.main}`}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
