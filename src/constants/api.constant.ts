const API_URL_ORIGIN:string = 'https://toilaron.icu';


export const authApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/auth/${url}`;
}
export const expertiseApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/expertise/${url}`;
}
export const medicineCategoryApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/medicine-categories/${url}`;
}
export const medicineApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/medicine/${url}`;
}
export const adminApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/admin/${url}`;
}