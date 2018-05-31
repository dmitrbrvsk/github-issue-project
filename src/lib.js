export const getFullDate = time => {
	const d = new Date(time)
	const dd = d.getDate() < 10 ? `0 ${d.getDate()}` : d.getDate()
	const mm = d.getMonth() + 1 < 10 ? `0 ${(d.getMonth() + 1)}` : d.getMonth() + 1
	const yy = d.getFullYear()

	return `${dd}. ${mm}. ${yy}`
}
