import * as React from 'react';
import { Group, LoadingOverlay } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import FileInput from '../components/FileInput';
import HashInput from '../components/HashInput';
import Layout from '../components/Layout';
import KeccitTabs from '../components/KeccitTabs';
import StorageButtonSelf from '../components/StorageButtonSelf';
import StorageButtonKekkit from '../components/StorageButtonKeccit';
import VerifyButtonSelf from '../components/VerifyButtonSelf';
import VerifyButtonKeccit from '../components/VerifyButtonKeccit';
import useProvider from '../hooks/useProvider';

function IndexPage() {
    const [loading, setLoading] = React.useState(false);
    const [service, toggleService] = useToggle(['store', 'hash', 'verify']);
    const [fileHash, setFileHash] = React.useState('');
    const ethereum = useProvider();
    const openFileExplorerRef = React.useRef<() => void>(null);

    const hashInput = (
        <HashInput
            fileHash={fileHash}
            setFileHash={setFileHash}
            openFileExplorerRef={openFileExplorerRef}
        />
    );

    const storageButtons = (
        <Group my="md" position="center">
            <StorageButtonSelf fileHash={fileHash} provider={ethereum} />
            <StorageButtonKekkit />
        </Group>
    );
    
    const verifyButtons = (
        <Group my="md" position="center">
            <VerifyButtonSelf fileHash={fileHash} provider={ethereum} />
            <VerifyButtonKeccit />
        </Group>
    );

    return (
        <Layout>
            <LoadingOverlay visible={ loading } />
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
                    { storageButtons }
                </> }
                hashPanel={ <>
                    { hashInput }
                </> }
                verifyPanel={ <>
                    { hashInput }
                    { verifyButtons }
                </> }
            />
        </Layout>
    );
}

export default IndexPage;
