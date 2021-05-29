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

export type IUser = {
    username: string;
    authorization: string;
}

export type IQuizState = {
    categories: ICategory[],
    totalQuestions: number;
    totalScore: number;
    currentQuestion: number;
    answerStatus: IAnswerStatus[];
    score: number;
    userDetails: IUser | null;
}

export type ICategory = {
    _id: string;
    image?: string;
    title: string;
    quizes: IQuiz[];
}

export type INewOption = {
    name: string;
    isCorrect: boolean;
}

export type INewQuestion = {
    question: InputField<string>;
    options: InputField<INewOption[]>;
    points: InputField<number>;
    negativePoints?: InputField<number>;
    explanation?: InputField<string>;
    isValid: boolean;
}

export type INewQuestionKeys = "question" | "options" | "points" | "negativePoints" | "explanation";

export type InputField<T> = {
    value: T;
    isValid: boolean;
    error: string;
}

export type INewQuiz = {
    image: InputField<string>;
    title: InputField<string>;
    description: InputField<string>;
    questions: InputField<INewQuestion[]>;
    isValid: boolean;
}

export type INewQuizKeys = "image" | "title" | "description" | "questions";


export type INewQuestionProps = {
    question: InputField<string>;
    options: InputField<INewOption[]>;
    points: InputField<number>;
    negativePoints?: InputField<number>;
    explanation?: InputField<string>;
    index: number;
    onChange: Function;
}

export type INewOptionProps = {
    radioFor: string;
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

export type IQuizResponse = {
    message: string;
    quiz: IQuiz;
}

export type IQuizesResponse = {
    message: string;
    quizes: IQuiz[];
}

export type ICategoryResponse = {
    message: string;
    categories: ICategory[];
}

export type IUserResponse = {
    message: string;
    username: string;
    authorization: string;
}

export type INotification = {
    id?: string;
    message: string;
    type: 'SUCCESS' | 'WARNING' | 'ERROR';
    duration?: number;
}