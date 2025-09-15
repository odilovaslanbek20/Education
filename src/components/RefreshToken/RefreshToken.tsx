'use client'

import Cookies from 'js-cookie'
import { useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from '@/context/TranslationContext'

export default function RefreshToken() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const { t } = useTranslation()

	useEffect(() => {
		const interval = setInterval(async () => {
			const refreshToken = Cookies.get('refreshToken')
			if (refreshToken) {
				try {
					const res = await axios.post(`${apiUrl}/users/refreshToken`, {
						refreshToken,
					})
					Cookies.set('accessToken', res.data.accessToken, { expires: 1 / 24 })
				} catch (error: unknown) {
					console.log(error)
				}
			}
		}, 10 * 60 * 1000)

		return () => clearInterval(interval)
	}, [t, apiUrl])

	return null
}
