import { useMemo } from 'react';
import { IAnswerStatus } from '../../quiz.types';
import styles from './Stepper.module.css';

export function Stepper( { questions, answerStatus, currentQuestion }: { questions: number, answerStatus: IAnswerStatus[], currentQuestion: number } ) {
    
    const createArray = (length: number): Array<string> => {
        return ".".repeat(length).split("");
    }

    const arr = useMemo(() => createArray(questions), [questions]);
    return (
        <ul className={ `row` }>
            { 
                arr.map( (_, index) => <li key = {index} className={ `${styles.bar} ${ currentQuestion === index? styles.current: '' } ${answerStatus[index] === 'Correct'? styles.correct : answerStatus[index] === 'Incorrect'? styles.wrong : ''  }`  }></li> )
            }
        </ul>
    )
}