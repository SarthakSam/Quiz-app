import { FaAngleLeft } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

import { INewQuiz, INewOption } from '../quiz.types';
import { NewQuestion } from './new-question/NewQuestion';
import { getNewQuestionObject, getNewQuizObject } from './utils';
import styles from './NewQuiz.module.css';
import { Sidenav } from './sidenav/Sidenav';
import { NewCategory } from './new-category/NewCategory';
import { UseQuiz } from '../quiz-store/quiz.context';

function saveQuiz(quiz: INewQuiz, category: string) {
    try {
        const resp = axios.post('/quizes', {quiz, category});
    } catch(err) {
        console.log(err);
    }
}

export function NewQuiz() {
    const [ quiz, setQuiz ] = useState<INewQuiz>( getNewQuizObject() );
    const [ index, setIndex ] = useState(-1);
    const [category, setCategory] = useState("");
    const [newCategoryPopupVisible, setNewCategoryPopupVisible] = useState(false);
    const { state: { categories: options } } = UseQuiz();

    console.log({quiz});

    const onChange = (key: string, value: string) => {
        setQuiz( quiz => ({ ...quiz, [key]: value }) );
    }

    const onQuestionChange = (index: number, key: string, value: string | number | INewOption[]) => {
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

    const publishQuiz = () => {
        const resp = saveQuiz(quiz, category);
    }

    return (
        <div className={ styles.newForm }>

            <div className={`row `} style={{ height: '70px' }}>
                <div className="row">
                    <span className="col-1 backBtn"><FaAngleLeft /></span>
                    <p className="col-8 title">Create New Quiz</p>
                    <div className="col-3">
                        <button className="btn publishBtn" onClick = { publishQuiz }>Publish</button>
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
                                <select className="custom-dropdown__menu" placeholder="Enter category" value={ category } onChange = { (e) => { setCategory( e.target.value ) } }>
                                    {
                                        options.map( option => <option key = { option._id } value = { option._id } onChange = { () => {  } } >{ option.title }</option> )
                                    }
                                    {/* <option onClick = { () => { setNewCategoryPopupVisible(true) } } > Create New Category </option> */}
                                </select>
                        </div> 
                    </div>
                    :
                    <NewQuestion { ...quiz.questions[index] } index = { index } onChange = { onQuestionChange } />
                    }
                            
                </div>
            </div>
            { newCategoryPopupVisible && <NewCategory closePopup = { setNewCategoryPopupVisible } /> }
        </div>
    )
}