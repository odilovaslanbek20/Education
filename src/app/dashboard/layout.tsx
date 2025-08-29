// import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Header/Navbar'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			<main className='pt-[65px]'>{children}</main>
			{/* <Footer /> */}
		</>
	)
}
