"use strict";
exports.dateString = (isoDdate) => {
    const date = new Date(isoDdate);
    return date.toISOString().substr(0, 10);
};
