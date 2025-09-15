import { centers, myLike } from '@/apiRequest/request'
import { cookies } from 'next/headers'
import Center from './centers/page'

export default async function Dashboard() {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	const obj = await centers()
	const like = await myLike()
	return (
		<>
			<Center data={obj} token={token} like={like} />
		</>
	)
}