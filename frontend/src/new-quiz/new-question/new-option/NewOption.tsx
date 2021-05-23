import { INewOptionProps } from "../../../quiz.types";
import styles from './NewOption.module.css';

export function NewOption({ name, isCorrect, index, radioFor, onChange }: INewOptionProps) {
    return (
        <div className={ `row ${styles.option}` }>
            <input className={ `col-2 ${ styles.radio }` } type="radio" name={radioFor} id="" defaultChecked= {isCorrect} onChange = { () => { onChange(index, 'isCorrect', true) } } />
            <input className={ `col-10 ${styles.input}` } type="text" placeholder="Enter option" name='negativePoints' value = { name } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => {
                onChange(index, 'name', e.target.value);
             } } />
        </div>
    )
}