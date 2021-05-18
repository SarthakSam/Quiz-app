import { FaPlus } from 'react-icons/fa';
import styles from './Home.module.css';

import { categories } from '../mock.data';
import { Category } from '../category/Category';
import { QuizCard } from './quiz-card/QuizCard';

export function Home() {
    console.log(categories);
    return (
        <div className={ `row ${ styles.home }` }>
            <div className="col-10 col-lg-9 col-md-8 col-sm-8">
                <input className="input" type="search" name="" id="" />
            </div>
            <div className="col-2 col-lg-3 col-md-4 col-sm-4">
                <button className={ `btn btn--success ${ styles.newQuizBtn }` } >Create New Quiz <FaPlus fill="white" /> </button>
            </div>
            <ul className={ `col-12 ${styles.categoriesList}` }>
                {
                    categories.map( category => <li>
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