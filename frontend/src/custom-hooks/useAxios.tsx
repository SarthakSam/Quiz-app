import axios, { AxiosError } from 'axios';
import { IApiResponse, IServerError } from '../quiz.types';
import { UseLoader } from '../contexts/loader.context';

export function UseAxios() {
    const { setLoading } = UseLoader();

    async function getData<T>(url: string) {
        setLoading(true);
        const resp = await axios.get(url);
    }

    async function postData<T>(url: string, body: any): Promise<IApiResponse<T> | IServerError> {
        try {
            setLoading(true);
            const resp = await axios.post<T>(url, body);
            return { data: resp.data, status: resp.status };
        } catch(err) {
            if( axios.isAxiosError(err) ) {
                const serverError = err as AxiosError;
                if(serverError.response && serverError.response.data)
                    return { ...serverError.response.data, status: serverError.response.status }
            }
        } finally {
            setLoading(false);
        }
        return { message: 'Something went wrong', status: 400 };
    }

    return { getData, postData };
}