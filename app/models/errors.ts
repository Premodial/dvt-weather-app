export interface ErrorDetails {
    message: string;
    stack?: string;
    [key: string]: any; // This is to allow additional error details if necessary
}