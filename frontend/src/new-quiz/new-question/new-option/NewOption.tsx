import { FormField } from "../../../form-field/FormField";
import { INewOptionProps } from "../../../quiz.types";
import styles from './NewOption.module.css';

export function NewOption({ name, isCorrect, index, radioFor, onChange }: INewOptionProps) {
    return (
        <div className={ `row ${styles.option}` }>
            <input className={ `col-2 ${ styles.radio }` } type="radio" name={radioFor} id="" defaultChecked= {isCorrect.value} onChange = { () => { onChange(index, 'isCorrect', true) } } />
            
            <FormField fieldObj = {name}>
                <input className={ `col-10 ${ styles.input } ${ !name?.isValid && styles.error }` } type="text" placeholder="Enter option" name='name' value = { name.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'name', e.target.value) } } />
            </FormField>
        </div>
    )
}