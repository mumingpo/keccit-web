import { notifications } from '@mantine/notifications';
import { SDKProvider } from '@metamask/sdk';
import Web3, { eth, utils } from 'web3';


const abi = [
    {
        'anonymous': false,
        'inputs': [
            { 'indexed': true, 'internalType': 'uint256', 'name': 'data', 'type': 'uint256'},
            { 'indexed': false, 'internalType': 'uint256', 'name': 'time', 'type': 'uint256'},
        ],
        'name': 'DataStored',
        'type': 'event',
    },
    {   
        'inputs': [{'internalType': 'uint256', 'name': '_data', 'type': 'uint256'}],
        'name': 'get',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view',
        'type': 'function',
    },
    {   
        'inputs': [{'internalType': 'uint256', 'name': '_data', 'type': 'uint256'}],
        'name': 'put',
        'outputs': [],
        'stateMutability': 'nonpayable',
        'type': 'function',
    },
] as const;

class MetaMaskOps {
    provider: SDKProvider | null;

    constructor(provider: SDKProvider | null) {
        this.provider = provider;
    }

    async getPrimaryAccount(): Promise<string> {
        if (this.provider === null) {
            throw new Error('MetaMask provider not initialized.');
        }
        const accounts = await this.provider.request<Array<string>>({
            method: 'eth_requestAccounts',
        });

        if (accounts === null || accounts === undefined) {
            throw new Error('getAccounts() failed to obtain a list of accounts.');
        }

        const primaryAccount = accounts[0];

        if (primaryAccount === undefined) {
            throw new Error('User has no accounts associated with MetaMask.');
        }

        return primaryAccount;
    }

    async switchEthereumChain(): Promise<void> {
        if (this.provider === null) {
            throw new Error('MetaMask provider not initialized.');
        }
        await this.provider.request<null>({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID }],
        });
    }

    async addEthereumChain(): Promise<void> {
        if (this.provider === null) {
            throw new Error('MetaMask provider not initialized.');
        }
        await this.provider.request<null>({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
                chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
                nativeCurrency: {
                    name: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_NAME,
                    symbol: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_SYMBOL,
                    decimals: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_DECIMALS,
                },
                rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
            }],
        });
    }

    async sendTransaction(args: {
        from: string,
        data: string,
        callback: (t: number) => void,
    }) {
        const { data, from, callback } = args;
        if (this.provider === null) {
            throw new Error('MetaMask provider not initialized.');
        }

        const bn = utils.toBigInt(data);

        const web3js = new Web3(this.provider);
        const storageContract = new web3js.eth.Contract(
            abi,
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        );
        
        storageContract.events.DataStored({ filter: { data: bn } }).on('data', (e) => {
            const timestamp = e.returnValues['time'] as ReturnType<(typeof utils.toBigInt)>;
            // FIXME: am i stupid, or is this really the only way to convert BigInt to number
            callback(Number.parseInt(timestamp.toString(), 10));
        });
        await storageContract.methods.put(bn).send({ from });

        notifications.show({
            title: 'Transaction sent',
            message: `Your Storage request has been sent to the ${process.env.NEXT_PUBLIC_CHAIN_NAME} network.`,
            color: 'blue',
        });
    }

    async verifyTransaction(data: string) {
        if (this.provider === null) {
            throw new Error('MetaMask provider not initialized.');
        }
        
        const bn = utils.toBigInt(data);

        const web3js = new Web3(this.provider);
        const storageContract = new web3js.eth.Contract(
            abi,
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        );

        try {
            const timestamp = await storageContract.methods.get(bn).call();

            return Number.parseInt(timestamp.toString(), 10);
        } catch {
            // FIXME: differentiate between network error
            // and revert due to failed "require()"
            return 0;
        }
    }
    
}

export default MetaMaskOps;
