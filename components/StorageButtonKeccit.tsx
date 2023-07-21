import * as React from 'react';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications'; // temp
import { IconWallet } from '@tabler/icons-react';

import Recaptcha from './Recaptcha';
import { store } from '../utils/KeccitWalletOps';

type ComponentProps = {
    hash: string,
};

function StorageButtonKekkit(props: ComponentProps): JSX.Element {
    const { hash } = props;
    const [recaptchaElem, setRecaptchaElem] = React.useState<JSX.Element | null>(null);

    const onClick: React.MouseEventHandler = (e) => {
        setRecaptchaElem((
            <Recaptcha
                x={ e.clientX }
                y={ e.clientY }
                callback={ (token) => {
                    notifications.show({ message: token });
                    store({ hash, token });
                } }
                close={ () => { setRecaptchaElem(null); } }
            />
        ));
    };

    return (
        <>
            <Button
                variant="light"
                color="gray"
                leftIcon={
                    <IconWallet />
                }
                onClick={ onClick }
            >
                Store with Keccit
            </Button>
            { recaptchaElem }
        </>
    );
}

export default StorageButtonKekkit;
