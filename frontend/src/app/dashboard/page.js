import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './dashboard.module.css'
import Link from 'next/link'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    <main className={styles.main}>

      <div className={styles.header}>
        <div>
          <h3>Chuva Forte</h3>
          <h1>19°</h1>
          <h2>São Paulo</h2>
        </div>
        <div>
          <h2>7:30 PM</h2>
          <h2>Quarta-feira</h2>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.topbar}>
          <h1>Temperaturas</h1>
          <button><FontAwesomeIcon icon={faPlus} /> Adicionar cidade</button>
        </div>
        <div>
          // cidades
        </div>
      </div>
    </main>
  )
}
