"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const navigationLinks = [
  { href: "/home", label: "Home" },
  { href: "/medicine-store", label: "Medicine store" },
  { href: "/medicine", label: "Medicine" },
];

type NavigationProps = {
  variant: "menu" | "header" | "footer";
  onNavigate?: () => void;
};

export default function Navigation({
  variant,
  onNavigate,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={styles[variant]}
      aria-label={
        variant === "footer"
          ? "Footer navigation"
          : "Main navigation"
      }
    >
      <ul className={styles.list}>
        {navigationLinks.map(({ href, label }) => {
          const isActive =
             pathname === href || (href === "/home" && pathname === "/");

          return (
            <li key={href} className={styles.item}>
              <Link
                href={href}
                className={`${styles.link} ${
                  isActive ? styles.active : ""
                }`}
                aria-current={isActive ? "page" : undefined}
                onClick={onNavigate}
              >
                <span className={styles.label}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}