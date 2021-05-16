import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { IQuestion, IAnswerStatus, IOption } from "../../quiz.types";
import styles from './Question.module.css';
import { CheckAnswer } from '../../quiz-store/quiz.reducer';
import { UseQuiz } from '../../quiz-store/quiz.context';
import { useState } from 'react';
import { Timer } from '../timer/Timer';

export function Question( { question: questionObj, status = "Not Answered" }: { question: IQuestion, status: IAnswerStatus } ) {
    const { dispatch } = UseQuiz();
    const [selectedOption, setSelectedOption] = useState("");

    const iconStyle = {
        background: 'white', borderRadius: '50%', fontSize: '1.5rem', marginTop: '0.1em' 
    }

    const optionSelected = (option: IOption) => {
        if( status === "Not Answered" ) {
            setSelectedOption(option._id);
            dispatch( new CheckAnswer({ option, points: questionObj.points, negativePoints: questionObj.negativePoints }) );    
        }
    }

    const optionClass = status === "Not Answered"? '' : status === 'Correct'? 'correct' : 'incorrect';

    return (
        <div style = {{ marginTop: '1em' }}>
            <Timer time = { 20 } key = { questionObj._id } />
            <h2 className={ styles.question } >{ questionObj.question }</h2>
            <ul className="row" style={{ margin: '2em 0' }}>
                {
                    questionObj.options.map( option => 
                    <li key = { option._id } className={ `row col-12 p-0 ${ styles.option } 
                    ${ selectedOption === option._id? styles[optionClass] : '' } ` } onClick = { () => { optionSelected(option) } }>
                        <p className="col-10 m-0" style={{ color: 'inherit' }}>{ option.name }</p>
                        <div className="col-2 m-0"> 
                        {
                            status === 'Not Answered' && <div className={ styles.blank }></div>
                        }
                        {
                            status === 'Correct' && option.isCorrect && 
                            <FaCheckCircle style={{ ...iconStyle, fill: 'var(--color-app-blue)', }} />
                        }
                        {
                            status === 'Incorrect' && option.isCorrect &&
                            <FaCheckCircle style={{ ...iconStyle, fill: 'var(--color-app-blue)', }} />
                        }
                        {
                            status === 'Incorrect' && !option.isCorrect &&
                            <FaTimesCircle style={{ ...iconStyle, fill: 'var(--color-red)', }} />
                        }       
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}