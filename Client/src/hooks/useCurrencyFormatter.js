const useCurrencyFormatter = () => {
    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            currencyDisplay: "symbol",
        });
    };

    return { formatCurrency };
};

export default useCurrencyFormatter;
