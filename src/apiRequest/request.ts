import { getData } from '@/lib/API'

export const myData = async () => {
	const res = await getData(`centers`)
	console.log(res);
  return res
}