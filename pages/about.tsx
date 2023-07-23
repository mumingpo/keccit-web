import * as React from 'react';
import { Title, Text, Box, List, Anchor } from '@mantine/core';

import Layout from '../components/Layout';
import { useHover } from '@mantine/hooks';

type Arrayable<T> = T | Array<T>;

function P(props: { children: Arrayable<string | JSX.Element> }) {
    const { children } = props;
    return (
        <Text m="md" style={{ textIndent: 30, }}>
            { children }
        </Text>
    );
}

function Stuff() {
    const { hovered, ref } = useHover();
    return (
        <Text
            component="span"
            c={ hovered ? 'dimmed' : undefined }
            td={ hovered ? 'line-through' : undefined }
            ref={ref}
        >
            { hovered ? 'potheads' : 'intelligent and extremely sophisticated beings' }
        </Text>
    );
}

function About(): JSX.Element {
    return (
        <Layout>
            <Box>
                <Title m="md" order={1}>
                    About
                </Title>
                <Title m="md" order={2}>
                    What is Keccit?
                </Title>
                <Anchor m="md" href="https://github.com/mumingpo/keccit-web">
                    View the source code on Github.
                </Anchor>
                <P>
                    Keccit is a service that &quot;notarizes&quot; the existence of a file
                    at a certain point in time and store the cryptographic proof on to
                    the Ethereum blockchain as a public record.

                    Keccit.com is made by mumingpo as a proof-of-concept serving as a basis
                    for the Perman project. Keccit.com is open-source and open-to-use under
                    the MIT license.
                </P>
                <Title m="md" order={2}>
                    How can Keccit be used?
                </Title>
                <P>
                    Keccit is intended to be used to notarize contemporaneous documents
                    at the time of an event to prove the existence of a document
                    at a certain point in time. This may assist in preserving evidence,
                    establishing authenticity, and combating forgery in specific applications.
                </P>
                <Title m="md" order={2}>
                    Sample use case
                </Title>
                <P>
                    Alice is hired for the daily upkeeping of Bob's front yard while
                    Bob is on vacation. Alice would need to keep for her record of
                    the daily states of the flower patches as a proof of her work.
                </P>
                <P>
                    Alice can take daily photographs as proof, but Bob may suspect that
                    Alice would forge all her photographs on a day when the lawn is healthy,
                    neglect the lawn for the whole vacation, and restore the lawn to a healthy
                    state right before Bob would return.
                </P>
                <P>
                    To prove that each photo is taken no earlier than noted date, Alice can simply
                    include the newspaper header on that date in the photograph.
                </P>
                <P>
                    To prove that each photo is taken no later than noted date, Alice can submit
                    the photo to Keccit, and a signature of her photograph would be stored onto the
                    Ethereum blockchain to prove that the photo existed on that date.
                </P>
                <Title m="md" order={2}>
                    Advantage over &quot;upload file to...&quot;
                </Title>
                <P>
                    You may ask, Google Drive, Instagram, etc. post timestamps on my uploaded files.
                    Why does anybody need a service like Keccit at all?
                    <List m="md" sx={{ textIndent: 20 }}>
                        <List.Item>
                            You don't need to upload the actual file at Keccit. Only the generated
                            hash signature is uploaded.
                        </List.Item>
                        <List.Item>
                            No matter how large your file, the price of notarizing one document is the same:
                            a one-time charge of approximately 0.08 USD in Ethers as of July 2023.
                            (the price incurred for storing 32 bytes of information on Ethereum network,
                            keccit.com does not charge anything.)
                        </List.Item>
                        <List.Item>
                            The proof lives permanently on the Ethereum blockchain, and any Ethereum node must
                            possess the capability of verifying your cryptographic proof for you. As long as
                            any of the crypto-minded&nbsp;
                            <Stuff />
                            &nbsp;still value their
                            Ethereum assets, the proof will be available to all.
                        </List.Item>
                    </List>
                </P>
                <Title m="md" order={2}>
                    How does Keccit work?
                </Title>
                <P>
                    Keccit is a utility that assists you in storing the Keccak-256 hash signature of your data to
                    a contract in Ethereum blockchain to be timestamped.
                </P>
                <Title m="md" order={3}>
                    Keccak-256
                </Title>
                <Text m="md" c="dimmed">
                    Learn more from&nbsp;
                    <Anchor href="https://csrc.nist.gov/projects/hash-functions">
                        NIST website
                    </Anchor>
                    &nbsp;or&nbsp;
                    <Anchor href="https://simple.wikipedia.org/wiki/Cryptographic_hash_function">
                        Wikipedia (Simple English)
                    </Anchor>
                    . 
                </Text>
                <P>
                    As the namesake of Keccit, Keccak-256 is a member of the &quot;Secure Hashing
                    Algorithm-3&quot; family approved by the NIST. A cryptographic hashing algorithm
                    takes an arbitrary input document and scrambles it to form a fixed-length
                    &quot;signature&quot;. A &quot;secure&quot; cryptographic hash algorithm
                    must satisfy the following properties:
                </P>
                <Title m="md" order={4}>
                    Can I engineer a file that would generate a given target hash?
                </Title>
                <P>
                    Not in a bajillion years (&quot;Computationally infeasible&quot;).
                    This property of a cryptographic hash algorithm is called
                    &quot;pre-image resistance&quot;.
                </P>
                <Title m="md" order={4}>
                    Can I alter a file while maintaining the same hash signature?
                </Title>
                <P>
                    Not in a bajillion years (&quot;Computationally infeasible&quot;).
                    This property of a cryptographic hash algorithm is called
                    &quot;second pre-image resistance&quot;.
                </P>
                <Title m="md" order={4}>
                    Can I find any two files that would share the same hash signature?
                </Title>
                <P>
                    Not in a bajillion years (&quot;Computationally infeasible&quot;).
                    This property of a cryptographic hash algorithm is called
                    &quot;collision resistance&quot;.
                </P>
                <Title m="md" order={3}>Ethereum blockchain</Title>
                <Text m="md" c="dimmed">
                    Learn more from&nbsp;
                    <Anchor href="https://ethereum.org/en/what-is-ethereum/">
                        the&nbsp;
                        <Stuff />
                        &nbsp;themselves
                    </Anchor>. 
                </Text>
                <P>
                    This topic is very complicated, so I will attempt to summarize only
                    the relevant parts:
                    <List m="md">
                        <List.Item>
                            The Ethereum blockchain is composed of &quot;transactions&quot;.
                        </List.Item>
                        <List.Item>
                            Transactions are what a computer would write down if its
                            elementary school teacher asks it to &quot;show your work&quot;.
                        </List.Item>
                        <List.Item>
                            Transactions are processed in &quot;blocks&quot;.
                        </List.Item>
                        <List.Item>
                            Transactions/blocks are stored publicly and permanently.
                        </List.Item>
                        <List.Item>
                            There is a financial incentive for the <Stuff /> to make sure
                            all previous transactions on the blockchain are done right, so
                            all blocks mined after the block containing your transaction would
                            vouch for your transaction&apos;s integrity.
                        </List.Item>
                        <List.Item>
                            Keccit stores your 32-byte hash in one of these transactions.
                        </List.Item>
                    </List>
                </P>
                <Title m="md" order={2}>
                    Additional safeguards provided by Keccit
                </Title>
                <Title m="md" order={3}>
                    Can anybody take my document and see whether if/when have I submitted it to Keccit?
                </Title>
                <P>
                    No. Keccit appends your data with a timestamp and a random nonce akin to a password.
                    This means that one must obtain the time and the password to access your proof. You
                    can see the details by opening your XXXXXX-proof.json with a text editor.
                </P>
            </Box>
        </Layout>
    );
}

export default About;
