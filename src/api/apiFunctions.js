const apiKey = process.env.REACT_APP_API_KEY


// here i create a function to set my headers, for easier handeling within the async functions
export const createHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
    }
}

