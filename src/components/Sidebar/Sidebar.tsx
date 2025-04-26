import React from "react";
import styles from './Sidebar.module.css';

export const Sidebar:React.FC = () => {

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.title}>Категории</h2>
            <div className={styles.divider}></div>
            <ul className={styles.categories}>
                <li className={styles.categoriesItem}>Все видео</li>
                <li className={styles.categoriesItem}>Музыка</li>
                <li className={styles.categoriesItem}>Спорт</li>
                <li className={styles.categoriesItem}>Игры</li>
            </ul>
            <div className={styles.developers}>
                <div className={styles.flipCoverFirstDev}>lf</div>
                <div className={styles.flipCoverSecondDev}>lf</div>
            </div>
        </div>
    )
}