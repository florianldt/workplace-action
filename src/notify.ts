import axios, { AxiosError } from 'axios';
import { SuccessResponse, ErrorResponse } from './types';

async function notify(
    accessToken: string,
    threadKey: string,
): Promise<SuccessResponse> {
    try {
        const { data } = await axios.post<SuccessResponse>(
            'https://graph.facebook.com/v14.0/me/messages',
            {
                recipient: {
                    thread_key: threadKey,
                },
                message: {
                    text: 'hello, world!',
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    access_token: accessToken,
                },
            },
        );
        return data;
    } catch (e) {
        if (
            e instanceof AxiosError &&
            e.response &&
            'error' in e.response.data
        ) {
            const { error } = e.response.data as ErrorResponse;
            const { message, type } = error;
            throw Error(`${type}: ${message}`);
        }
        throw Error(JSON.stringify(e));
    }
}

export default notify;
