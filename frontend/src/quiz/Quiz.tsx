import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

import { quiz } from '../mock.data';
import { IQuiz, IQuizResponse, IApiResponse, IServerError } from '../quiz.types';
import styles from './Quiz.module.css';
import { Stepper } from './stepper/Stepper';
import { Question } from './question/Question';
import { UseQuiz } from '../quiz-store/quiz.context';
import { NextQuestion, ResetQuiz, InitializeQuiz } from '../quiz-store/quiz.reducer';
import { getUrl } from '../api.config';
import { UseAxios } from '../custom-hooks/useAxios';
import { useNotifications } from '../contexts/notifications-context';

async function getQuiz<T>(id: string): Promise<IApiResponse<T> | IServerError> {
    try {
      const res = await axios.get<T>(getUrl('specificQuizes', { id }));
      return { data: res.data, status: res.status };
    } catch(err) {
      if( axios.isAxiosError(err) ) {
        const serverError = err as AxiosError<IServerError>;
        if(serverError.response && serverError.response.data)
          return { ...serverError.response.data, status: serverError.response.status };
      }
      console.log(err)
    } 
    return { message: "Something went wrong", status: 400 };
}


export function Quiz() {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const { state: { currentQuestion, answerStatus}, dispatch } = UseQuiz();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getData } = UseAxios();
  const { showNotification } = useNotifications();

    useEffect( () => {
        (async () => {
          // const response = await getQuiz<IQuizResponse>(id);
          const response = await getData<IQuizResponse>( getUrl('specificQuizes', { id }) )
          if( "data" in response ) {
            const quizData = response.data.quiz
            console.log(quizData);
            setQuiz(quizData);
            const totalScore = quizData.questions.reduce((acc, cur) => { 
              return acc + cur.points;
           }, 0);
           dispatch(new InitializeQuiz( { totalQuestions: quizData.questions.length, totalScore } ) );

          } else {
            // window.alert(response.message);
            showNotification({ type: 'ERROR', message: response.message })
          }
        })();
    }, [])

    const nextQuestion = () => {
        dispatch(new NextQuestion() );
    }

    const finishQuiz = () => {
      navigate('/result');
    }

    const quitQuiz = () => {
      dispatch( new ResetQuiz() );
      navigate('/');
    }

    return (
      <div className={ `row ${styles.quiz}` }>
        {
          quiz &&        
           <div className="col-8 col-md-10 col-sm-12">
              <h2 className={styles.quizTitle}>{ quiz.title }</h2>
              <h1 className={styles.question}>Question <span className={styles.questionNo}>{ currentQuestion + 1 }</span> <span className={styles.totalQuestions}> / { quiz.questions.length }</span> </h1>
              <Stepper questions={ quiz.questions.length } answerStatus={answerStatus} currentQuestion = { currentQuestion } />
              <Question  question = { quiz.questions[currentQuestion] } status = { answerStatus[currentQuestion] } />
              <div className="row">
                <button className={`btn col-6 ${styles.quitBtn}`} onClick={ quitQuiz } > <FaPowerOff fill="grey" style={{ fontSize: '1rem' }}/> Quit Quiz</button>
                {
                  currentQuestion + 1 < quiz.questions.length? 
                  <button className={`btn col-6 ${styles.nextBtn}`} onClick={ nextQuestion }>Next</button>:
                  <button className={`btn col-6 ${styles.nextBtn}`} onClick={ finishQuiz }>Finish</button>
                }
              </div>              
          </div>
        }
      </div>
      )
}