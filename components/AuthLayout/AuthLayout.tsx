"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import styles from "./AuthLayout.module.css";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className="container">
          <Logo variant="dark" />
        </div>
      </header>

      <main className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <div className={styles.promo}>
            <Image
              src="/images/auth-pill.png"
              alt=""
              width={179}
              height={175}
              className={styles.pill}
            />

            <h1 className={styles.title}>
              Your medication, delivered Say goodbye to all{" "}
              <span>your healthcare</span> worries with us
            </h1>
          </div>

          <div
            className={`${styles.formWrapper} ${
              isLoginPage ? styles.loginFormWrapper : ""
            }`}
          >
            {children}
          </div>
        </div>
      </main>

      <div className={styles.elements} aria-hidden="true">
        <span className={styles.element} />
        <span className={styles.element} />
        <span className={styles.element} />
      </div>
    </div>
  );
}