import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

import { getUrl } from "../api.config";
import { useNotifications } from "../contexts/notifications-context";
import styles from './Signin.module.css';
import { UseAxios } from '../custom-hooks/useAxios';
import { UseQuiz } from "../quiz-store/quiz.context";
import { AuthenticateUser } from "../quiz-store/quiz.reducer";
import { IUserResponse } from "../quiz.types";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { postData } = UseAxios();
    const { dispatch } = UseQuiz();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const  {  state }: any = useLocation();

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!username || !password) {
            showNotification({ type: 'WARNING', message: 'Please fill all the madatory details first' })
            return;
        }

        const response = await postData<IUserResponse>( getUrl('signin'), { username, password } );
        console.log(response);
        if( 'data' in response) {
            dispatch( new AuthenticateUser({ username: response.data.username, authorization: response.data.authorization }) );
            showNotification({ type: 'SUCCESS', message: response.data.message })
            navigate( state?.from? state.from : '/' );
        } else {
            showNotification({ type: 'ERROR', message: response.message })
        }
    }

    return (
        <div className={ styles.container }>
            <form className={ styles.form } onSubmit={formSubmit}>
                <ul className={ styles.nav }>
                    <li>
                        <NavLink activeClassName={styles.active} to="/signin">Signin</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.active} to="/signup">Signup</NavLink>
                    </li>
                </ul>
                <br />
                <label htmlFor="username">Username</label><br />
                <div className="input input--fluid">
                    <input type="text" name="username" value={username} onChange = { (e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) } />
                </div>
                <br />
                <label htmlFor="password">Enter password</label><br />
                <div className="input input--fluid">
                    <input type="password" name="password" value={password} onChange = { (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) }  />
                </div>
                <br />
                <button className={ `btn btn--primary ${ styles.signinBtn }` }>Signin</button>
            </form>
        </div>
    )
}