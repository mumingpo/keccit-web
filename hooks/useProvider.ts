import * as React from 'react';
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';

function useProvider() {
    const [ethereum, setEthereum] = React.useState<null | SDKProvider>(null);

    React.useEffect(() => {
        // HACK: MetaMask is not set up for NextJs prerendering,
        // so putting generation in useEffect hook to bypass it.
        const MMSDK = new MetaMaskSDK({
            dappMetadata: {
            },
            logging: {
                developerMode: true,
            },
        });

        // https://github.com/MetaMask/metamask-sdk/issues/224
        MMSDK.init().then(() => {
            setEthereum(MMSDK.getProvider());
        });
    }, []);

    return ethereum;
}

export default useProvider;
