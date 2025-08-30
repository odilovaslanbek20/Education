import { myData } from '@/apiRequest/request'

export default async function Data() {
	const data = await myData()
	console.log(data);
	return data
}
