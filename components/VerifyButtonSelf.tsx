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

function VerifyButtonSelf(props: ComponentProps): JSX.Element {
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
        await ops.getPrimaryAccount();
        try {
            await ops.switchEthereumChain();
        } catch (e: any) {
            if (e.code === 4902) {
                await ops.addEthereumChain();
            } else {
                throw e;
            }
        }

        const timestamp = await ops.verifyTransaction(fileHash);

        if (timestamp === 0) {
            notifications.show({
                title: 'Verification failed',
                message: '',
                color: 'red',
            });
        } else {
            notifications.show({
                title: 'Verification succeeded',
                message: `${fileHash} was stored on the ${process.env.NEXT_PUBLIC_CHAIN_NAME} at ${(new Date(timestamp * 1000)).toLocaleString()}`,
                color: 'green',
            });
        }

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
            Verify with MetaMask
        </Button>
    );
}

export default VerifyButtonSelf;
