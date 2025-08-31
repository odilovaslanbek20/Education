import { centers } from '@/apiRequest/request'
import Center from '@/components/Centers/Centers'

export default async function Dashboard() {
	const obj = await centers()
	return (
		<>
			<Center data={obj}/>
		</>
	)
}
