import { IOption, IQuestion, IQuiz } from '../quiz.types';

export function getNewQuizObject(): IQuiz {
    return {
        _id: '',
        title: '',
        image: '',
        description: '',
        questions: [getNewQuestionObject()]
    }
}

export function getNewQuestionObject(): IQuestion {
    return {
        _id: '',
        question: '',
        options: [getNewOptionObject(), getNewOptionObject()],
        points: 0,
        negativePoints: 0
    }
}

export function getNewOptionObject(): IOption {
    return {
        _id: '',
        name: '',
        isCorrect: false
    }
}
