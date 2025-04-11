const API_URL_ORIGIN:string = 'https://toilaron.icu';


export const authApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/auth${url}`;
}

export const adminApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/admin${url}`;
}
export const medicineApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/medicines${url}`;
}
export const dentalServiceApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/dental-services${url}`;
}
export const appointmentUserApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/user/appointments${url}`;
}
export const staffApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/staffs${url}`;
}
export const medicineCategoryApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/medicine-categories${url}`;
}
export const expertiseApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/expertise${url}`;
}
export const appointmentDentistApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/dentist/appointments${url}`;
}
export const dentistApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/dentists${url}`;
}
export const activityLogApi = (url:string) => {
    return `${API_URL_ORIGIN}/api/activity-logs${url}`;
}