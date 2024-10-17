import axios from "axios"

export const getService = async (url, values) => {
  return await axios.get(`/api${url}`, {params: values})
}

export const postService = async (url, body) => {
  return await axios.post(`/api${url}`, body)
}