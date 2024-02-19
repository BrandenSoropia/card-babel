"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CardSearch from "./_card-search";

export default function Home() {
  return (
    <main className={styles.main}>
      <CardSearch />
    </main>
  );
}
