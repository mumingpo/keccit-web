import * as React from 'react';
import { Title, Text, Box } from '@mantine/core';

import Layout from '../components/Layout';

function Cookies(): JSX.Element {
    return (
        <Layout>
            <Box>
                <Title m="md" order={1}>
                    Cookies
                </Title>
                <Text m="md">
                    We store a minimum set of cookies in your browser to help
                    you prevent data loss and stuff. We will not be tracking
                    users to provide you with flavorful ads reflecting your
                    interests. If you object to the use of any cookies, please stop
                    using this website immediately, clear all cookies and cache,
                    turn off your computer, and yell at the wall all day.
                    Honestly I don't even know why am I writing this. Want an
                    actually good cookie recipe instead?
                </Text>
            </Box>
        </Layout>
    );
}

export default Cookies;
