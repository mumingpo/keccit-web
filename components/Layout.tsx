import * as React from 'react';
import {
    Center,
    Stack,
    Group,
    Title,
    Divider,
} from '@mantine/core';

type ComponentProps = {
    children: JSX.Element | JSX.Element[],
};

function Layout(props: ComponentProps): JSX.Element {
    const { children } = props;
    return (
        <Center>
            <Stack align="center" sx={{ width: '100%', maxWidth: 1200 }}>
                <Group
                    m="md"
                    spacing={0}
                    align="baseline"
                    sx={{ position: 'sticky', width: '100%' }}
                >
                <Title order={1} mx="md">Keccit</Title>
                </Group>
                <Divider mb="md" sx={{ width: '100%' }} />
                { children }
            </Stack>
        </Center>
    );
}

export default Layout;
