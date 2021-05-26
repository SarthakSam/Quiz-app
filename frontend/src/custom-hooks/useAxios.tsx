import axios, { AxiosError } from 'axios';
import { IApiResponse, IServerError } from '../quiz.types';

export function UseAxios() {
    async function getData<T>(url: string) {
        const resp = await axios.get(url);

    }

    async function postData<T>(url: string, body: any): Promise<IApiResponse<T> | IServerError> {
        try {
            const resp = await axios.post<T>(url, body);
            return { data: resp.data, status: resp.status };
        } catch(err) {
            if( axios.isAxiosError(err) ) {
                const serverError = err as AxiosError;
                if(serverError.response && serverError.response.data)
                    return { ...serverError.response.data, status: serverError.response.status }
            }
        }
        return { message: 'Something went wrong', status: 400 };
    }

    return { getData, postData };
}