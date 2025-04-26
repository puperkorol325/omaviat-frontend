import React, { Dispatch, useEffect, useState } from "react";
import styles from './Header.module.css';
import { AuthData } from "../../types/authData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DATA_METHODS from "../../classes/DATA_METHODS";

export const Header: React.FC = () => {

    const dispatcher = useDispatch();
    const authData = useSelector((state: {authDataReducer: AuthData}) => state.authDataReducer);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsUserLoggedIn(DATA_METHODS.CHECK_IF_USER_LOGGED_IN(authData));
    },[])

    return (
        <div className={styles.header}>
            <div className={styles.navPanel}>
                <nav className={styles.leftNav} onClick={() => navigate('/')}>
                    <img src={require('../../images/icon.png')} className={styles.logo} alt="Logo"/>
                   <h1 className={styles.brand}>FireTube</h1>
                </nav>
                <nav className={styles.rightNav}>
                    <ul className={styles.menu}>
                        <li className={styles.menuItem}>Отзывы</li>
                        <li className={styles.menuItem}>Уведомления</li>
                        <li className={styles.menuItem} onClick={() => !isUserLoggedIn ? navigate('/login') : navigate('/profile')}>{isUserLoggedIn ? "Аккаунт" : "Вход"}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}