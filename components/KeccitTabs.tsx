import * as React from 'react';
import { Tabs, Text } from '@mantine/core';
import { IconBoxSeam, IconHash, IconCheckbox } from '@tabler/icons-react';

type Elem = JSX.Element | Array<JSX.Element>;

type ComponentProps = {
    service: string,
    toggleService: (s?: string) => void,
    storePanel: Elem,
    hashPanel: Elem,
    verifyPanel: Elem,
};

function KeccitTabs(props: ComponentProps): JSX.Element {
    const {
        service,
        toggleService,
        storePanel,
        hashPanel,
        verifyPanel,
    } = props;
    return (
        <Tabs
            value={service}
            onTabChange={(val) => { toggleService(val ?? 'store'); }}
            variant="pills"
            styles={{
                root: {
                    width: '100%',
                },
                tabsList: {
                    width: '100%',
                    justifyContent: 'center',
                },
            }}
        >
            <Tabs.List>
                <Tabs.Tab value="store" icon={ <IconBoxSeam /> } color="blue">
                    <Text size="lg">Store</Text>
                </Tabs.Tab>
                <Tabs.Tab value="hash" icon={ <IconHash /> } color="cyan">
                    <Text size="lg">Hash</Text>
                </Tabs.Tab>
                <Tabs.Tab value="verify" icon={ <IconCheckbox /> } color="teal">
                    <Text size="lg">Verify</Text>
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="store">
                { storePanel }
            </Tabs.Panel>
            <Tabs.Panel value="hash">
                { hashPanel }
            </Tabs.Panel>
            <Tabs.Panel value="verify">
                { verifyPanel }
            </Tabs.Panel>
        </Tabs>
    );
}

export default KeccitTabs;
