import styles from "./PromoBanners.module.css";

const banners = [
    {
        id: 1,
        title: "Huge Sale",
        value: "70%",
        linkText: "Shop now",
    },
    {
        id: 2,
        title: "Secure delivery",
        value: "100%",
        linkText: "Read more",
    },
    {
        id: 3,
        title: "Off",
        value: "35%",
        linkText: "Shop now",
    },
];

export default function PromoBanners() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className="visually-hidden">
                    Promotional offers
                </h2>

                <ul className={styles.list}>
                    {banners.map((banner) => (
                        <li
                            key={banner.id}
                            className={styles.card}
                        >
                            <div className={styles.header}>
                                <span className={styles.number}>
                                    {banner.id}
                                </span>

                                <h3 className={styles.title}>
                                    {banner.title}
                                </h3>
                            </div>

                            <div className={styles.content}>
                                <p className={styles.value}>
                                    {banner.value}
                                </p>

                                <button
                                    type="button"
                                    className={styles.link}
                                >
                                    {banner.linkText}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}