import { useEffect, useState } from 'react';
import { UseQuiz } from '../../quiz-store/quiz.context';
import { NextQuestion } from '../../quiz-store/quiz.reducer';
import styles from './Timer.module.css';

export function Timer( { time = 30, key }: { time: number, key: string } ) {
    const [timer, setTimer] = useState(time);
    const { dispatch } = UseQuiz();

    const style = {
        background: 'transparent',
        '--timer': (timer * 100/time) + '%'
    }

    useEffect(() => {
        const timerInterval = setInterval( () => {
            if(timer !== 0) {
                setTimer( timer => timer - 1 );
            }
            else {
                clearInterval(timerInterval);
                dispatch( new NextQuestion() );
                // console.log("Time's up");
            }
        }, 1000);
        return () => {
            clearInterval(timerInterval);
        }
    }, [timer]);

    return (
        <>
            <div data-label={ timer } className={ styles.progressBar } style={style}></div>
            {/* <progress value="20" max="100" className={ styles.progressBar }> 32% </progress> */}
        </>
    );
}