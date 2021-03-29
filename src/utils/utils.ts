export const getDecimals = (number: number):number => {
    const decimals = (number + '').split('.');
    if (decimals[1] !== undefined) {
        return Number(decimals[1]);
    } else {
        return 0;
    }
}

export const validationMessage = (data: Array<any>): Array<string> => {
    let fields = [];
    data.forEach(element => {
        fields.push(element.path[element.path.length - 1]);
    });
    return fields;
};
