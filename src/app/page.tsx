"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CardSearch from "./CardSearch";
import {} from "@/lib/firebase/queries";

export default function Home() {
  return (
    <main className={styles.main}>
      <CardSearch />
    </main>
  );
}
