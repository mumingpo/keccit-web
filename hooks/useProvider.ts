import * as React from 'react';
import { notifications } from '@mantine/notifications';
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';
const MAX_RETRY = 10;

type FunctionProps = {
    sdk: MetaMaskSDK,
    setEthereum: React.Dispatch<React.SetStateAction<null | SDKProvider>>,
    retriesRemaining: number,
};

function tryGetProvider(props: FunctionProps) {
    const { sdk, setEthereum, retriesRemaining } = props;
    try {
        setEthereum(sdk.getProvider());
    } catch (e) {
        if (retriesRemaining <= 0) {
            const errorString = 'Cannot initialize MetaMask SDK. Certain functions may be unavailable.';
            notifications.show({
                title: 'MAX_RETRY on MetaMaskSDK.getProvider() reached',
                message: errorString,
                color: 'red',
            });
            console.error(errorString);
            console.error(e);
            return;
        }
        setTimeout(() => {
            tryGetProvider({
                sdk,
                setEthereum,
                retriesRemaining: retriesRemaining - 1,
            });
        }, 200);
    }
}

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
        // HACK: MetaMask raises error if getProvider is called immediately
        // so keep trying to call it until things sorts out
        tryGetProvider({ setEthereum, sdk: MMSDK, retriesRemaining: MAX_RETRY });
        // import('@metamask/sdk').then(({ MetaMaskSDK }) => {
        //     // HACK: MetaMask is not set up for NextJs prerendering,
        //     // so putting generation in useEffect hook to bypass it.
        //     const MMSDK = new MetaMaskSDK({
        //         dappMetadata: {
        //         },
        //         enableDebug: true,
        //         preferDesktop: true,
        //         logging: {
        //             developerMode: true,
        //         },
        //     });

        //     return MMSDK;
        // }).then((sdk) => {
        //     // HACK: MetaMask raises error if getProvider is called immediately
        //     // so keep trying to call it until things sorts out
        //     tryGetProvider({ setEthereum, sdk, retriesRemaining: MAX_RETRY });
        // });
    }, []);

    return ethereum;
}

export default useProvider;
