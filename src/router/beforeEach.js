export default async (to) => {

    const token = localStorage.getItem('token-auth')

    if (to.name === "login" && token) {
        return { path: `/chat`}
    }

    if (to.meta.requiresAuth) {
        if (!token) {   
            return { name:"login"}
        }

        return true;
    }

    return true;
}