import Header from "@/components/Header/Header";
import styles from "./layout.module.css";
import Footer from "@/components/Footer/Footer";

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

