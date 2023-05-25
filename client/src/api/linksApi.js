import axiosClient from "./axiosClient"

const linksAPI = {
    getLink: (id) => {
        const url = `link/${id}`
        return axiosClient.get(url)
    },
    
}

export default linksAPI