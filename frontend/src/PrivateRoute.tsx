import { Route, Navigate, useLocation } from "react-router-dom";
import { UseQuiz } from "./quiz-store/quiz.context";

export function PrivateRoute({ path, element }: any) {
    const { state: { userDetails } } = UseQuiz();
    const location = useLocation();
    const state = { from: location.pathname };

    if(userDetails) {
        return (
            <Route path={path} element={element} />
        )
    }
    return (
        <Navigate to="/signin" state={ state } replace  />
    )
}