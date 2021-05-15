import { useEffect, useState } from 'react';
import axios from 'axios'; 

import { quiz } from '../mock.data';
import { IQuiz, IQuizState } from '../quiz.types';
import styles from './Quiz.module.css';
import { ProgressBar } from './progress-bar/ProgressBar';
import { Question } from './question/Question';
import { UseQuiz } from '../quiz-store/quiz.context';

const getQuiz = async (): Promise<IQuiz> => {
    // const res = await axios.get();
    return quiz;
}


export function Quiz() {
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const { state: { currentQuestion, answerStatus } }: { state: IQuizState} = UseQuiz();

    useEffect( () => {
        (async () => {
           const quizData = await getQuiz();
           setQuiz(quizData);
        })();
    }, [])

    return (
      <div className={ `row ${styles.quiz}` }>
        {
          quiz &&        
           <div className="col-sm-12">
              <h2 className={styles.quizTitle}>{ quiz.title }</h2>
              <h1 className={styles.question}>Question <span className={styles.questionNo}>06</span> <span className={styles.totalQuestions}> / { quiz.questions.length }</span> </h1>
              <ProgressBar/>
              <Question  question = { quiz.questions[currentQuestion] } status = { answerStatus[currentQuestion] } />
              <button>Quit Quiz</button>
              <button>Next</button>
          </div>
        }
      </div>
      )
}