"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === "/home" || pathname === "/";
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${
        isHomePage ? styles.homeHeader : ""
      }`}
    >
      <div className={`container ${styles.wrapper}`}>
        <Logo variant={isHomePage ? "light" : "dark"} />

        <Navigation variant="header" />

        <div className={styles.authLinks}>
          <Link
            href="/register"
            className={styles.registerLink}
          >
            Register
          </Link>

          <Link
            href="/login"
            className={styles.loginLink}
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={openMenu}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          <FiAlignJustify
            className={styles.menuIcon}
            aria-hidden="true"
          />
        </button>
      </div>

      {isMenuOpen && <MobileMenu onClose={closeMenu} />}
    </header>
  );
}