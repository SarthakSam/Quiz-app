import axios from 'axios';

import { ICategory, IQuizState, IUser } from '../quiz.types';

// export type CheckAnswer = { type: "CHECK_ANSWER"; payload: { option: IOption, points: number, negativePoints?: number} };
// type NextQuestion = { type: "NEXT_QUESTION" };

type Action =
| InitializeCategories
| InitializeQuiz
| CheckAnswer
| NextQuestion
| ResetQuiz
| AuthenticateUser;

export class InitializeCategories {
    type: string;
    constructor(public payload: { categories: ICategory[]}) {
        this.type = 'INITIALIZE_CATEGORIES';
        this.payload = payload;
    }
}
export class InitializeQuiz {
    type: string;
    constructor(public payload: { totalQuestions: number, totalScore: number }) {
        this.type = 'INITIALIZE_QUIZ';
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

export class AuthenticateUser {
    type: string;
    constructor(public payload: IUser) {
        this.type = 'AUTHENTICATE_USER';
    }
}

export class LogoutUser {
    type: string;
    constructor() {
        this.type = 'LOGOUT_USER';
    }
}

export const initialState: IQuizState = {
    categories: [],
    totalQuestions: 0,
    totalScore: 0,
    currentQuestion: 0,
    answerStatus: [],
    score: 0,
    userDetails: null
}

export function quizReducer(state: IQuizState, action: Action) {
    switch( action.type ) {
        case 'INITIALIZE_CATEGORIES': return { ...state, categories: action.payload.categories };
        case 'INITIALIZE_QUIZ': return { ...state, ...action.payload };
        case 'CHECK_ANSWER': return checkAnswer(state, action);
        case 'NEXT_QUESTION': return nextQuestion(state, action);
        case 'RESET_QUIZ': return { ...state,  
                                    totalQuestions: 0,
                                    totalScore: 0,
                                    currentQuestion: 0,
                                    answerStatus: [],
                                    score: 0 };
        case 'AUTHENTICATE_USER': return authenticateUser(state, action);
        case 'LOGOUT_USER': return logoutUser(state, action);
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

function authenticateUser(state: IQuizState, action: Action): IQuizState {
    localStorage?.setItem('userDetails', JSON.stringify(action.payload) );
    setupAuthHeaderForServiceCalls(action.payload.authorization);
    return { ...state, userDetails: action.payload };
}

function logoutUser(state: IQuizState, action: Action): IQuizState {
    localStorage?.setItem('userDetails', "" );
    setupAuthHeaderForServiceCalls("");
    return { ...state, userDetails: null };
}

function setupAuthHeaderForServiceCalls(token: string) {
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
  }