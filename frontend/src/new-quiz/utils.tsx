import { INewOption, INewQuestion, INewQuiz } from '../quiz.types';

export class InputFieldObj {
    value;
    isValid;
    error;
    constructor(value: any) {
        this.value = value;
        this.isValid = true;
        this.error = '';
    }
}

export function getNewQuizObject(): INewQuiz {
    return {
        title: new InputFieldObj(""),
        image: new InputFieldObj(""),
        description: new InputFieldObj(""),
        questions: new InputFieldObj( [getNewQuestionObject()] ),
        isValid: true
    }
}

export function getNewQuestionObject(): INewQuestion {
    return {
        question: new InputFieldObj(""),
        options: new InputFieldObj([getNewOptionObject(), getNewOptionObject()]),
        points: new InputFieldObj(0),
        negativePoints: new InputFieldObj(0),
        explanation: new InputFieldObj(""),
        isValid: true
    }
}

export function getNewOptionObject(): INewOption {
    return {
        name: '',
        isCorrect: false
    }
}
