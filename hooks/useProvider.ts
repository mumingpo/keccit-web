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
        const MMSDK = new MetaMaskSDK();
        // HACK: MetaMask raises error if getProvider is called immediately
        // so keep trying to call it until things sorts out
        tryGetProvider({ setEthereum, sdk: MMSDK, retriesRemaining: MAX_RETRY });
        // P.S.: If your SDK requires 2 "// Hack: ..." to initialize
        // you are doing something seriously wrong.
    }, []);

    return ethereum;
}

export default useProvider;
