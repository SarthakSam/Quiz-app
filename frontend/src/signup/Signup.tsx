import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { getUrl } from "../api.config";
import { useNotifications } from "../contexts/notifications-context";
import { UseAxios } from '../custom-hooks/useAxios';
import { UseQuiz } from "../quiz-store/quiz.context";
import { AuthenticateUser } from "../quiz-store/quiz.reducer";
import { IUserResponse } from "../quiz.types";
import styles from './Signup.module.css';

export function Signup() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const { postData } = UseAxios();
    const { dispatch } = UseQuiz();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!username || !password1 || !password2) {
            showNotification({ type: 'WARNING', message: 'Please fill all the madatory details first' })
            return;
        }
        if(password1 !== password2) {
            showNotification({ type: 'WARNING', message: 'passwords doesnt match' })
            return;
        }
        const response = await postData<IUserResponse>( getUrl('signup'), { username, password: password1 } );
        console.log(response);
        if( 'data' in response) {
            dispatch( new AuthenticateUser({ username: response.data.username, authorization: response.data.authorization }) );
            showNotification({ type: 'SUCCESS', message: response.data.message })
            navigate('/');
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
                <label htmlFor="password1">Enter password</label><br />
                <div className="input input--fluid">
                    <input type="password" name="password1" value={password1} onChange = { (e:ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value) }  />
                </div>
                <br />
                <label htmlFor="password">re-enter password</label><br />
                <div className="input input--fluid">
                    <input type="password" name="password2"  value={password2} onChange = { (e:ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value) }  />
                </div>
                <br />
                <button className={ `btn btn--primary ${ styles.signupBtn }` }>Signup</button>
            </form>
        </div>
    )
}