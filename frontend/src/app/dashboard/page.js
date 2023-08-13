'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './dashboard.module.css'
import Link from 'next/link'
import { faCloud, faCloudShowersHeavy, faRightFromBracket, faSnowflake, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import isloggedin from '@/functions/isloggedin'
import capitalizeFirstLetter from '@/functions/capitalizefirstletter'

const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const iconsWeather = { "Thunderstorm": faCloudShowersHeavy, "Drizzle": faCloudShowersHeavy, "Rain": faCloudShowersHeavy, "Atmosphere": faCloud, "Clouds": faCloud, "Mist": faCloud, "Snow": faSnowflake, "Clear": faSun };

export default function Dashboard() {
  const [nome, setNome] = useState('');
  const [climas, setClimas] = useState([]);
  const [climasCard, setClimasCard] = useState([]);
  const [background, setBackground] = useState(styles.sunny);
  const [icon, setIcon] = useState(faSun);
  const [functionTimeoutToSearch, setFunctionTimeoutToSearch] = useState(null);

  useEffect(() => {
    if (climas.length == 0) {
      setClimasCard([]);
      setBackground(styles.sunny);
      return;
    }
    setClimasCard(climas.map((clima, index) => {
      return <Card key={index} id={clima.cidadeId} city={clima.current.name} temperature={clima.current.main.temp} humidity={clima.current.main.humidity} weather={clima.current.weather[0].main} removeCity={removeCity} />
    }));
    const climaAgora = climas[0].current.weather[0].main;
    if (climaAgora == "Thunderstorm" || climaAgora == "Drizzle" || climaAgora == "Rain") setBackground(styles.raining);
    if (climaAgora == "Atmosphere" || climaAgora == "Clouds") setBackground(styles.cloudy);
    if (climaAgora == "Snow") setBackground(styles.snowing);
    if (climaAgora == "Clear") setBackground(styles.sunny);
    setIcon(iconsWeather[climaAgora]);
  }, [climas]);

  useEffect(() => {
    callingIsloggedin();
    async function callingIsloggedin() {
      if (!(await isloggedin())) window.location.href = '/';
    }
    getNome();
    getClimas();
    setInterval(() => {
      getClimas();
    }, 1000 * 60 * 15);
  }, []);

  async function getNome() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/usuarios/' + sessionStorage.getItem('id'),
        { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } });
      const data = await response.json();
      if (!response.ok) throw new Error();
      setNome(data.nome);
    }
    catch (e) {
    }
  }

  async function getClimas() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/usuarios/' + sessionStorage.getItem('id') + '/climas',
        { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } });
      const data = await response.json();
      if (!response.ok) throw new Error();
      setClimas(data);
    }
    catch (e) {
    }
  }

  async function removeCity(id) {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL+'/usuarios/' + sessionStorage.getItem('id') + '/cidades/' + id,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } });
      getClimas();
    }
    catch (e) {
    }
  }

  async function searchCities(e) {
    clearTimeout(functionTimeoutToSearch);
    let time = 2500;
    if (e.key == "Enter") time = 0;
    if (e.target.value == "" || e.target.value == "Cidade não encontrada") return;
    const cidade = e.target.value;
    const timeout = setTimeout(async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/climas/' + cidade,
        { method: 'GET' });
      const data = (await response.json())[0];
      if (!response.ok || !data) {
        e.target.value = "Cidade não encontrada";
        return;
      }
      addCity({ ref: data.name, lat: data.lat, lon: data.lon });
      e.target.value = "";
    }, time);
    setFunctionTimeoutToSearch(timeout);
  }

  async function addCity(cidade = { ref, lat, lon }) {
    await fetch(process.env.NEXT_PUBLIC_API_URL+'/usuarios/' + sessionStorage.getItem('id') + '/cidades',
      {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
        body: JSON.stringify({ ref: cidade.ref, lat: cidade.lat, lon: cidade.lon })
      });
    getClimas();
  }

  return (
    <main className={styles.main}>
      <div className={styles.topbar}>
        <h3><Link href={'/sair'}><FontAwesomeIcon icon={faRightFromBracket} /></Link></h3>
        <h3 className={styles.user}><FontAwesomeIcon icon={faUser} /> {nome || "Nome"}</h3>
      </div>

      <div className={[styles.firstcity, background].join(' ')}>
        {climas.length > 0 ?
          <div style={{ minWidth: "60%" }}>
            <h2><FontAwesomeIcon icon={icon} /></h2>
            <h3>{capitalizeFirstLetter(climas[0].current.weather[0].description) || "Clima"}</h3>
            <h1>{Math.round(climas[0].current.main.temp) || "-"}°</h1>
            <h2>{climas[0].nome || "Cidade"}</h2>
          </div> : <div><h2>Adicione uma cidade!</h2></div>
        }
        <div>
          <h2>{(new Date()).getHours().toLocaleString() + ":" + (new Date()).getMinutes().toLocaleString()}</h2>
          <h2>{diasDaSemana[(new Date()).getDay()]}</h2>
        </div>
      </div>

      <div className={styles.allcities}>
        <div className={styles.addcity}>
          <h2>Temperaturas</h2>
          <input onKeyDown={searchCities} onChange={searchCities} placeholder={"+ Adicionar cidade"}></input>
        </div>
        <div className={styles.cities}>
          {climasCard}
        </div>
      </div>
    </main>
  )
}
