import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { IQuestion, IAnswerStatus, IOption } from "../../quiz.types";
import styles from './Question.module.css';
import { CheckAnswer } from '../../actions';
import { UseQuiz } from '../../quiz-store/quiz.context';

export function Question( { question: questionObj, status = "Not Answered" }: { question: IQuestion, status: IAnswerStatus } ) {
    const { dispatch } = UseQuiz();

    const iconStyle = {
        background: 'white', borderRadius: '50%', fontSize: '1.5rem', marginTop: '0.1em' 
    }

    const optionSelected = (option: IOption) => {
        dispatch( new CheckAnswer({ option, points: questionObj.points, negativePoints: questionObj.negativePoints }) );
    }

    return (
        <div>
            <h2 className={ styles.question } >{ questionObj.question }</h2>
            <ul className="row">
                {
                    questionObj.options.map( option => 
                    <li className={ `row col-12 ${ styles.option }` } onClick = { () => { optionSelected(option) } }>
                        <p className="col-10">{ option.name }</p>
                        <div className="col-2"> 
                        {
                            status === 'Not Answered' && <div className={ styles.blank }></div>
                        }
                        {
                            status === 'Correct' && option.isCorrect && 
                            <FaCheckCircle style={{ ...iconStyle, fill: '#15aaad', }} />
                        }
                        {
                            status === 'Incorrect' && option.isCorrect &&
                            <FaCheckCircle style={{ ...iconStyle, fill: '#15aaad', }} />
                        }
                        {
                            status === 'Incorrect' && !option.isCorrect &&
                            <FaTimesCircle style={{ ...iconStyle, fill: 'darkRed', }} />
                        }       
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}