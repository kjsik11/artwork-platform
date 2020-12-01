import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { deleteArtworkById } from '@lib/artwork';

const Root = styled.div``;

interface Props {
  className: string;
  artwork: Artwork;
}
const ListItem: React.FC<Props> = ({ className, artwork, ...props }) => {
  const router = useRouter();
  const src = artwork.thumbUrl;

  return (
    <Root className={className} {...props}>
      <img src={src} alt={`thumb-${artwork.title}`} />
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
      <div>{artwork.name}</div>
      <div>{artwork.title}</div>
    </Root>
  );
};

export default ListItem;
