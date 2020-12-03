import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px auto;
  height: 100%;
  .buttonBox {
    margin: 10px;
  }
`;

export default function Main() {
  const router = useRouter();

  return (
    <Root>
      <div className="buttonBox">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            router.push('/list');
          }}
        >
          List
        </Button>
      </div>
      <div className="buttonBox">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            router.push('/upload');
          }}
        >
          upload
        </Button>
      </div>
    </Root>
  );
}
