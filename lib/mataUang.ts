const mataUang = (
	nominal: number,
	satuan: string = "IDR",
	digitKoma: number = 0
) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: satuan,
		maximumFractionDigits: digitKoma,
	}).format(nominal);
};

export default mataUang;
