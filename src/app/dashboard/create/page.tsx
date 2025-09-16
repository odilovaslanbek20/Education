export default function CreateCenter() {
	return (
		<>
		 <section>
			<div className="web-container">
				<h1 className="text-3xl font-bold mb-6">Create New Education Center</h1>
				<form className="space-y-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="name">Center Name</label>
						<input className="w-full border border-gray-300 rounded-md p-2" type="text" id="name" name="name" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
						<input className="w-full border border-gray-300 rounded-md p-2" type="text" id="address" name="address" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
						<input className="w-full border border-gray-300 rounded-md p-2" type="tel" id="phone" name="phone" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="image">Image URL</label>
						<input className="w-full border border-gray-300 rounded-md p-2" type="url" id="image" name="image" required />
					</div>
					<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" type="submit">Create Center</button>
				</form>
			</div>
		 </section>
		</>
	)
}