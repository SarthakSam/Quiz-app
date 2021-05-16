import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { FaPowerOff } from 'react-icons/fa';

import { quiz } from '../mock.data';
import { IQuiz, IQuizState } from '../quiz.types';
import styles from './Quiz.module.css';
import { ProgressBar } from './progress-bar/ProgressBar';
import { Question } from './question/Question';
import { UseQuiz } from '../quiz-store/quiz.context';
import { NextQuestion } from '../quiz-store/quiz.reducer';

const getQuiz = async (): Promise<IQuiz> => {
    // const res = await axios.get();
    return quiz;
}


export function Quiz() {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const { state: { currentQuestion, answerStatus}, dispatch } = UseQuiz();

    useEffect( () => {
        (async () => {
           const quizData = await getQuiz();
           setQuiz(quizData);
        })();
    }, [])

    const nextQuestion = () => {
        dispatch(new NextQuestion() );
    }

    return (
      <div className={ `row ${styles.quiz}` }>
        {
          quiz &&        
           <div className="col-sm-12">
              <h2 className={styles.quizTitle}>{ quiz.title }</h2>
              <h1 className={styles.question}>Question <span className={styles.questionNo}>{ currentQuestion + 1 }</span> <span className={styles.totalQuestions}> / { quiz.questions.length }</span> </h1>
              <ProgressBar/>
              <Question  question = { quiz.questions[currentQuestion] } status = { answerStatus[currentQuestion] } />
              <div className="row">
                <button className={`btn col-6 ${styles.quitBtn}`}> <FaPowerOff fill="grey" style={{ fontSize: '1rem' }}/> Quit Quiz</button>
                <button className={`btn col-6 ${styles.nextBtn}`} onClick={ nextQuestion }>Next</button>
              </div>              
          </div>
        }
      </div>
      )
}