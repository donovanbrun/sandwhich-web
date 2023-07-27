export function setAuthToken(token: string, expiration: number) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiration.toString());
}

export function getAuthToken() {
    return {
        token: localStorage.getItem("token"),
        expiration: localStorage.getItem("expiration") ? parseInt(localStorage.getItem("expiration")!) : 0
    };
}

export function removeAuthToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
}