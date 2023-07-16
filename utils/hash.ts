import { keccak256 } from 'ethereum-cryptography/keccak';
import { bytesToStr } from './bytesIO';

async function hash(arr: ArrayBuffer, algorithm: 'sha256' | 'keccak256'='keccak256') {
    let result: ArrayBuffer;
    const beginTime = new Date();
    if (algorithm === 'sha256') {
        try {
            const { subtle } = globalThis.crypto;
            result = await subtle.digest('SHA-256', arr);
        } catch {
            const { subtle } = await import('crypto');
            result = await subtle.digest('SHA-256', arr);
        }
    } else {
        // FIXME: ethereum-cryptography/keccak runs in javascript
        // and is extremely slow for large files (~1s/20MB on i9-13900k)
        // use some sort of web-assembly alternative in the future
        result = keccak256(new Uint8Array(arr));
    }
    const endTime = new Date();
    console.log(`
        algorithm: ${algorithm},
        digest: ${bytesToStr(result)},
        bytes processed: ${arr.byteLength},
        time elapsed: ${(endTime.valueOf() - beginTime.valueOf()) / 1000}s
    `);
    return result;
}

export default hash;
