import * as React from 'react';
import { LoadingOverlay } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';
import FileInput from '../components/FileInput';
import HashInput from '../components/HashInput';
import Layout from '../components/Layout';
import KeccitTabs from '../components/KeccitTabs';

const MAX_RETRY = 10;

function IndexPage() {
    const [loading, setLoading] = React.useState(false);
    const [ethereum, setEthereum] = React.useState<null | SDKProvider>(null);
    const [service, toggleService] = useToggle(['store', 'hash', 'verify']);
    const [fileHash, setFileHash] = React.useState('');
    const openFileExplorerRef = React.useRef<() => void>(null);

    React.useEffect(() => {
        // HACK: MetaMask is not set up for NextJs prerendering,
        // so putting generation in useEffect hook to bypass it.
        const MMSDK = new MetaMaskSDK();
        // HACK: MetaMask raises error if getProvider is called immediately
        // so keep trying to call it until things sorts out
        const tryGetProvider = (retry: number) => {
            try {
                setEthereum(MMSDK.getProvider());
            } catch (e) {
                if (retry <= 0) {
                    console.error('MetaMaskSDK.getProvider()s keep throwing errors, maximum retry count reached.');
                    console.error(e);
                    return;
                }
                setTimeout(() => {
                    tryGetProvider(retry - 1);
                }, 200);
            }
        };

        tryGetProvider(MAX_RETRY);
        // P.S.: If your SDK requires 2 "// Hack: ..." to initialize
        // you are doing something seriously wrong.
    }, []);

    const hashInput = (
        <HashInput
            fileHash={fileHash}
            setFileHash={setFileHash}
            openFileExplorerRef={openFileExplorerRef}
        />
    );

    return (
        <Layout>
            <LoadingOverlay visible={ ethereum ? loading : true } />
            <FileInput
                setFileHash={setFileHash}
                setLoading={setLoading}
                openRef={openFileExplorerRef}
            />
            <KeccitTabs
                service={service}
                toggleService={toggleService}
                storePanel={ <>
                    { hashInput }
                </> }
                hashPanel={ <>
                    { hashInput }
                </> }
                verifyPanel={ <>
                    { hashInput }
                </> }
            />
        </Layout>
    );
}

export default IndexPage;
