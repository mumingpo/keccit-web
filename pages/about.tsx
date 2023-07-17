import * as React from 'react';
import { Title, Text, Box } from '@mantine/core';

import Layout from '../components/Layout';

function About(): JSX.Element {
    return (
        <Layout>
            <Box>
                <Title m="md" order={1}>
                    About
                </Title>
                <Title m="md" order={2}>
                    Keccit
                </Title>
                <Text m="md">
                </Text>
            </Box>
        </Layout>
    );
}

export default About;
