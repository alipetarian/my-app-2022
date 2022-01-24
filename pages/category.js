import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import Layout from './layout'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Category - Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">CATEGORY PAGE</a>
        </h1>

        <p className={styles.description}>
          <Link prefetch={false} href="/"><a> Home</a></Link> <br />
          <Link prefetch={false} href="/search"><a> Search Page</a></Link> <br />
          <Link prefetch={false} href="/category"><a> Category Page</a></Link> <br />
          <Link prefetch={false} href="/test"><a> Test Page</a></Link> <br />
          
        </p>

        <div style={{
          display: 'flex', 
          flex: 1,
          width: 500,
          justifyContent: 'space-between',
          }} className="offer-links">

          <div><a href="https://truely.rdtk.io/click/3">Offer 3</a></div>
          <div><a href="https://truely.rdtk.io/click/4">Offer 4</a></div>
          <div><a href="https://truely.rdtk.io/click/5">Offer 5</a></div>
          <div><a href="https://truely.rdtk.io/click/6">Offer 6</a></div>
        </div>

      </Layout>
    </div>
  )
}