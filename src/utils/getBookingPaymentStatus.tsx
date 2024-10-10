export function getMemberRoleMark(status: string) {
	switch (status) {
		case 'member':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
					{status.replaceAll('-', ' ').toUpperCase()}
				</span>
			)
		case 'non-member':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
					{status.replaceAll('-', ' ').toUpperCase()}
				</span>
			)
		case 'admin':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
					{status.replaceAll('-', ' ').toUpperCase()}
				</span>
			)
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
					{status.replaceAll('_', ' ').toUpperCase()}
				</span>
			)
	}
}
