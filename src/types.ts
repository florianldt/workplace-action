type SuccessResponse = {
    message_id: string;
    thread_key: string;
};

type ErrorResponse = {
    error: {
        message: string;
        type: string;
        code: number;
        fbtrace_id: string;
    };
};

export type { SuccessResponse, ErrorResponse };
