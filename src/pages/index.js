
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleRegeneration = async(teamClass) => {
    try {
      const response = await fetch("/api/revalidate?secret=secrettoken", {
        method: "GET",
        headers: { "Content-Type": "application/json"}
      });
      console.log("response", response);
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    
    <div>
      <button>
        <Link href="/classes">
          <span className={styles.button}>Go to classes</span>
        </Link>
      </button>
      {" "}
      <button onClick={handleRegeneration}>
          <span className={styles.button}>Revalidate</span>
      </button>
    </div>
    
  )
}
