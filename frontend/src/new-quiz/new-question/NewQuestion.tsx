import { INewQuestion } from "../../quiz.types";
import { NewOption } from './new-option/NewOption';
import styles from './NewQuestion.module.css';

export function NewQuestion({ _id, question, options, points, negativePoints, explanation ,no }: INewQuestion) {
    return (
        <div className="row">
            <h2>Question: { no }</h2>
            <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter question statement" name='question' value = { question } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { } } />
            <label className={ `col-3` }htmlFor="points">Enter Points</label>
            <input className={ `col-2 ${ styles.input }` }  type="number" placeholder="Enter points" name='points' value = { points } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { } } />
            <label className={ `col-5` }htmlFor="negativePoints">Enter Negative Points</label>
            <input className={ `col-2 ${ styles.input }` }  type="number" placeholder="Enter negative points" name='negativePoints' value = { negativePoints } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { } } />
            <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter explanation for answer" name='explanation' value = { explanation } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { } } />
            {
                options.map( (option, index) => <NewOption { ...option } /> )
            }
            <div className="row col-12">
                <button className={ `btn btn--primary ${ styles.addOptionBtn }` }>Add Option</button>
            </div>            
        </div>
    )
}