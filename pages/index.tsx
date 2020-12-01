import React from 'react';
import styled from 'styled-components';
import ListItem from '../components/ListItem';

import { getArtworkList } from '@lib/artwork';

const Root = styled.div``;

interface Props {
  artworks: Artwork[];
}
const Home: React.FC<Props> = ({ artworks }) => {
  return (
    <Root>
      {artworks.map((artwork) => (
        <ListItem className="ListItem" artwork={artwork} key={artwork._id} />
      ))}
    </Root>
  );
};

export async function getStaticProps() {
  try {
    const artworks = await getArtworkList();

    return {
      props: {
        artworks,
      },
    };
  } catch (err) {
    return {
      props: {
        artworks: [],
      },
    };
  }
}

export default Home;
