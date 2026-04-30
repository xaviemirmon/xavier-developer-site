"use client";

import React from 'react';
import styles from './CVDownloadButton.module.css';

export default function CVDownloadButton() {
  return (
    <a 
      href="/downloads/xavier-mirabelli-montan-cv.pdf" 
      download
      className={styles.button}
    >
      Download CV (PDF)
    </a>
  );
}