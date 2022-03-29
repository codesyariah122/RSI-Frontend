// Currency Format Number | codesyariah122
// docs : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

const FormatCurrency = (number) => {
	// console.log(number)
	const currency = new Intl.NumberFormat("id-ID", {
		style: 'currency',
		currency: 'IDR'
	}).format(number)

	return currency
}

export default ({ app }, inject) => {
  inject('format', FormatCurrency)
}