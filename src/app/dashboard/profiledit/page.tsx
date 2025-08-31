import { myData } from '@/apiRequest/request'
import EditUser from '@/components/Profile/EditProfile'
import { cookies } from 'next/headers'

export default async function Edit() {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	console.log(token)
	const user = await myData()
	return (
		<>
			<EditUser data={user} token={token as string} />
		</>
	)
}
