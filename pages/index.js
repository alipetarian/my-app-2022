import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from './layout'
import cookie from 'cookie-cutter'

export default function Home() {

  const handleClick =(e) =>{
    e.preventDefault();
    e.stopPropagation();
    const url = e.target.href;
    const rtClickid = cookie.get('rtkclickid-store')

    console.log('HANDLE CLICK',url)
    console.log('CLICK ID: ', rtClickid)

    window.open(`${url}?clickid=${rtClickid}`)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>

      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org"> Homepage </a>
      </h1>

      <p className={styles.description}>
        <Link href="/"><a> Home</a></Link> <br />
        <Link href="/search"><a> Search Page</a></Link> <br />
        <Link href="/category"><a> Category Page</a></Link> <br />
        <Link href="/test"><a> Test Page</a></Link> <br />
        
      </p>

      <div style={{
        display: 'flex', 
        flex: 1,
        width: 500,
        justifyContent: 'space-between',
        }} className="offer-links">

        <div><a onClick={handleClick} href="https://truely.rdtk.io/click/1">Offer 1</a></div>
        <div><a onClick={handleClick} href="https://truely.rdtk.io/click/2">Offer 2</a></div>
        <div><a onClick={handleClick} href="https://truely.rdtk.io/click/3">Offer 3</a></div>
        <div><a onClick={handleClick} href="https://truely.rdtk.io/click/4">Offer 4</a></div>
      </div>

      </Layout>
      
    </>
  )
}
