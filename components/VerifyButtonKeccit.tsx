import * as React from 'react';
import { Button } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';

function VerifyButtonKeccit(): JSX.Element {
    return (
        <Button
            variant="light"
            color="gray"
            leftIcon={
                <IconWallet />
            }
        >
            Verify with Keccit
        </Button>
    );
}

export default VerifyButtonKeccit;
