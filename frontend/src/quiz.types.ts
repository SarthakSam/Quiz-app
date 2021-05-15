export type IOption = {
    name: string;
    isCorrect: boolean;
}

export type IQuestion = {
    question: string;
    options: IOption[];
    points: number;
    negativePoints?: number;
    explanation?: string;
}

export type IQuiz = {
    _id: string;
    title: string;
    questions: IQuestion[];
}

export type IAnswerStatus = "Correct" | "Incorrect" | "Not Answered";

export type IQuizState = {
    currentQuestion: number;
    answerStatus: IAnswerStatus[];
    score: number;
}