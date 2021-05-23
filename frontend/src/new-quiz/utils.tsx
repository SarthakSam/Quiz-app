import { INewOption, INewQuestion, INewQuiz } from '../quiz.types';

export function getNewQuizObject(): INewQuiz {
    return {
        title: '',
        image: '',
        description: '',
        questions: [getNewQuestionObject()]
    }
}

export function getNewQuestionObject(): INewQuestion {
    return {
        question: '',
        options: [getNewOptionObject(), getNewOptionObject()],
        points: 0,
        negativePoints: 0
    }
}

export function getNewOptionObject(): INewOption {
    return {
        name: '',
        isCorrect: false
    }
}
