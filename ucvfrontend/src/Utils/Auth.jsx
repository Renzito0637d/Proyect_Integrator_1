export const getAuthHeader = () => {
    const token = sessionStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};