export class FormatResponse<T>{
    status: boolean;
    code: number;  
    message: string;
    data?: T;
}