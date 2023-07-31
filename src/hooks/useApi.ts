export const useApi = () => ({
    signin: async (name:string) =>{
        return {
            user: {name: name}
        };
    },
    logout: async () =>{
        localStorage.removeItem('user');
        return true;
    }
});