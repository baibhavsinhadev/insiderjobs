const formatCTC = (salary) => {
    if (salary === null || salary === undefined || isNaN(salary)) {
        return "N/A";
    }

    const amount = Number(salary);

    if (amount >= 10000000) {
        return `${(amount / 10000000).toFixed(1).replace(".0", "")} Cr`;
    }

    if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1).replace(".0", "")} LPA`;
    }

    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1).replace(".0", "")}K`;
    }

    return `${amount}`;
};

export default formatCTC;