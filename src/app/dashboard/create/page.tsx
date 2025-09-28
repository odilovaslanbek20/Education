import { major, regions } from '@/apiRequest/request'
import CreateCenter from '@/components/CreateCenter/CreateCenter'
import { cookies } from 'next/headers'

export default async function create() {
		const cookieStore = await cookies()
		const token = cookieStore.get('accessToken')?.value
		const region = await regions()
		const majors = await major()
	return (
		<>
		 <CreateCenter token={token} region={region} majors={majors}/>
		</>
	)
}