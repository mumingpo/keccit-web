function bytesToStr(bytes: ArrayBuffer): string {
    const view = new Uint8Array(bytes);
    let str = '0x';

    view.forEach((val) => {
        let hex = val.toString(16);
        if (hex.length === 1) {
            hex = `0${hex}`;
        }

        str = `${str}${hex}`;
    });

    return str;
}

function strToBytes(str: string): ArrayBuffer {
    if (str.length % 2 !== 0) {
        throw new Error('strToBytes can only convert hexadecimal encoded byte string.');
    }

    const length = str.length / 2;
    const arr = new ArrayBuffer(length);
    const view = new Uint8Array(arr);

    for (let i = 0; i < length; i += 1) {
        const substr = str.slice(i * 2, i * 2 + 2);
        if (i === 0 && substr === '0x') {
            continue;
        }
        view[i] = Number.parseInt(substr, 16);
        if (Number.isNaN(view[i])) {
            throw new Error('strToBytes can only convert hexadecimal encoded byte string.')
        }
    }

    return arr;
}

export {
    bytesToStr,
    strToBytes,
};
