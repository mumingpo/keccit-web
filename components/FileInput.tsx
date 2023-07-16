import * as React from 'react';
import { Center } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

import hash from '../utils/hash';
import { bytesToStr } from '../utils/bytesIO';

type ComponentProps = {
    setFileHash: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    openRef: React.RefObject<(() => void) | null>,
};

function FileInput(props: ComponentProps): JSX.Element {
    const { setFileHash, setLoading, openRef } = props;

    const fileOp = (file: Blob) => {
        setLoading(true);
        const reader = new FileReader();
        reader.onload = () => {
            const { result } = reader;
            if (result === null || typeof result === 'string') {
                return;
            }

            hash(result).then((val) => {
                setFileHash(bytesToStr(val));
                setLoading(false);
            });
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <Dropzone.FullScreen
            onDrop={(files) => {
                if (files.length === 0) {
                    return;
                }
                fileOp(files[0]);
            }}
            multiple={false}
            activateOnClick={false}
            openRef={openRef}
        >
            <Center sx={{
                width: '100%',
                height: '100vh',
            }}>
                Drop file over here to generate hash.
            </Center>
        </Dropzone.FullScreen>
    );
}

export default FileInput;
