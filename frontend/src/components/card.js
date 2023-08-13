'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './card.module.css'
import { faCloudShowersHeavy, faDroplet, faX } from '@fortawesome/free-solid-svg-icons';

export default function Card(props = { city, temperature, humidity, weather, id }) {
    const colors = [undefined, styles.green, styles.pink];
    const choisedColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className={styles.container}>
            <div className={[styles.card, choisedColor].join(' ')}>
                <h2>São Paulo</h2>
                <h2><FontAwesomeIcon icon={faCloudShowersHeavy} /></h2>
                <h1>19°</h1>
                <h3><FontAwesomeIcon icon={faDroplet} /> <strong>95%</strong> umidade</h3>
            </div>
            <button>
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    );
}