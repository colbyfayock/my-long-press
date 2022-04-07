import { useState, useRef } from 'react';
import Head from 'next/head'

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import useLongPress from '@hooks/use-long-press';

import styles from '@styles/Home.module.scss'

export default function Home() {
  const { action, handlers } = useLongPress();
  const { action: otherAction, handlers: otherHandlers } = useLongPress();

  return (
    <Layout>
      <Head>
        <title>Click or Press</title>
        <meta name="description" content="Click or press the button!" />
      </Head>

      <Container className={styles.homeContainer}>
        <h1>Click or Press!</h1>

        <p>
          <Button {...handlers}>
            Click or Press Me
          </Button>
          <Button data-color="gray" {...otherHandlers}>
            Reset
          </Button>
        </p>

        <h2>What you did to the button...</h2>

        <p className={styles.clickAction}>
          {!action && (
            <>
              <strong>Nothing</strong>
              <img width="356" src="/images/fry-not-sure.jpg" />
            </>
          )}

          {action === 'click' && (
            <>
              <strong>Click</strong>
              <img width="356" src="/images/fry-celebrating.gif" />
            </>
          )}

          {action === 'longpress' && (
            <>
              <strong>Long Press</strong>
              <img width="356" src="/images/fry-dancing.gif" />
            </>
          )}
        </p>

      </Container>
    </Layout>
  )
}