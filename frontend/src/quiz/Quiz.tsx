import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { FaPowerOff } from 'react-icons/fa';

import { quiz } from '../mock.data';
import { IQuiz } from '../quiz.types';
import styles from './Quiz.module.css';
import { Stepper } from './stepper/Stepper';
import { Question } from './question/Question';
import { UseQuiz } from '../quiz-store/quiz.context';
import { NextQuestion, ResetQuiz, InitializeQuiz } from '../quiz-store/quiz.reducer';

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
           const totalScore = quizData.questions.reduce((acc, cur) => { 
              return acc + cur.points;
           }, 0);
           dispatch(new InitializeQuiz( { totalQuestions: quizData.questions.length, totalScore } ) );
        })();
    }, [])

    const nextQuestion = () => {
        dispatch(new NextQuestion() );
    }

    const finishQuiz = () => {
      console.log("Quiz Finished");
    }

    const quitQuiz = () => {
      dispatch( new ResetQuiz() );
    }

    return (
      <div className={ `row ${styles.quiz}` }>
        {
          quiz &&        
           <div className="col-sm-12">
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