export type IOption = {
    _id: string;
    name: string;
    isCorrect: boolean;
}

export type IQuestion = {
    _id: string;
    question: string;
    options: IOption[];
    points: number;
    negativePoints?: number;
    explanation?: string;
}

export type IQuiz = {
    _id: string;
    image?: string;
    title: string;
    description: string;
    questions: IQuestion[];
}

export type IAnswerStatus = "Correct" | "Incorrect" | "Not Answered";

export type IQuizState = {
    totalQuestions: number;
    totalScore: number;
    currentQuestion: number;
    answerStatus: IAnswerStatus[];
    score: number;
}

export type ICategory = {
    _id: string;
    image?: string;
    title: string;
    quizes: IQuiz[];
}