export async function handleResponse(response) {
    if (await response.ok) {
        debugger;
        return response.text().then((data) => {
            return data ? JSON.parse(data) : {};
        });
    }
    if ((await response.status) === 400) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = await response.text();
        throw new Error(error);
    }
    throw new Error('Network response was not ok.');
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
    debugger;
    // eslint-disable-next-line no-console
    console.error('API call failed. ' + error);
    throw error;
}
