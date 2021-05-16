import { IQuiz } from './quiz.types';

export const quiz: IQuiz = {
    _id: '1234',
    title: 'Who is the king?',
    questions: [
        {
            _id: 'question1',
            question: 'Who is the king of jungle?',
            explanation: '',
            points: 5,
            negativePoints: 2,
            options: [
                {
                    _id: 'option1',
                    name: 'Lion',
                    isCorrect: true
                },
                {
                    _id: 'option2',
                    name: 'Tiger',
                    isCorrect: false
                },
                {
                    _id: 'option3',
                    name: 'Dog',
                    isCorrect: false
                },
            ]
        },
        {
            _id: 'question2',
            question: 'Who is the king of fruits?',
            points: 5,
            negativePoints: 1,
            options: [
                {
                    _id: 'option1',
                    name: 'banana',
                    isCorrect: false
                },
                {
                    _id: 'option2',
                    name: 'Mango',
                    isCorrect: true
                },
                {
                    _id: 'option3',
                    name: 'Orange',
                    isCorrect: false
                },
            ]
        },
        {
            _id: 'question3',
            question: 'Who is the king of all in dragonball Super?',
            points: 3,
            options: [
                {
                    _id: 'option1',
                    name: 'Grand Zeno',
                    isCorrect: true
                },
                {
                    _id: 'option2',
                    name: 'Beerus',
                    isCorrect: false
                },
                {
                    _id: 'option3',
                    name: 'Champa',
                    isCorrect: false
                },
            ]
        }
    ]
}