import axios from "axios";

const API = axios.create({
	baseURL: "https://findcourse.net.uz/api"
})

export async function getData(url: string) {
	const res = await API.get(`/${url}`)
	return res.data
}

export async function postData(url: string, data: object) {
	const res = await API.post(`${url}`, data)
  return res.data
}