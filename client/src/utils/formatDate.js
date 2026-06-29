const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "";

    const day = parsedDate.toLocaleString("en-GB", {
        day: "2-digit",
    });

    const month = parsedDate.toLocaleString("en-GB", {
        month: "short",
    });

    const year = parsedDate.getFullYear();

    return `${day} ${month}, ${year}`;
};

export default formatDate;