import { useState, useRef } from 'react';
import Head from 'next/head'

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss'

export default function Home() {
  const [action, setAction] = useState();

  const timerRef = useRef();
  const isLongPress = useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('longpress');
    }, 500)
  }

  function handleOnClick(e) {
    console.log('handleOnClick');
    if ( isLongPress.current ) {
      console.log('Is long press - not continuing.');
      return;
    }
    setAction('click')
  }

  function handleOnMouseDown() {
    console.log('handleOnMouseDown');
    startPressTimer();
  }

  function handleOnMouseUp() {
    console.log('handleOnMouseUp');
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    console.log('handleOnTouchStart');
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if ( action === 'longpress' ) return;
    console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current);
  }

  return (
    <Layout>
      <Head>
        <title>Click or Press</title>
        <meta name="description" content="Click or press the button!" />
      </Head>

      <Container className={styles.homeContainer}>
        <h1>Click or Press!</h1>

        <p>
          <Button
            onClick={handleOnClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
          >
            Click or Press Me
          </Button>
          <Button data-color="gray" onClick={() => setAction(undefined)}>
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