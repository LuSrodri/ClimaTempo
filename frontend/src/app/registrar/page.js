import Image from 'next/image'
import styles from '../page.module.css'
import Link from 'next/link'

export default function Registrar() {
  return (
    <main className={styles.main}>

      <div className={styles.header}>
        <h1>ClimaTempo</h1>
      </div>

      <div className={styles.info}>
        <div className={styles.login}>
          <h2>Crie sua conta</h2>
          <input placeholder='🧑 Nome Completo'></input>
          <input placeholder='📧 Endereço Email'></input>
          <input placeholder='🔒 Senha'></input>
          <button>Registrar</button>
          <p>Já tem conta? <Link href={'/'}>Entre agora!</Link></p>
        </div>
      </div>

      <Image priority alt='ellipse 1' width={431} height={254} src={'/Ellipse1.png'}></Image>
      <Image priority alt='ellipse 2' width={350} height={280} src={'/Ellipse2.png'}></Image>
    </main>
  )
}
