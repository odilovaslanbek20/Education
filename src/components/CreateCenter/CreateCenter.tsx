'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
// import { Sparkles } from '@/components/magicui/sparkles'

export default function CreateCenter() {
	return (
		<section className="py-10 bg-white dark:bg-black">
			<div className="web-container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card className="rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800">
						<CardHeader>
							<CardTitle className="text-3xl font-bold flex items-center gap-2">
								{/* <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" /> */}
								Create New Education Center
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="name">Center Name</Label>
									<Input id="name" name="name" placeholder="Enter center name" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="address">Address</Label>
									<Input id="address" name="address" placeholder="Enter address" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input id="phone" name="phone" type="tel" placeholder="+998 90 123 45 67" required />
								</div>

								<div className="space-y-2">
									<Label htmlFor="image">Image URL</Label>
									<Input id="image" name="image" type="url" placeholder="https://example.com/image.jpg" required />
								</div>

								<Button type="submit" className="w-full">
									Create Center
								</Button>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	)
}