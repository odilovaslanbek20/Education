import { centerDetails } from '@/apiRequest/request'
import CenterDetails from '@/components/Center/CenterDetails'

interface CenterProps {
  params: { id: string }
}

export default async function Details({ params }: CenterProps) {
  const { id } = params
	const data = await centerDetails(id) 

  return (
    <>
		 <CenterDetails data={data}/>
		</>
  )
}
