"use server"

import axios from 'axios'
import { cookies } from "next/headers"

const API = axios.create({
	baseURL: 'https://findcourse.net.uz/api',
})

export async function getData(url: string) {
	const cookieStore = await cookies()
	const token = cookieStore.get("accessToken")?.value

	const res = await API.get(url, {
		headers: {
			Authorization: `Bearer ${token}`
		},
	})
	return res.data
}
