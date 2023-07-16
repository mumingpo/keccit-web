import * as React from 'react';
import { Button } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';

function StorageButtonKekkit(): JSX.Element {
    return (
        <Button
            variant="light"
            color="gray"
            leftIcon={
                <IconWallet />
            }
        >
            Submit with Keccit
        </Button>
    );
}

export default StorageButtonKekkit;
