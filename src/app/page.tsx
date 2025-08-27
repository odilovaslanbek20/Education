import AuthLayout from './(auth)/layout'
import { Register } from './(auth)/register/page'

export default function Home() {
	return (
		<>
			<AuthLayout>
				<Register />
			</AuthLayout>
		</>
	)
}
