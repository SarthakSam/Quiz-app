import { FaPlus, FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import { categories } from '../mock.data';
// import { Category } from '../category/Category';
import { QuizCard } from './quiz-card/QuizCard';
import { useEffect, useState } from 'react';
import { ICategory, IServerError, IApiResponse, ICategoryResponse } from '../quiz.types';
import { UseQuiz } from '../quiz-store/quiz.context';
import { InitializeCategories } from '../quiz-store/quiz.reducer';

async function getCategories<T>(): Promise<IApiResponse<T> | IServerError>  {
    try {
        const response = await axios.get<T>('/categories');
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

    const { state: { categories }, dispatch } = UseQuiz();
    // const [categories, setCategories] = useState<ICategory[] | null>(null);

    useEffect( () => { 
        (async () => {
            const response = await getCategories<ICategoryResponse>();
            console.log( response );
            if( "data" in response ) {
                dispatch( new InitializeCategories({ categories: response.data.categories } ));
                // console.log(response.data);
                // setCategories(response.data.categories);
            } 
            else {
                console.log(response.message);
                //  ADD NOTIFICATION
            }
        })();
    }, []);

    return (
        <div className={ `row ${ styles.home }` }>
            <div className={` col-12 ${ styles.topBar } `} >
                <div className="input input--icon">
                    <FaSearch style={{ marginLeft: '0.4em' }} />
                    <input type="search" placeholder="Enter text" />
                        {/* <i className="fa fa-search"></i> */}
                </div>
                <Link to="/newQuiz" className={ `btn btn--success ${ styles.newQuizBtn }` } > Create Quiz <FaPlus fill="white" /> </Link>
            </div>
            <ul className={ `col-12 ${styles.categoriesList}` }>
                {
                    categories && categories.map( category => <li>
                        <h3 className="h3">{ category.title }</h3>
                        <ul className="row">
                            {
                                category.quizes.map( quiz => <QuizCard { ...quiz }  /> )
                            }
                        </ul>
                    </li>)
                }
            </ul>
            

        </div> 
    );   
}