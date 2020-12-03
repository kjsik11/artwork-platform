import React from 'react';
import styled from 'styled-components';
import ListItem from '../components/ListItem';
import { getArtworkList } from '@lib/artwork';
import Link from 'next/link';

const Root = styled.div`
  .artbox {
    max-width: 80%;
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
  .logo {
    text-decoration: none;
    color: #000;
    font-size: 5rem;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .logoBox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    text-align: center;
    border: 1px solid #000;
    border-radius: 10px;
    margin: 10px 10px 50px 10px;
  }
`;

interface Props {
  artworks: Artwork[];
}
const Home: React.FC<Props> = ({ artworks }) => {
  return (
    <Root>
      <div className="logoBox">
        <Link href="/">
          <a className="logo">ART WORK</a>
        </Link>
      </div>
      <div className="artbox">
        {artworks.map((artwork) => (
          <ListItem className="ListItem" artwork={artwork} key={artwork._id} />
        ))}
      </div>
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
      revalidate: 1,
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
