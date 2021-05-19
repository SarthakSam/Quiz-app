import { IQuestion } from "../../quiz.types";
import styles from './Sidenav.module.css';

export function Sidenav( { questions }: { questions: IQuestion[] } ) {
    
    return (
        <aside className={ `col-3` }>
            <ul>
                <li tabIndex={0} className={ styles.navItem }>Change Quiz Details</li>
                {
                    questions.map((question, index) => <li tabIndex={0} className={ styles.navItem }>Question { index + 1 }</li>)
                }
            </ul>
        </aside>
    )
}