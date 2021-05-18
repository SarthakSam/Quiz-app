import { UseQuiz } from '../quiz-store/quiz.context';
import styles from './Result.module.css';
import { Link } from 'react-router-dom';

export function Result() {
    const { state: { totalScore, score } } = UseQuiz();
    
    return (
        <div className={ `row ${ styles.result } ` }>
            {/* <div className="col-8"> */}
            <h2>Quiz Result</h2>
            <h2>Congratulations!</h2>
            <h4>YOUR SCORE</h4>
            <h1> <span>{ score }</span> <span>/ { totalScore }</span> </h1>
            <div className="row">
                <div className="col-1"></div>
                <button className="btn col-4">Share Results</button>
                <div className="col-2"></div>
                <Link to="/" className={`btn col-4 ${styles.nextBtn}`}>Take New Quiz</Link>
                <div className="col-1"></div>
            </div>
            {/* </div> */}
            
        </div>
    )
}