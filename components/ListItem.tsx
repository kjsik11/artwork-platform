import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { deleteArtworkById } from '@lib/artwork';

const Root = styled.div`
  text-align: center;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
`;

interface Props {
  className: string;
  artwork: Artwork;
}
const ListItem: React.FC<Props> = ({ className, artwork, ...props }) => {
  const router = useRouter();
  const src = artwork.thumbUrl;

  return (
    <Link href={`/artwork/${artwork._id}`}>
      <Root className={className} {...props}>
        <img src={src} alt={`thumb-${artwork.title}`} />

        <div>{artwork.title}</div>
        <div>{artwork.name}</div>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await deleteArtworkById(artwork._id);
            router.reload();
          }}
        >
          delete
        </Button>
      </Root>
    </Link>
  );
};

export default ListItem;
