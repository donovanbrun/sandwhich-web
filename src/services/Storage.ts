export function setAuthToken(token: string) {
    localStorage.setItem("token", token);
}

export function getAuthToken() {
    return localStorage.getItem("token");
}

export function removeAuthToken() {
    return localStorage.removeItem("token");
}