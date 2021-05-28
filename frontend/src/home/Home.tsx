import { FaPlus, FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

import { QuizCard } from './quiz-card/QuizCard';
import { useEffect, useState } from 'react';
import { IQuiz, IQuizesResponse } from '../quiz.types';
import { UseQuiz } from '../quiz-store/quiz.context';
import { getUrl } from '../api.config';
import { UseAxios } from '../custom-hooks/useAxios';
import { useNotifications } from '../contexts/notifications-context';
import { LogoutUser } from '../quiz-store/quiz.reducer';


export function Home() {

    const { state: { categories, userDetails }, dispatch } = UseQuiz();
    const { getData } = UseAxios();
    const [quizes, setQuizes] = useState<IQuiz[]>([]);
    const { showNotification } = useNotifications();

    useEffect( () => { 
        (async () => {
            const resp = await getData<IQuizesResponse>( getUrl('getAllQuizes') );
            if( 'data' in resp ) {
                setQuizes( resp.data.quizes );
            } else {
                showNotification({ type: 'ERROR', message: resp.message });
            }

        })();
    }, []); 

    const logout = () => {
        dispatch( new LogoutUser() );
    }

    return (
        <div className={ `row ${ styles.home }` }>
            <div className="col-9 col-lg-10 col-md-11 col-sm-12">
                <nav className={ styles.nav }>
                        <Link to="/" className={ styles.title }>Testit</Link>
                        {
                            userDetails? 
                            <ul>
                                <Link to="/newQuiz" className={ `btn btn--success ${ styles.newQuizBtn }` } > Create Quiz <FaPlus fill="white" /> </Link>
                                <button className={ `btn btn--inverted ${styles.logout}` } onClick = { logout } >Logout</button>
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
                    quizes.map( quiz => <QuizCard key={ quiz._id } { ...quiz }  />)
                }
                </ul>
            </div>
        </div> 
    );   
}