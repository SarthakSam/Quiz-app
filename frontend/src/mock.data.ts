import { IQuiz } from './quiz.types';

export const quiz: IQuiz = {
    _id: '1234',
    title: 'Who is the king?',
    questions: [
        {
            question: 'Who is the king of jungle?',
            explanation: '',
            points: 5,
            negativePoints: 2,
            options: [
                {
                    name: 'Lion',
                    isCorrect: true
                },
                {
                    name: 'Tiger',
                    isCorrect: false
                },
                {
                    name: 'Dog',
                    isCorrect: false
                },
            ]
        },
        {
            question: 'Who is the king of fruits?',
            points: 5,
            negativePoints: 1,
            options: [
                {
                    name: 'banana',
                    isCorrect: false
                },
                {
                    name: 'Mango',
                    isCorrect: true
                },
                {
                    name: 'Orange',
                    isCorrect: false
                },
            ]
        },
        {
            question: 'Who is the king of all in dragonball Super?',
            points: 3,
            options: [
                {
                    name: 'Grand Zeno',
                    isCorrect: true
                },
                {
                    name: 'Beerus',
                    isCorrect: false
                },
                {
                    name: 'Champa',
                    isCorrect: false
                },
            ]
        }
    ]
}