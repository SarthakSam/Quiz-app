import { IQuizState } from '../quiz.types';
import { Actions } from '../actions';

export const initialState: IQuizState = {
    currentQuestion: 0,
    answerStatus: [],
    score: 0
}

export function quizReducer(state: IQuizState, action: Actions) {
    switch( action.type ) {
        case 'CHECK_ANSWER': return checkAnswer(state, action);
        default:            return state;
    }
}

function checkAnswer(state: IQuizState, action: Actions): IQuizState {
    const negativePoints = action.payload.negativePoints? action.payload.negativePoints : 0;
    const pointsScored = action.payload.option.isCorrect? action.payload.points : negativePoints;
    return  { ...state, 
            answerStatus: [...state.answerStatus, action.payload.option.isCorrect? 'Correct':'Incorrect'],
            score: state.score + pointsScored
            };
}