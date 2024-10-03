"use client";

import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? styles.active : "";
  };

  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <Image
          src={"/images/logo-image.svg"}
          alt="Xavier Mirabelli-Montan Logo"
          width={40}
          height={70}
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={isActive("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link href="/cv" className={isActive("/blog")}>
              CV
            </Link>
          </li>
          <li>
            <Link href="/blog" className={isActive("/blog")}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className={isActive("/contact")}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
