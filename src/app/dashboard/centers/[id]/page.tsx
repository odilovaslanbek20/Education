import { centerDetails, myData } from '@/apiRequest/request'
import CenterDetails from '@/components/Center/CenterDetails'
import { cookies } from "next/headers"

interface CenterProps {
  params: { id: string }
}

export default async function Details({ params }: CenterProps) {
  const { id } = params
	const data = await centerDetails(id) 
  const cookieStore = await cookies()
	const token = cookieStore.get("accessToken")?.value
  const MyData = await myData()

  return (
    <>
		 <CenterDetails data={data} token={token} myData={MyData}/>
		</>
  )
}
