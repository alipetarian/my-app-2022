
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Layout= ({ children }) => (
  <div className={styles.container}>
    <h3>Header goes here </h3>
    <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org"> Next.js! -4 </a>
        </h1>
       {children}
        
    </main>

    <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    
  </div>
);

export default Layout;