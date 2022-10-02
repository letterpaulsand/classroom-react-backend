export default function status(code, message, data) {
    if (data === void 0) { data = []; }
    return {
        status: code,
        message: message,
        data: data
    };
}
