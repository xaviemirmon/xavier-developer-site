import styles from "./contact.module.css";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  return (
    <div>
      <main>
        <div className={`${styles.page} container`}>
          <h1>Get in touch</h1>
          <div className={styles.preamble}>
            <p>
              I'm always interested in hearing about new opportunities,
              collaborations, or just connecting with fellow developers and tech
              enthusiasts.
            </p>
            <p>
              Whether you have a project in mind, a question about my work, or
              just want to say hello, feel free to reach out using the form
              below.
            </p>
          </div>
          <ContactForm className={styles.form} />
        </div>
      </main>
    </div>
  );
}
