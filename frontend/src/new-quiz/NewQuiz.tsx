import { FaAngleLeft } from 'react-icons/fa';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { INewQuiz, INewOption, IServerError, IApiResponse, IQuizResponse } from '../quiz.types';
import { NewQuestion } from './new-question/NewQuestion';
import { getNewQuestionObject, getNewQuizObject } from './utils';
import styles from './NewQuiz.module.css';
import { Sidenav } from './sidenav/Sidenav';
import { NewCategory } from './new-category/NewCategory';
import { UseQuiz } from '../quiz-store/quiz.context';

async function saveQuiz<T>(quiz: INewQuiz, category: string) : Promise<IApiResponse<T> | IServerError> {
    try {
        const resp = await axios.post<T>('/quizes', {quiz, category});
        return { data: resp.data, status: resp.status };
    } catch(err) {
        if(axios.isAxiosError(err)) {
            const serverError = err as AxiosError<IServerError>;
            if(serverError.response && serverError.response.data) {
                return { ...serverError.response.data, status: serverError.response.status, };
            }

            if( err.response && err.response.data ) {
                return err.response.data;
            }
        }
        return { message: "Something went wrong", status: 400 };
    }
}

export function NewQuiz() {
    const [ quiz, setQuiz ] = useState<INewQuiz>( getNewQuizObject() );
    const [ index, setIndex ] = useState(-1);
    const [category, setCategory] = useState("");
    const [newCategoryPopupVisible, setNewCategoryPopupVisible] = useState(false);
    const { state: { categories: options } } = UseQuiz();
    const navigate = useNavigate();

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

    const publishQuiz = async () => {
        const resp = await saveQuiz<IQuizResponse>(quiz, category);
        if( "data" in resp ) {
            // console.log("Quiz created successfully");
            navigate('/');
        }
         else {
             window.alert(resp.message);
         }
    }

    return (
        <div className={ styles.newForm }>

            <div className={`row `} style={{ height: '70px' }}>
                <div className="row">
                    <div className="col-2"></div>
                    <Link to="/" className="col-1 backBtn"><FaAngleLeft /></Link>
                    <p className="col-6 title">Create New Quiz</p>
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
                                    <option value=""></option>
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