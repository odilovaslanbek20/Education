import { cookies } from 'next/headers'
import DashboardLayout from './dashboard/layout'
import Dashboard from './dashboard/page'
import AuthLayout from './(auth)/layout'
import LoginPage from './(auth)/login/page'

export default async function Home() {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	console.log(token)

	if (token) {
		return (
			<DashboardLayout>
				<Dashboard />
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
