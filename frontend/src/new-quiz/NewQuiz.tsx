import { FaAngleLeft } from 'react-icons/fa';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { INewQuiz, INewOption, IServerError, IApiResponse, IQuizResponse, INewQuestion, INewQuizKeys, INewQuestionKeys } from '../quiz.types';
import { NewQuestion } from './new-question/NewQuestion';
import { getNewQuestionObject, getNewQuizObject, InputFieldObj, parseQuizData } from './utils';
import styles from './NewQuiz.module.css';
import { Sidenav } from './sidenav/Sidenav';
import { NewCategory } from './new-category/NewCategory';
import { UseQuiz } from '../quiz-store/quiz.context';
import { getUrl } from '../api.config';
import { FormField } from '../form-field/FormField';
import { useNotifications } from '../contexts/notifications-context';
import { validateQuiz } from './form-rules';
import { UseAxios } from '../custom-hooks/useAxios';

export function NewQuiz() {
    const [ quiz, setQuiz ] = useState<INewQuiz>( getNewQuizObject() );
    const [ index, setIndex ] = useState(-1);
    const [category, setCategory] = useState(new InputFieldObj(""));
    const [newCategoryPopupVisible, setNewCategoryPopupVisible] = useState(false);
    const { state: { categories: options } } = UseQuiz();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const { postData } = UseAxios();

    console.log({quiz});

    const onChange = (key: INewQuizKeys, value: string) => {
        setQuiz( quiz => {
            return { ...quiz, [key]: { ...quiz[key], value} };
        } );
    }

    const onQuestionChange = (index: number, key: INewQuestionKeys, value: string | number | INewOption[]) => {
        setQuiz( quiz => {
            const questions = quiz.questions.value.map( (question: INewQuestion, i: number) => {
                if(index === i) {
                    return { ...question, [key]: { ...question[key], value } };
                }
                return question;
            });
            return { ...quiz, questions: { ...quiz.questions, value: questions } };
        });
    }

    const addNewQuestion = () => {
        setQuiz( quiz => ({ ...quiz, questions: { ...quiz.questions, value: [ ...quiz.questions.value, getNewQuestionObject() ] }  }) );
        setIndex(quiz.questions.value.length);
    }

    const publishQuiz = async () => {
        const validatedData = validateQuiz( quiz );
        setQuiz(validatedData);
        setCategory( category => ({ ...category, isValid: !!category.value, error: !!category.value? '': 'Category is mandatory' }) );

        if(!validatedData.isValid || !category.isValid) {
            showNotification({ type: 'WARNING', message: 'Some validation errors are present. Please review them' })
            return;
        }

        const resp = await postData<IQuizResponse>(getUrl('postQuiz'), { quiz: parseQuizData(quiz) ,category: category.value });

        // const resp = await saveQuiz<IQuizResponse>(parseQuizData(quiz), category.value);
        if( "data" in resp ) {
            showNotification({ type: 'SUCCESS', message: 'Quiz created successfully' });
            navigate('/');
        }
         else {
            showNotification({ type: 'ERROR', message: resp.message });
         }
    }

    return (
        <div className={ styles.newForm }>

            <div className="col-9 col-lg-10 col-md-11 col-sm-12">
                <nav className={ `row ${styles.nav}` }>
                    <Link to="/" className={styles.backBtn}><FaAngleLeft style={{ fill: 'white' }} /></Link>
                    <p className={styles.title}>Create New Quiz</p>
                    <button className={ `btn btn--primary ${styles.publishBtn}` } onClick = { publishQuiz }>Publish</button>
                </nav>

                <div className={ `row ${styles.body}` }>

                    <Sidenav questions={ quiz.questions.value } activeIndex = { index } onSelect = { setIndex } addNewQuestion = { addNewQuestion } />
                    <div className={ `col-6 col-xl-7 col-sm-12 ${styles.form}` }>
                        {
                            index === -1?
                        <div className="row">
                            <h2>Quiz Info</h2>
                            <FormField fieldObj = {quiz.title}>
                                <input className={ `col-12 ${ styles.input } ${ !quiz.title.isValid && styles.error } ` } type="text" placeholder="Enter title" name='title' value = { quiz.title.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange('title', e.target.value) } } />
                            </FormField>
                            
                            <FormField fieldObj = {quiz.description}>
                                <textarea className={ `col-12 ${styles.textarea} ${ !quiz.description.isValid && styles.error } ` } placeholder="Enter description" name='description' value = { quiz.description.value } onChange = { (e: React.ChangeEvent<HTMLTextAreaElement>): void => { onChange('description', e.target.value) } }>
                                </textarea>
                            </FormField>

                            <FormField fieldObj = {quiz.image}>
                                <input className={ `col-12 ${ styles.input } ${ !quiz.image.isValid && styles.error }` } type="text" placeholder="Enter image url" name='videoURL' value = { quiz.image.value } onChange = { (e: React.ChangeEvent<HTMLInputElement>): void => { onChange('image', e.target.value) } } />

                            </FormField>

                            <FormField fieldObj = {category}>
                            <div className={ `col-12 custom-dropdown ${ styles.categoriesMenu }`}>
                                    <select className={`custom-dropdown__menu  ${ !category.isValid && styles.error } `} placeholder="Enter category" value={ category.value } onChange = { (e) => { setCategory( category => ({ ...category, value: e.target.value }) ) } }>
                                        <option value=""></option>
                                        {
                                            options.map( option => <option key = { option._id } value = { option._id } onChange = { () => {  } } >{ option.title }</option> )
                                        }
                                        {/* <option onClick = { () => { setNewCategoryPopupVisible(true) } } > Create New Category </option> */}
                                    </select>
                            </div> 

                            </FormField>

                        </div>
                        :
                        <NewQuestion { ...quiz.questions.value[index] } index = { index } onChange = { onQuestionChange } />
                        }
                                
                    </div>
                </div>
            </div>
                { newCategoryPopupVisible && <NewCategory closePopup = { setNewCategoryPopupVisible } /> }
           
        </div>
    )
}