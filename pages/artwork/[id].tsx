import React from 'react';
import styled from 'styled-components';
import { getArtworkById } from '@lib/artwork';

const Root = styled.div``;

export default function Detail({ artwork }: { artwork: Artwork | null }) {
  if (!artwork) return <div>not found</div>;
  return (
    <Root>
      <img src={artwork.url} />
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
