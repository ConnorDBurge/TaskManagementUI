import http from './HttpService'

// request interceptor to include the accessToken in every request header
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers['Authorization'] = 'Bearer ${token}';
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const RoleService = {
    getRoles: async () => {
        const response = await http.get('/roles'); 
        return response.data;
    },
    
};

export default new RoleService();