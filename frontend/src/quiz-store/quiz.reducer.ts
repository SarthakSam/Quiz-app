import { IQuizState } from '../quiz.types';

export const initialState: IQuizState = {
    currentQuestion: 0,
    answerStatus: [],
    score: 0
}

export function quizReducer(state: IQuizState, action: any) {
    return state;
}