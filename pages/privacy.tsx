import * as React from 'react';
import { Title, Text, Box } from '@mantine/core';

import Layout from '../components/Layout';

function Privacy(): JSX.Element {
    return (
        <Layout>
            <Box>
                <Title m="md" order={1}>
                    Privacy Notice
                </Title>
                <Title m="md" order={2}>
                    Your data
                </Title>
                <Text m="md">
                    We do not maintain a database, nor do we collect any of your data for ourselves.
                    However, your data may be collected by external services for the following reasons:
                </Text>
                <Title m="md" order={3}>
                    Google Captcha
                </Title>
                <Text m="md">
                    We use Google Captcha to protect our service from abuse. Your anonymized activity
                    on our website may be tracked and collected by Google.
                </Text>
                <Title m="md" order={3}>
                    Vercel
                </Title>
                <Text m="md">
                    We use Vercel to host this website. Your usage analytics may be collected by them.
                </Text>
                <Title m="md" order={3}>
                    Data on blockchains
                </Title>
                <Text m="md">
                    The purpose of our service is to assist users in storing data onto the Ethereum
                    blockchain. Data stored on blockchain are public and practically permanent,
                    which is sort of the point. We do not have any influence or capacity to alter
                    or delete any data once they have been commited onto a blockchain.

                    However, we strive to protect user&apos;s privacy by hashing their data and introduce
                    additional security measures like random nonces. As there are no known perspective
                    way to reverse secure hashing algorithms like keccak256, we believe that these measures
                    are more than sufficient to keep user&apos;s data from abuse.
                </Text>
            </Box>
        </Layout>
    );
}

export default Privacy;
