function checkHash(s: string): string {
    const pattern = /^(?:0x)?[0-9a-fA-F]{64}$/;
    return pattern.test(s)
        ? ''
        : 'Hash must be a hex string encoding 32 bytes.';
}

export default checkHash;
