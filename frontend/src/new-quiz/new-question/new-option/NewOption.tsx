import { IOption } from "../../../quiz.types";
import styles from './NewOption.module.css';

export function NewOption({ _id, name, isCorrect }: IOption) {
    return (
        <div className={ `row ${styles.option}` }>
            <input className={ `col-2 ${ styles.radio }` } type="radio" name="" id="" />
            <input className={ `col-10 ${styles.input}` } type="text" placeholder="Enter option" name='negativePoints' value = { name } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { } } />
        </div>
    )
}