import * as React from 'react';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Image from 'next/image';

import { SDKProvider } from '@metamask/sdk';

import MetaMaskLogo from '../public/static/metamask-fox.svg';

import MetaMaskOps from '../utils/MetaMaskOps';
import checkHash from '../utils/checkHash';

type ComponentProps = {
    fileHash: string,
    provider: SDKProvider | null,
};

function StorageButtonSelf(props: ComponentProps): JSX.Element {
    const { fileHash, provider } = props;
    const ops = new MetaMaskOps(provider);
    // https://docs.metamask.io/wallet/get-started/access-accounts/
    // "Always disable the connect button while the connection request is pending."
    const [disabled, setDisabled] = React.useState(false);

    const handleError = (error: Error & { code?: number }) => {
        setDisabled(false);
        console.error(error);
        notifications.show({
            title: 'Error while submitting request',
            message: error.message,
            color: 'red',
        });
    }

    const handleClick = async () => {
        setDisabled(true);
        const check = checkHash(fileHash);
        if (check !== '') {
            throw new Error(check);
        }
        const primaryAccount = await ops.getPrimaryAccount();
        try {
            await ops.switchEthereumChain();
        } catch (e: any) {
            if (e.code === 4902) {
                await ops.addEthereumChain();
            } else {
                throw e;
            }
        }

        const callback = (timestamp: number) => {
            notifications.show({
                title: 'A previous Storage operation has been mined',
                message: `Data ${fileHash} has appeared on the blockchain at ${(new Date(timestamp * 1000)).toLocaleString()}`,
                color: 'green',
                autoClose: false,
            })
        }

        await ops.sendTransaction({
            callback,
            data: fileHash,
            from: primaryAccount,
        });

        setDisabled(false);
    };

    return (
        <Button
            disabled={ disabled }
            variant="light"
            color="orange"
            leftIcon={
                <Image src={MetaMaskLogo} alt="MetaMask Fox Logo" />
            }
            onClick={ () => { handleClick().catch(handleError); } }
        >
            Store with MetaMask
        </Button>
    );
}

export default StorageButtonSelf;
