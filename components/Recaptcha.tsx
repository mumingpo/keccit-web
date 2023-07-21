import * as React from 'react';
import { Box } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import ReCAPTCHA from 'react-google-recaptcha';

type ComponentProps = {
    callback: (token: string) => void,
    close: () => void,
    x: number,
    y: number,
};

function Recaptcha(props: ComponentProps) {
    const { callback, close, x, y } = props;
    const ref = useClickOutside(() => { close(); });

    return (
        <Box
            sx={{ position: 'absolute', left: x, top: y }}
            ref={ref}
        >
            <ReCAPTCHA
                sitekey={ process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY ?? '' }
                onChange={(token) => {
                    if (!token) {
                        return;
                    }
                    setTimeout(close, 2000);
                    callback(token);
                }}
            />
        </Box>
    );
}

export default Recaptcha;
