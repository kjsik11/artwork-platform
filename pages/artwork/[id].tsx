import React from 'react';
import styled from 'styled-components';
import { getArtworkById } from '@lib/artwork';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const Root = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin: 30px 0;
    width: 30%;
    height: auto;
    border-radius: 10px;
  }
  .detailBox {
    margin-bottom: 30px;
    width: 30%;
    border: 1px solid #000;
    border-radius: 10px;
  }
  .detail-titlebox {
    border-bottom: 1px solid #000;
  }
  .detail-title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0 5px 5px 5px;
  }
  .detail-mainbox {
    margin: 5px 0;
  }
  .detail-main {
    margin-left: 5px;
  }
  .buttonBox {
    margin-bottom: 30px;
  }
`;

export default function Detail({ artwork }: { artwork: Artwork | null }) {
  const router = useRouter();
  if (!artwork) return <div>not found</div>;
  return (
    <Root>
      <img src={artwork.url} />
      <div className="detailBox">
        <div className="detail-titlebox">
          <div className="detail-title">detail</div>
        </div>
        <div className="detail-mainbox">
          <div className="detail-main">{artwork.title}</div>
          <div className="detail-main">{artwork.name}</div>
          <div className="detail-main">{artwork.material}</div>
          <div className="detail-main">
            size : {artwork.width} x {artwork.height}
          </div>
        </div>
      </div>
      <div className="buttonBox">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push('/list');
          }}
        >
          To List
        </Button>
      </div>
    </Root>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const artwork = await getArtworkById(params.id);

    return {
      props: { artwork },
      revalidate: 1,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        artwork: null,
      },
    };
  }
}
