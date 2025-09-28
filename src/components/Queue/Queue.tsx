import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/context/TranslationContext'
import { Textarea } from '../ui/textarea'
import { FaStar } from 'react-icons/fa6'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { CentersResponse1 } from '@/types/types'

interface DataType {
	id: string
	data: CentersResponse1
}

export default function Queue({ id, data }: DataType) {
	const { t } = useTranslation()
	const [rating, setRating] = useState<number>(0)

	return (
		<div className='w-full h-screen bg-black/55 fixed top-0 left-0 flex items-center justify-center z-50'>
			<Card className='w-full max-w-sm mx-auto'>
				<CardHeader className='flex items-center justify-between'>
					<CardTitle>Comment edite</CardTitle>
					<IoClose className='text-2xl cursor-pointer' />
				</CardHeader>
				<CardContent>
					<form>
						{data?.data?.comments?.map(comment => (
							<div key={comment?.id} className='flex flex-col gap-6'>
								<div className=''>
									<Label htmlFor='text' className='mb-1.5'>
										{t('comment')}
									</Label>
									<Textarea
										value={comment?.text}
										placeholder={t('comment_placeholder')}
										required
									/>
								</div>
								<div className=''>
									<div className='flex justify-center mt-1 mb-1'>
										{[1, 2, 3, 4, 5].map(star => (
											<FaStar
												key={star}
												size={30}
												onClick={() => setRating(star)}
												className={`cursor-pointer transition-colors ${
													star <= rating ? 'text-yellow-400' : 'text-gray-300'
												}`}
											/>
										))}
									</div>
								</div>
							</div>
						))}
					</form>
				</CardContent>
				<CardFooter className='flex-col gap-2'>
					<Button type='submit' className='w-full'>
						{t('comment_btn')}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
