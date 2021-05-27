
export const handleError = (err) => {
    console.error(`ERROR(${err.code}): ${err.message || err}`);
}

export const reverseRecords = (res) => {
    const reverseRecord = (
        Object.fromEntries(
            Object.entries(
                res.data
            )
            .reverse()
        )
    );

    res.data = reverseRecord;

    return res
}