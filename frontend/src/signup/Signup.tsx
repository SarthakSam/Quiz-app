import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../api.config";

import { UseAxios } from '../custom-hooks/useAxios';
import { UseQuiz } from "../quiz-store/quiz.context";
import { AuthenticateUser } from "../quiz-store/quiz.reducer";
import { IUserResponse } from "../quiz.types";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const { postData } = UseAxios();
    const { dispatch } = UseQuiz();
    const navigate = useNavigate();

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!username || !password1 || !password2) {
            alert("Please fill all the madatory details first");
            return;
        }
        if(password1 !== password2) {
            alert("passwords doesnt match");
            return;
        }
        const response = await postData<IUserResponse>( getUrl('signup'), { username, password: password1 } );
        console.log(response);
        if( 'data' in response) {
            dispatch( new AuthenticateUser({ username: response.data.username, authorization: response.data.authorization }) );
            navigate('/');
        } else {
            alert(response.message);
        }
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <h2>Signin</h2>
                <input type="text" name="" id="" value={username} onChange = { (e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) } />
                <input type="password" name="" id="" value={password1} onChange = { (e:ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value) }  />
                <input type="password" name="" id="" value={password2} onChange = { (e:ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value) }  />
                <button>Signin</button>
            </form>
        </div>
    )
}