'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import Link from 'next/link'
import isloggedin from '@/functions/isloggedin';
import { useEffect, useState } from 'react';

export default function Registrar() {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callingIsloggedin();

    async function callingIsloggedin() {
      if (await isloggedin()) window.location.href = '/dashboard';
    }

    document.querySelectorAll('input')[0].focus();
  }, []);

  async function register() {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      login();
    }
    catch (e) {
      setError(e.message);
    }
    finally {
      setLoading(false);
    }
  }

  async function login() {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      sessionStorage.setItem('token', data.access_token);
      sessionStorage.setItem('id', data.id);
      window.location.href = '/dashboard';
    }
    catch (e) {
      setError(e.message);
    }
    finally {
      setLoading(false);
    }
  }

  function onEnter(e) {
    if (e.key === 'Enter') {
      if (e.target.id === 'go') {
        register();
        return;
      }
      e.target.nextElementSibling.focus();
    }
  }

  return (
    <main className={styles.main}>

      <div className={styles.header}>
        <h1>ClimaTempo</h1>
      </div>

      <div className={styles.info}>
        <div className={styles.login}>
          <h2>Crie sua conta</h2>
          <input onKeyDown={onEnter} onChange={(e) => setNome(e.target.value)} placeholder='🧑 Nome Completo'></input>
          <input onKeyDown={onEnter} onChange={(e) => setEmail(e.target.value)} placeholder='📧 Endereço Email'></input>
          <input onKeyDown={onEnter} onChange={(e) => setSenha(e.target.value)} placeholder='🔒 Senha'></input>
          <button disabled={loading} id='go' onKeyDown={onEnter} onClick={register}>Registrar</button>
          <p>{error}</p>
          <p>Já tem conta? <Link href={'/'}>Entre agora!</Link></p>
        </div>
      </div>

      <Image priority alt='ellipse 1' width={431} height={254} src={'/Ellipse1.png'}></Image>
      <Image priority alt='ellipse 2' width={350} height={280} src={'/Ellipse2.png'}></Image>
    </main>
  )
}
