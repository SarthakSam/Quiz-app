import { createContext, useContext, useReducer } from "react";
import { IQuizState } from "../quiz.types";
import { quizReducer, initialState } from './quiz.reducer';

const initialContextState = {
    state: initialState,
    dispatch: () => {}
}

const quizContext = createContext<{ state: IQuizState, dispatch: Function } >(initialContextState);

export function UseQuiz() {
    return useContext(quizContext);
}

export function QuizProvider({children} : any) {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    return <quizContext.Provider  value={{ state, dispatch }}>
        { children }
    </quizContext.Provider>
}
