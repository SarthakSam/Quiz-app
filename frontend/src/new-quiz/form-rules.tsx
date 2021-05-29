import { INewOption, INewOptionKeys, INewQuestion, INewQuestionKeys, INewQuiz, INewQuizKeys, InputField } from "../quiz.types";

const validateField = (field: InputField<string | number | INewQuestion[] | INewOption[] > | undefined, key: INewQuizKeys | INewQuestionKeys | INewOptionKeys) => {
    if( !field?.value ) {
        return {
                ...field,
                isValid: false,
                error: `${key} is mandatory`
            }
    }
    return {
        ...field,
        isValid: true,
        error: ''
    };
}

const validateQuestion = (question: INewQuestion) => {

    let areAllOptionsValid = true;

    const options: INewOption[] = question.options.value.map( ( option: INewOption ) => {
        const nameValidation = validateField( option.name, 'name' );
        areAllOptionsValid = nameValidation.isValid && areAllOptionsValid;
        return {
            ...option,
            name: { 
                ...nameValidation,
                value: option.name.value
            }
        }
    });

    const validatedQuestion: INewQuestion = {
        ...question,
        options: {
            value: options,
            isValid: areAllOptionsValid,
            error: areAllOptionsValid? '' : 'Error in options'
        }
    }

    const validationFields: INewQuestionKeys[] = ["question", "points"];
    return validationFields.reduce((question: INewQuestion, field: INewQuestionKeys) => {
        const validationResult = validateField(question[field], field);
        return {
            ...question, 
            [field]: validationResult,
            isValid: validationResult.isValid && question.isValid
        };
    }, {...validatedQuestion, isValid: true});
}

export const validateQuiz = (quiz: INewQuiz) => {
    
    let areAllQuestionsValid = true;
    const questions: INewQuestion[] = quiz.questions.value.map( (question: INewQuestion) => {
        const validatedResult = validateQuestion(question);
        areAllQuestionsValid = areAllQuestionsValid && validatedResult.isValid;
        return validatedResult;
    });

    const validatedQuiz: INewQuiz = { ...quiz, questions: { value: questions, isValid: areAllQuestionsValid, error: areAllQuestionsValid? "" : "Questions not valid" }};

    const validationFields: INewQuizKeys[] = ["title", "image"];

    return validationFields.reduce((quiz: INewQuiz, field: INewQuizKeys) => {
        const validationResult = validateField(quiz[field], field);
        return {
            ...quiz, 
            [field]: validationResult,
            isValid: validationResult.isValid && quiz.isValid
        };
    }, {...validatedQuiz, isValid: true});
}
