import { IQuizState, IOption } from '../quiz.types';

// export type CheckAnswer = { type: "CHECK_ANSWER"; payload: { option: IOption, points: number, negativePoints?: number} };
// type NextQuestion = { type: "NEXT_QUESTION" };

type Action =
| CheckAnswer
| NextQuestion;

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

export const initialState: IQuizState = {
    currentQuestion: 0,
    answerStatus: [],
    score: 0
}

export function quizReducer(state: IQuizState, action: Action) {
    switch( action.type ) {
        case 'CHECK_ANSWER': return checkAnswer(state, action);
        case 'NEXT_QUESTION': return { ...state, currentQuestion: state.currentQuestion + 1 };
        default:            return state;
    }
}

function checkAnswer(state: IQuizState, action: Action): IQuizState {
    const negativePoints = action.payload.negativePoints? action.payload.negativePoints : 0;
    const pointsScored = action.payload.option.isCorrect? action.payload.points : negativePoints;
    return  { ...state, 
            answerStatus: [...state.answerStatus, action.payload.option.isCorrect? 'Correct':'Incorrect'],
            score: state.score + pointsScored
            };
}