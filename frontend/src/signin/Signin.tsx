import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../api.config";

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

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!username || !password) {
            alert("Please fill all the madatory details first");
            return;
        }
        const response = await postData<IUserResponse>( getUrl('signin'), { username, password } );
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
                <h2>Signup</h2>
                <input type="text" name="" id="" value={username} onChange = { (e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) } />
                <input type="password" name="" id="" value={password} onChange = { (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) }  />
                <button>Signup</button>
            </form>
        </div>
    )
}