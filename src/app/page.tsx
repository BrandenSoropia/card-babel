"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, firebaseApp } from "@/lib/firebase/firebase";

// TODO: Figure out if connected to Firebase
// TODO: Try to get card data - https://firebase.google.com/docs/firestore/query-data/get-data
const citiesCollection = collection(db, "cities");

export default function Home() {
  const createCollection = async () => {
    try {
      console.log("## addData called", { firebaseApp, db });
      const docRef = await addDoc(citiesCollection, {
        name: "San Francisco",
        state: "CA",
        country: "USA",
        capital: false,
        population: 860000,
        regions: ["west_coast", "norcal"],
      });

      console.log("### returned docRef", docRef);
    } catch (e) {
      console.log("### addData error:", e);
    }
  };

  const getData = async () => {
    const querySnap = await getDocs(citiesCollection);

    if (!querySnap.empty) {
      console.log("### Printing docs");
      querySnap.forEach((doc) => {
        console.log(doc);
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No documents!");
    }
  };

  return (
    <main className={styles.main}>
      <button onClick={createCollection}>Create Collections</button>
      <button onClick={getData}>Add Doc</button>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
