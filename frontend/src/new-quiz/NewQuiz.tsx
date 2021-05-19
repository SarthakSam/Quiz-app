import { FaAngleLeft } from 'react-icons/fa';

import { useState } from 'react';
import { IQuiz } from '../quiz.types';
import { NewQuestion } from './new-question/NewQuestion';
import { getNewQuizObject } from './utils';
import styles from './NewQuiz.module.css';
import { Sidenav } from './sidenav/Sidenav';

export function NewQuiz() {
    const [ quiz, setQuiz ] = useState<IQuiz>( getNewQuizObject() );

    const onChange = (key: string, value: string) => {
        setQuiz( quiz => ({ ...quiz, [key]: value }) );
    }

    return (
        <div className={ styles.newForm }>

            <div className={`row `} style={{ height: '70px' }}>
                <div className="row">
                    <span className="col-1 backBtn"><FaAngleLeft /></span>
                    <p className="col-8 title">Create New Quiz</p>
                    <div className="col-3">
                        <button className="btn publishBtn">Publish</button>
                    </div>
                </div>
            </div>
            <div className={ `row ${styles.body}` }>

                <div className="col-1"></div>
                <Sidenav questions={ quiz.questions } />    
                <div className="col-1"></div>
                <div className={ `col-6 ${styles.form}` }>
                    {/* <div className="row">
                        <h2>Quiz Info</h2>
                        <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter title" name='title' value = { quiz.title } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange('title', e.target.value) } } />
                        <textarea className={ `col-12 ${styles.textarea} ` } placeholder="Enter description" name='description' value = { quiz.description } onChange = { (e: React.ChangeEvent<HTMLTextAreaElement>): void => { onChange('description', e.target.value) } }>
                        </textarea>
                        <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter image url" name='videoURL' value = { quiz.image } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange('image', e.target.value) } } />
                    </div> */}

                    <NewQuestion { ...quiz.questions[0] } no = {1} />    
                            
                </div>
            </div>
        </div>
    )
}