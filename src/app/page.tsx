"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { getAllFabCardData } from "@/lib/firebase/queries";

export default function Home() {
  return (
    <main className={styles.main}>
      <button onClick={getAllFabCardData}>Get all FaB Card Data</button>
    </main>
  );
}
