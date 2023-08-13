'use client'
import { useEffect } from "react"

export default function Sair() {

  useEffect(() => {
    sessionStorage.clear();
    setTimeout(() => window.location.href = '/', 750);
  }, []);

  return (
    <main>
      <h1>Saindo...</h1>
    </main>
  )
}
