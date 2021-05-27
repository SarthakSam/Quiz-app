import { FaPlus, FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import { QuizCard } from './quiz-card/QuizCard';
import { useEffect, useState } from 'react';
import { IServerError, IApiResponse, ICategoryResponse, IQuiz, IQuizesResponse } from '../quiz.types';
import { UseQuiz } from '../quiz-store/quiz.context';
import { InitializeCategories } from '../quiz-store/quiz.reducer';
import { getUrl } from '../api.config';
import { UseAxios } from '../custom-hooks/useAxios';
import { useNotifications } from '../contexts/notifications-context';

async function getCategories<T>(): Promise<IApiResponse<T> | IServerError>  {
    try {
        const response = await axios.get<T>(getUrl('categories'));
        return { data: response.data, status: response.status };
    } catch(err) {
        if(axios.isAxiosError(err)) {
            const serverError = err as AxiosError<IServerError>;
            if(serverError.response && serverError.response.data) {
                return { ...serverError.response.data, status: serverError.response.status, };
            }
        }
        return { message: 'Something went wrong', status: 400 };
    }
}

export function Home() {

    const { state: { categories, userDetails }, dispatch } = UseQuiz();
    const { getData } = UseAxios();
    const [quizes, setQuizes] = useState<IQuiz[]>([]);
    const { showNotification } = useNotifications();

    useEffect( () => { 
        (async () => {
            const response = await getCategories<ICategoryResponse>();
            if( "data" in response ) {
                dispatch( new InitializeCategories({ categories: response.data.categories } ));
            } 
            else {
                console.log(response.message);
            }

            const resp = await getData<IQuizesResponse>( getUrl('getAllQuizes') );
            if( 'data' in resp ) {
                setQuizes( resp.data.quizes );
            } else {
                showNotification({ type: 'ERROR', message: resp.message });
            }

        })();
    }, []); 

    return (
        <div className={ `row ${ styles.home }` }>
            <div className="col-9 col-lg-10 col-md-11 col-sm-12">
                <nav className={ styles.nav }>
                        <Link to="/" className={ styles.title }>Testit</Link>
                        {
                            userDetails? 
                            <ul>
                                <Link to="/newQuiz" className={ `btn btn--success ${ styles.newQuizBtn }` } > Create Quiz <FaPlus fill="white" /> </Link>
                                <button className={ `btn btn--inverted ${styles.logout}` } >Logout</button>
                            </ul>
                            :
                            <ul>
                                <Link to="/signin" className={ styles.link } > Signin</Link>
                                <Link to="/signup" className={ styles.link } > Signup</Link>
                            </ul>
                        }
                </nav>
                <ul className={ `row ${styles.categoriesList}` }>
                {
                    quizes.map( quiz => <QuizCard { ...quiz }  />)
                }
                </ul>
            </div>
        </div> 
    );   
}