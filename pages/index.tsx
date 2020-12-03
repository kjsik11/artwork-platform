import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export default function Main() {
  const router = useRouter();

  return (
    <Root>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.push('/list');
        }}
      >
        List
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.push('/upload');
        }}
      >
        upload
      </Button>
    </Root>
  );
}
