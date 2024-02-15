export function formatPrice(price) {
	const formatter = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "CAD",
	}).format(price);
	return formatter;
}
