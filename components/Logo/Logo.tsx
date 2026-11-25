import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
  variant?: "light" | "dark";
}

export default function Logo({ variant = "dark" }: LogoProps) {
  return (
    <Link href="/home" className={`${styles.logo} ${styles[variant]}`}>
      <Image
        src={
          variant === "light"
            ? "/images/logo-white.png"
            : "/images/logo-green.png"
        }
        alt=""
        width={32}
        height={32}
        className={styles.icon}
      />

      <span>E-Pharmacy</span>
    </Link>
  );
}