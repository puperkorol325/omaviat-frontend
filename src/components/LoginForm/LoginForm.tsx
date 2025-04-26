import React from "react";
import styles from './LoginForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DATA_METHODS from "../../classes/DATA_METHODS";

export const LoginForm: React.FC = () => {

    const [email, setEmail]: [string, (value: string) => void] = React.useState('');
    const [password, setPassword]: [string, (value: string) => void] = React.useState('');

    const dispatcher = useDispatch();
    const authData = useSelector((state: {userID: string, APIKey:string }) => state);

    const navigate = useNavigate();

    class sendData  {
        email: string;
        password: string;

        constructor(email: string, password: string) {
            this.email = email;
            this.password = password;
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        try {
            const data = new sendData(email, password);

            const response = await fetch(`${DATA_METHODS.API_IP}/api/profile/auth`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseBody = await response.json();

                localStorage.setItem('userID', responseBody.profileID);
                localStorage.setItem('APIKey', responseBody.APIKey);

                dispatcher({type: 'SET_USER_ID', payload: responseBody.profileID});
                dispatcher({type: 'SET_API_KEY', payload: responseBody.APIKey});
                navigate('/');

                window.location.reload();
            }else {
                alert('Введены неверные данные');
            }
        }catch (error) {
            alert("Что-то пошло не так");
        }
    }

    return (
        <div className={styles.wrapperLogin}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Войти</h1>
                <div className={styles.inputBox}>
                    <input className={styles.input} name="email" type="email" placeholder="Email"
                    required onChange={(e) => setEmail(e.target.value)}></input>
                    <i className='bx bxs-user'></i>
                </div>
                <div className={styles.inputBox}>
                    <input className={styles.input} name="password" type="password" placeholder="Пароль"
                    required onChange={(e) => setPassword(e.target.value)}></input>
                    <i className='bx bxs-lock-alt'></i>
                </div>

                <button type="submit" className={styles.btn}>Войти</button>

                <div className={styles.registerLink}>
                    <p>Не имеете аккаунта? <a  className={styles.regLink} onClick={() => navigate("/register")}>Зарегистрироваться</a></p>
                </div>
            </form>
        </div>
    )
}