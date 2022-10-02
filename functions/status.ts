interface ReturnValue{
    status: number,
    message: string,
    data: any[]
}

export default function status(code: number, message: string, data: any[] = []): ReturnValue{
    return {
        status: code,
        message: message,
        data: data
    }
}