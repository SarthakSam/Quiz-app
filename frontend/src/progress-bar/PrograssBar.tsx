import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar() {
    const [timer, setTimer] = useState(5);

    const style = {
        background: 'blue',
        '--timer': (timer * 100/60) + '%'
    }

    useEffect(() => {
        const timerInterval = setInterval( () => {
            console.log(timer);
            if(timer !== 0) {
                setTimer( timer => timer - 1 );
            }
            else {
                clearInterval(timerInterval);
                console.log("Time's up");
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