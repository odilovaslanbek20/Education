import { centerDetails, filials } from '@/apiRequest/request'
import CenterDetails from '@/components/Center/CenterDetails'

interface CenterProps {
  params: { id: string }
}

export default async function Details({ params }: CenterProps) {
  const { id } = params
	const data = await centerDetails(id) 
	const filial = await filials()

  return (
    <>
		 <CenterDetails data={data} filial={filial}/>
		</>
  )
}
