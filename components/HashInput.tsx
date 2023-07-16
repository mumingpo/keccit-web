import * as React from 'react';
import { Textarea, ActionIcon } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';

function checkHash(s: string): string {
    const pattern = /^(?:0x)?[0-9a-fA-F]{64}$/;
    return pattern.test(s)
        ? ''
        : 'Hash must be a hex string encoding 32 bytes.';
}

type ComponentProps = {
    fileHash: string,
    setFileHash: React.Dispatch<React.SetStateAction<string>>,
    openFileExplorerRef: React.RefObject<(() => void) | null>,
}

function HashInput(props: ComponentProps): JSX.Element {
    const { fileHash, setFileHash, openFileExplorerRef } = props;

    return (
        <Textarea
            withAsterisk
            autosize
            error={ checkHash(fileHash) }
            mx="xl"
            label="data hash"
            placeholder="Drag file over here to generate hash"
            value={fileHash}
            onChange={(e) => { setFileHash(e.target.value); }}
            rightSection={
                <ActionIcon
                    aria-label="select file"
                    onClick={() => {
                        if (openFileExplorerRef.current !== null) {
                            openFileExplorerRef.current();
                        }
                    }}
                >
                    <IconFile />
                </ActionIcon>
            }
        />
    );
}

export default HashInput;
