import { FormField } from "../../form-field/FormField";
import { INewQuestionProps } from "../../quiz.types";
import { getNewOptionObject } from "../utils";
import { NewOption } from './new-option/NewOption';
import styles from './NewQuestion.module.css';

export function NewQuestion({ question, options, points, negativePoints, explanation ,index, onChange  }: INewQuestionProps) {

    const onOptionChange = (i: number, key: string, value: string | boolean) => {
        const changedOptions = options.value.map( (option, index) => {
            if(index === i) {
                return { ...option, [key]: value };
            }
            return { ...option, isCorrect: false};
        } )
        onChange(index, 'options', changedOptions);
    }

    const addOption = () => {
        onChange(index, 'options', [...options.value, getNewOptionObject()]);
    }

    return (
        <div className="row">
            <h2>Question: { index + 1 }</h2>

            <FormField fieldObj = {question}>
                <input className={ `col-12 ${ styles.input } ${ !question.isValid && styles.error }` } type="text" placeholder="Enter question statement" name='question' value = { question.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'question', e.target.value) } } />
            </FormField>

            <div className="row col-6 m-0 p-0">
                <label className={ `col-7` }htmlFor="points">Enter Points</label>
                <FormField fieldObj = {points}>
                    <input className={ `col-5 ${ styles.input } ${ !points.isValid && styles.error }` } type="number" placeholder="Enter points" name='points' value = { points.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'points', e.target.value) } } />
                </FormField>
            </div>
            
            <div className="row col-6 m-0 p-0">
                <label className={ `col-8` }htmlFor="negativePoints">Enter Negative Points</label>
                <FormField fieldObj = {negativePoints}>
                    <input className={ `col-4 ${ styles.input } ${ !negativePoints?.isValid && styles.error }` } type="number" placeholder="Enter negative points" name='negativePoints' value = { negativePoints?.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'negativePoints', e.target.value) } } />
                </FormField>
            </div>

            <FormField fieldObj = {explanation}>
                <input className={ `col-12 ${ styles.input } ${ !explanation?.isValid && styles.error }` } type="text" placeholder="Enter explanation for answer" name='explanation' value = { explanation?.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'explanation', e.target.value) } } />
            </FormField>

            <div className="col-12" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
            {
                options.value.map( (option, i) => <NewOption key={`${index}:${i}`} index= { i } { ...option } radioFor={ `question {index + 1}` } onChange = { onOptionChange } /> )
            }
            </div>
            <div className="row col-12">
                <button className={ `btn btn--primary ${ styles.addOptionBtn }` } onClick = { () => addOption() }>Add Option</button>
            </div>            
        </div>
    )
}