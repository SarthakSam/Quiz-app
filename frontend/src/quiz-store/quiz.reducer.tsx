import { IQuizState } from '../quiz.types';

// export type CheckAnswer = { type: "CHECK_ANSWER"; payload: { option: IOption, points: number, negativePoints?: number} };
// type NextQuestion = { type: "NEXT_QUESTION" };

type Action =
| SetTotalQuestions
| CheckAnswer
| NextQuestion
| ResetQuiz;

export class SetTotalQuestions {
    type: string;
    constructor(public payload: number) {
        this.type = 'SET_TOTAL_QUESTIONS';
        this.payload = payload;
    }
}
export class CheckAnswer {
    type: string;
    constructor(public payload: any) {
        this.type = 'CHECK_ANSWER';
    }
}

export class NextQuestion {
    type: string;
    constructor(public payload?: any) {
        this.type = 'NEXT_QUESTION';
    }
}

export class ResetQuiz {
    type: string;
    constructor(public payload?: any) {
        this.type = "RESET_QUIZ"
    }
}

export const initialState: IQuizState = {
    totalQuestions: 0,
    currentQuestion: 0,
    answerStatus: [],
    score: 0
}

export function quizReducer(state: IQuizState, action: Action) {
    switch( action.type ) {
        case 'SET_TOTAL_QUESTIONS': return { ...state, totalQuestions: action.payload };
        case 'CHECK_ANSWER': return checkAnswer(state, action);
        case 'NEXT_QUESTION': return nextQuestion(state, action);
        case 'RESET_QUIZ': return { ...initialState };
        default:            return state;
    }
}

function checkAnswer(state: IQuizState, action: Action): IQuizState {
    if( state.answerStatus.length !== state.currentQuestion )
        return state;
    const negativePoints = action.payload.negativePoints? action.payload.negativePoints : 0;
    const pointsScored = action.payload.option.isCorrect? action.payload.points : negativePoints;
    return  { ...state, 
            answerStatus: [...state.answerStatus, action.payload.option.isCorrect? 'Correct':'Incorrect'],
            score: state.score + pointsScored
            };
}

function nextQuestion(state: IQuizState, action: Action): IQuizState {
    return {
        ...state, 
        currentQuestion: state.currentQuestion + 1 === state.totalQuestions? state.currentQuestion : state.currentQuestion + 1,
        answerStatus: state.answerStatus.length === state.currentQuestion? [...state.answerStatus, "Not Answered"]: [...state.answerStatus]
    }
}