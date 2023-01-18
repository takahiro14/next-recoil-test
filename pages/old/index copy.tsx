import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import { useRecoilState } from "recoil";
import { countState, userState } from "../components/atoms";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //atomの値の操作を定義（read,write)
  const [count, setCount] = useRecoilState(countState);
  const [user, setUser] = useRecoilState(userState);

  //count increment処理
  const increment = c => {
    return c + 1;
  }

  //userのageをカウントアップ（機能としては意味無し）
  const updateUser = u => {
    return { ...u, ...{ age: u.age + 1 } };
  }













  return (
    <>
      <Head>
        <title>aaaaa Next App</title>
  
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

      <h1>追加ですよ</h1>
      <div>
        <p suppressHydrationWarning={true}>count:{count}</p>
        <button onClick={() => setCount(increment)}>count increment</button>
        <hr />
        <p suppressHydrationWarning={true}>user.name:{user.name}</p>
        <p suppressHydrationWarning={true}>user.age:{user.age}</p>
        <button onClick={() => setUser(updateUser)}>age increment</button>
      </div>
      <hr />
      <div>
      <Link href="./about">aboutへGo!</Link>
      </div>

      <div className={styles.thirteen}>
        <Image
          src="/thirteen.svg"
          alt="13"
          width={40}
          height={31}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and&nbsp;API.
          </p>
        </a>
      </div>




      </main>
    </>
  )
}
