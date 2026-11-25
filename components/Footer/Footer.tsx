import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "@/components/Logo/Logo";
import styles from "./Footer.module.css";

const navigationLinks = [
  { href: "/home", label: "Home" },
  { href: "/medicine-store", label: "Medicine store" },
  { href: "/medicine", label: "Medicine" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/goITclub/",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.instagram.com/goitclub/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.youtube.com/c/GoIT",
    label: "YouTube",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo variant="light" />

            <p className={styles.description}>
              Get the medicine to help you feel better, get back to your
              active life, and enjoy every moment.
            </p>
          </div>

          <nav
            className={styles.navigation}
            aria-label="Footer navigation"
          >
            <ul className={styles.navList}>
              {navigationLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.navLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={styles.socialList}>
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon
                    className={styles.socialIcon}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span>© E-Pharmacy 2023. All Rights Reserved</span>
            </li>

            <li className={styles.infoItem}>
              <span>Privacy Policy</span>
            </li>

            <li className={styles.infoItem}>
              <span>Terms &amp; Conditions</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}