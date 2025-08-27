import { TranslationProvider } from '@/context/TranslationContext'
import { ReactNode } from 'react'

export default function Provider({children}: {children: ReactNode}) {
	return (
		<TranslationProvider>
   			{children}		 			
		</TranslationProvider>
	)
}