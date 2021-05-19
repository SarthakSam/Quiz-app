import { FaPlus, FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

import { categories } from '../mock.data';
import { Category } from '../category/Category';
import { QuizCard } from './quiz-card/QuizCard';

export function Home() {
    console.log(categories);
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