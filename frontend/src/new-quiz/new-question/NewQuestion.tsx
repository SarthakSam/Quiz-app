import { INewQuestionProps } from "../../quiz.types";
import { getNewOptionObject } from "../utils";
import { NewOption } from './new-option/NewOption';
import styles from './NewQuestion.module.css';

export function NewQuestion({ question, options, points, negativePoints, explanation ,index, onChange  }: INewQuestionProps) {

    const onOptionChange = (i: number, key: string, value: string | boolean) => {
        const changedOptions = options.map( (option, index) => {
            if(index === i) {
                return { ...option, [key]: value };
            }
            return { ...option, isCorrect: false};
        } )
        onChange(index, 'options', changedOptions);
    }

    const addOption = () => {
        onChange(index, 'options', [...options, getNewOptionObject()]);
    }

    return (
        <div className="row">
            <h2>Question: { index + 1 }</h2>
            <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter question statement" name='question' value = { question } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'question', e.target.value) } } />
            <label className={ `col-3` }htmlFor="points">Enter Points</label>
            <input className={ `col-2 ${ styles.input }` }  type="number" placeholder="Enter points" name='points' value = { points } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'points', e.target.value) } } />
            <label className={ `col-4` }htmlFor="negativePoints">Enter Negative Points</label>
            <input className={ `col-2 ${ styles.input }` }  type="number" placeholder="Enter negative points" name='negativePoints' value = { negativePoints } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'negativePoints', e.target.value) } } />
            <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter explanation for answer" name='explanation' value = { explanation } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange(index, 'explanation', e.target.value) } } />
            <div className="col-12" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
            {
                options.map( (option, i) => <NewOption key={i} index= { i } { ...option } radioFor={ `question {index + 1}` } onChange = { onOptionChange } /> )
            }
            </div>
            <div className="row col-12">
                <button className={ `btn btn--primary ${ styles.addOptionBtn }` } onClick = { () => addOption() }>Add Option</button>
            </div>            
        </div>
    )
}