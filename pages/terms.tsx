import * as React from 'react';
import { Title, Text, Box } from '@mantine/core';

import Layout from '../components/Layout';

function Terms(): JSX.Element {
    return (
        <Layout>
            <Box>
                <Title m="md" order={1}>
                    Terms of Service
                </Title>
                <Text m="md">
                    This website is provided as-is and provides no warranties of any kind,
                    implicit or explicit. We do not condone the use of our service for illegal
                    activities. We are not liable for any damage caused by
                    the use of our product except in cases mandated by applicable law. We do not
                    seek to profit from user's activity on our site in any manner, so please
                    don't sue us for some random non-sense reason, deal? 
                </Text>
            </Box>
        </Layout>
    );
}

export default Terms;
