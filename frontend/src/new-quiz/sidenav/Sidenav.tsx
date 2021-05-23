import { MouseEventHandler } from "react";
import { FaPlus } from 'react-icons/fa';

import { IQuestion } from "../../quiz.types";
import styles from './Sidenav.module.css';

export function Sidenav( { questions, activeIndex, onSelect, addNewQuestion }: { questions: IQuestion[], activeIndex: number, onSelect: Function, addNewQuestion: MouseEventHandler } ) {
    
    return (
        <aside className="col-3">
            <ul>
                <li tabIndex={0} className={ `${styles.navItem} ${ activeIndex === -1 && styles.active }` } onClick = { () => { onSelect(-1) } }>Change Quiz Details</li>
                {
                    questions.map((question, index) => <li tabIndex={0} className={ `${styles.navItem} ${ activeIndex === index && styles.active }` } onClick = { () => { onSelect(index) } } >Question { index + 1 }</li>)
                }
                <li tabIndex={0} className={ styles.navItem } onClick = { addNewQuestion }> Add New Question <FaPlus style={{ fill: "white" }} /> </li>
            </ul>
        </aside>
    )
}