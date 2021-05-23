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

export type INewQuestionProps = {
    _id: string;
    question: string;
    options: IOption[];
    points: number;
    negativePoints?: number;
    explanation?: string;
    index: number;
    onChange: Function;
}

export type INewOptionProps = {
    radioFor: string;
    _id: string;
    name: string;
    isCorrect: boolean;
    onChange: Function;
    index: number;
}

export type IServerError = {
    message: string;
    status: number;
}

// type IApiResponseStatus = 200 | 201;

export type IApiResponse<T> = {
    data: T;
    status: number;
}

export type ICategoryResponse = {
    message: string;
    categories: ICategory[];
}