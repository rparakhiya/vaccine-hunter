import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Check Vaccine availability</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/pincode/411014/18">
          <a>Pune (411014) - 18+</a>
        </Link>
        <Link href="/district/363/18">
          <a>Pune (District) - 18+</a>
        </Link>
        <hr />
        <Link href="/pincode/360005/18">
          <a>Rajkot (360005) - 18+</a>
        </Link>
        <Link href="/pincode/360005/45">
          <a>Rajkot (360005) - 45+</a>
        </Link>
        <Link href="/district/173/18">
          <a>Rajkot (District) - 18+</a>
        </Link>
        <Link href="/district/173/45">
          <a>Rajkot (District) - 45+</a>
        </Link>
      </main>

      <footer className={styles.footer}>💻 by Rumit Parakhiya</footer>
    </div>
  );
}
