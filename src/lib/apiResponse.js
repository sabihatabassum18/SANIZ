const apiResponse = (status, message, data = null) => {
    return { status, message, data };
};

export default apiResponse;
