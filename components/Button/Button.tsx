"use client";

import { useRouter } from "next/navigation";
import styles from "./Button.module.css";

export default function Button({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  const router = useRouter();
  return (
    <button className={styles.button} onClick={() => router.push(href)}>
      {children}
    </button>
  );
}
