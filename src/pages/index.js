
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    
    <div>
      <button>
        <Link href="/classes">
          <span className={styles.button}>Go to classes</span>
        </Link>
      </button>
      {" "}
      <button>
        <Link href="classes/listing">
          <span className={styles.button}>Go to listing</span>
        </Link>

      </button>
    </div>
    
  )
}
