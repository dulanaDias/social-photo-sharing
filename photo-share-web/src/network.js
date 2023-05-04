import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_URL

export default {
    post: async (endpoint, data, tokenKey = undefined ) => {
        if(tokenKey)
            return await axios.post(`${baseUrl}/${endpoint}`, data, {
                headers: {
                    Authorization: tokenKey
                }
            })
        return await axios.post(`${baseUrl}/${endpoint}`, data)
    },
    put: async (endpoint, data, tokenKey = undefined ) => {
        if(tokenKey)
            return await axios.put(`${baseUrl}/${endpoint}`, data, {
                headers: {
                    Authorization: tokenKey
                }
            })
        return await axios.put(`${baseUrl}/${endpoint}`, data)
    },
    get: async (endpoint, tokenKey = undefined ) => {
        if(tokenKey)
            return await axios.get(`${baseUrl}/${endpoint}`, {
                headers: {
                    Authorization: tokenKey
                }
            })
        return await axios.get(`${baseUrl}/${endpoint}`)
    },
    delete: async (endpoint, tokenKey = undefined ) => {
        if(tokenKey)
            return await axios.delete(`${baseUrl}/${endpoint}`, {
                headers: {
                    Authorization: tokenKey
                }
            })
        return await axios.delete(`${baseUrl}/${endpoint}`)
    }
}