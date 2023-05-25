import axiosClient from "./axiosClient"

const informationAPI = {
    getInfor: (id) => {
        const url = `infor/${id}`
        return axiosClient.get(url)
    },
    putInfor: (id,data) => {
        const url = `infor/update/${id}`
        return axiosClient.put(url, data)
    },
}

export default informationAPI