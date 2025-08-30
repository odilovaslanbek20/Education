import Data from '@/apiRequest/data'
import Center from '@/components/Centers/Centers'

export default async function Dashboard() {
	const obj = await Data()
	return (
		<>
			<Center data={obj}/>
		</>
	)
}
