async function getBalance(args: { token: string }) {
    const { token } = args;

}

async function store(args: { hash: string, token: string }) {
    const { hash, token } = args;

}

async function verify(args: { hash: string, token: string }) {
    const { hash, token } = args;

}

export {
    getBalance,
    store,
    verify
};
