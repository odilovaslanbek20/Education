import { getData } from '@/lib/API'

export const centers = async () => {
	const res = await getData(`centers`)
	console.log(res);
  return res
}

export const myData = async () => {
	const res = await getData(`users/mydata`)
	console.log('My data', res);
	return res
}