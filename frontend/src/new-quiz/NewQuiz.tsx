import { FaAngleLeft } from 'react-icons/fa';

import { useState } from 'react';
import { IOption, IQuiz } from '../quiz.types';
import { NewQuestion } from './new-question/NewQuestion';
import { getNewQuestionObject, getNewQuizObject } from './utils';
import styles from './NewQuiz.module.css';
import { Sidenav } from './sidenav/Sidenav';

const options = [{ id: 'cat1', name: 'Category1', value: 'category1' }, { id: 'cat2', name: 'Category2', value: 'category2' }];

export function NewQuiz() {
    const [ quiz, setQuiz ] = useState<IQuiz>( getNewQuizObject() );
    const [ index, setIndex ] = useState(-1);
    const [category, setCategory] = useState("");

    console.log({quiz});

    const onChange = (key: string, value: string) => {
        setQuiz( quiz => ({ ...quiz, [key]: value }) );
    }

    const onQuestionChange = (index: number, key: string, value: string | number | IOption[]) => {
        setQuiz( quiz => {
            const questions = quiz.questions.map( (question, i) => {
                if(index === i) {
                    return { ...question, [key]: value };
                }
                return question;
            });
            return { ...quiz, questions };
        });
    }

    const addNewQuestion = () => {
        setQuiz( quiz => ({ ...quiz, questions: [...quiz.questions, getNewQuestionObject()] }) );
        setIndex(quiz.questions.length);
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
                <Sidenav questions={ quiz.questions } activeIndex = { index } onSelect = { setIndex } addNewQuestion = { addNewQuestion } />
                <div className="col-1"></div>
                <div className={ `col-6 ${styles.form}` }>
                    {
                        index === -1?
                    <div className="row">
                        <h2>Quiz Info</h2>
                        <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter title" name='title' value = { quiz.title } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange('title', e.target.value) } } />
                        <textarea className={ `col-12 ${styles.textarea} ` } placeholder="Enter description" name='description' value = { quiz.description } onChange = { (e: React.ChangeEvent<HTMLTextAreaElement>): void => { onChange('description', e.target.value) } }>
                        </textarea>
                        <input className={ `col-12 ${ styles.input }` } type="text" placeholder="Enter image url" name='videoURL' value = { quiz.image } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange('image', e.target.value) } } />

                        <div className={ `col-12 custom-dropdown ${ styles.categoriesMenu }`}>
                                <select className="custom-dropdown__menu" placeholder="Enter category" value={ category }>
                                    {
                                        options.map( option => <option key = { option.id } value = { option.value } onChange = { () => { setCategory( option.value ) } } >{ option.name }</option> )
                                    }
                                </select>
                        </div> 
                    </div>
                    :
                    <NewQuestion { ...quiz.questions[index] } index = { index } onChange = { onQuestionChange } />
                    }
                            
                </div>
            </div>
        </div>
    )
}