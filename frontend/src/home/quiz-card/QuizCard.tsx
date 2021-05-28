import { useNavigate } from 'react-router-dom';

import { IQuiz } from "../../quiz.types";
import styles from './QuizCard.module.css';

export function QuizCard({ _id, title, image, description, questions }: IQuiz ) {
    const navigate = useNavigate();

    const takeQuiz = () => {
        navigate(`/quiz/${_id}`);
    }

    return (
        <li className={ `card col-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 ${ styles.quiz } ` }>
            <div className="card__img">
                <img className="image" src="https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" />
            </div>
            <p className="card__title">{title}</p>
            <p className="card__meta">{description.substring(0, 80)}</p>
            <ul className="card__list spaceBetween">
                <li className="list__item">
                    <strong className={ styles.questions }>{ questions.length } questions </strong>
                </li>
                <li className="list__item">
                    <button className={ `btn btn--primary ${styles.takeQuiz}`} onClick = { takeQuiz }>Take Quiz</button>
                </li>
            </ul>
        </li>
    )
}