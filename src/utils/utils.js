function countDecimals(number){
    const decimals = (number + '').split('.');
    if (decimals[1] !== undefined) {
        return decimals[1].length;
    } else {
        return 0;
    }
}

function validationMessage(data) {
    let fields = [];
    data.forEach(element => {
        fields.push(element.path[element.path.length - 1]);
    });
    return fields;
};

module.exports = {
    countDecimals,
    validationMessage
};