'use client'

import { useTranslation } from '@/context/TranslationContext'

export default function EditUser() {
	const {t} = useTranslation()
	return (
		<>
		 <section>
			<div className="web-container py-[50px]">
				<h1 className=''>{t('my_account')}</h1>
			</div>
		 </section>
		</>
	)
}