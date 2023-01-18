import styles from "../styles/Home.module.css";

export default function testpage() {
  // https://www.youtube.com/watch?v=eEP7CLqnRr0
  // nfae+tab で構文が自動挿入　next.js　snipedプラスで

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <h1 className={styles.title}>テストページです</h1>
      </main>
    </div>
  );
}
