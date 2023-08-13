'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './dashboard.module.css'
import Link from 'next/link'
import { faCloudShowersHeavy, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import Card from '@/components/card'
import { useEffect } from 'react'
import isloggedin from '@/functions/isloggedin'

export default function Dashboard() {

  useEffect(() => {
    callingIsloggedin();

    async function callingIsloggedin() {
      if (!(await isloggedin())) window.location.href = '/';
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.topbar}>
        <h3><Link href={'/sair'}><FontAwesomeIcon icon={faRightFromBracket} /></Link></h3>
        <h3 className={styles.user}><FontAwesomeIcon icon={faUser} /> Lucas Santos Rodrigues</h3>
      </div>

      <div className={[styles.firstcity, styles.sunny].join(' ')}>
        <div style={{ minWidth: "60%" }}>
          <h2><FontAwesomeIcon icon={faCloudShowersHeavy} /></h2>
          <h3>Chuva Forte</h3>
          <h1>19°</h1>
          <h2>São Paulo</h2>
        </div>
        <div>
          <h2>7:30 PM</h2>
          <h2>Quarta-feira</h2>
        </div>
      </div>

      <div className={styles.allcities}>
        <div className={styles.addcity}>
          <h2>Temperaturas</h2>
          <input placeholder={"+ Adicionar cidade"}></input>
        </div>
        <div className={styles.cities}>
          <Card  ></Card>
          <Card  ></Card>
          <Card  ></Card>
        </div>
      </div>
    </main>
  )
}
