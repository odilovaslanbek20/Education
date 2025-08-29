'use client'

import { useEffect, useState } from 'react'
import AuthLayout from './(auth)/layout'
import LoginPage from './(auth)/login/page'
import DashboardLayout from './dashboard/layout'
import Dashboard from './dashboard/home/page'

export default function Home() {
	const [token, setToken] = useState('')

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			setToken(accessToken)
		}
	}, [])

	if (token) {
		return (
			<DashboardLayout>
				<Dashboard/>
			</DashboardLayout>
		)
	} else {
		return (
			<AuthLayout>
				<LoginPage />
			</AuthLayout>
		)
	}
}
