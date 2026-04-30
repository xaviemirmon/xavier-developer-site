import React from 'react';
import { CustomMDX } from "@/components/mdx";
import CVDownloadButton from "@/components/CVDownloadButton";
import styles from './CVPage.module.css';

export default function CVPage({ source }: { source: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <CVDownloadButton />
      </div>
      <article className={styles.content}>
        <CustomMDX source={source} />
      </article>
    </div>
  );
}