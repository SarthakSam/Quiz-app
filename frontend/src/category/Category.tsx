import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { quiz } from '../mock.data';
import { IQuiz } from '../quiz.types';

const getQuizData = (): IQuiz => {
    return quiz;
}

export function Category() {
    const { id: categoryId } = useParams();

    useEffect( () => {

    } );

    return (
        <div className="row">
            Category { categoryId }
        </div>
    )
}