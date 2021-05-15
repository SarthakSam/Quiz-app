import { IOption } from "./quiz.types";

type ActionTypes = 'CHECK_ANSWER';

export type Actions = CheckAnswer;

export class CheckAnswer {
    type: ActionTypes;
    payload: { option: IOption, points: number, negativePoints?: number};
    constructor( payload: { option: IOption, points: number, negativePoints?: number} ) {
        this.type = 'CHECK_ANSWER';
        this.payload = payload;
    }
}