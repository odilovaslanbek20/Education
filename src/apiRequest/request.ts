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

export const myLike = async () => {
	const res = await getData(`liked`)
	console.log('My Like', res);
	return res
}

export const centerDetails = async (id: string) => {
	const res = await getData(`centers/${id}`)
	console.log('Center Details', res.data);
	return res
}