"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import Navigation from "../Navigation/Navigation";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({
  onClose,
}: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.menu}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
          autoFocus
        >
          <FiX size={32} />
        </button>

        <div className={styles.navigation}>
          <Navigation
            variant="menu"
            onNavigate={onClose}
          />
        </div>

        <div className={styles.authLinks}>
          <Link
            href="/register"
            className={styles.registerLink}
            onClick={onClose}
          >
            Register
          </Link>

          <Link
            href="/login"
            className={styles.loginLink}
            onClick={onClose}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}