import { getImageProps } from "next/image";
import styles from "./MainBanner.module.css";

export default function MainBanner() {
  const { props: mobile } = getImageProps({
    src: "/images/main-banner-mobile.png",
    alt: "Green and white medicine capsules",
    width: 331,
    height: 312,
    sizes: "(max-width: 374px) calc(100vw - 40px), 331px",
  });

  const { props: tablet } = getImageProps({
    src: "/images/main-banner-tablet.png",
    alt: "Green and white medicine capsules",
    width: 704,
    height: 508,
    sizes: "704px",
  });

  const { props: desktop } = getImageProps({
    src: "/images/main-banner-desktop.png",
    alt: "Green and white medicine capsules",
    width: 749,
    height: 508,
    sizes: "749px",
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.content}>
          <picture>
            <source
              media="(min-width: 1440px)"
              srcSet={desktop.srcSet}
              sizes={desktop.sizes}
            />

            <source
              media="(min-width: 768px)"
              srcSet={tablet.srcSet}
              sizes={tablet.sizes}
            />

            <img
              {...mobile}
              alt="Green and white medicine capsules"
              className={styles.image}
              loading="eager"
              fetchPriority="high"
            />
          </picture>

          <h1 className={styles.title}>
            Your medication delivered
          </h1>

          <p className={styles.description}>
            Say goodbye to all your healthcare worries with us
          </p>
        </div>
      </div>
    </section>
  );
}