'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './card.module.css'
import { faCloud, faCloudShowersHeavy, faDroplet, faSnowflake, faSun, faX } from '@fortawesome/free-solid-svg-icons';

export default function Card(props = { city, temperature, humidity, weather, id, removeCity }) {
    const colors = [undefined, styles.green, styles.pink];
    const choisedColor = Math.round(props.temperature) % 2 === 0 ? (props.temperature > 16 ? colors[0] : colors[1]) : colors[2];
    const iconWeather = { "Thunderstorm": faCloudShowersHeavy, "Drizzle": faCloudShowersHeavy, "Rain": faCloudShowersHeavy, "Atmosphere": faCloud, "Clouds": faCloud, "Mist": faCloud, "Snow": faSnowflake, "Clear": faSun };
    const choisedIcon = iconWeather[props.weather];

    return (
        <div className={styles.container}>
            <div className={[styles.card, choisedColor].join(' ')}>
                <h2>{props.city || "Cidade"}</h2>
                <h2><FontAwesomeIcon icon={choisedIcon} /></h2>
                <h1>{Math.round(props.temperature) || "Temperatura"}°</h1>
                <h3><FontAwesomeIcon icon={faDroplet} /> <strong>{props.humidity || "-"}%</strong> umidade</h3>
            </div>
            <button onClick={async () => await props.removeCity(props.id)}>
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    );
}