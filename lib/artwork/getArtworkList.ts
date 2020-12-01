const getArtworkList = async () => {
  const response = await fetch('http://localhost:3000/api/artwork');
  const { artworks } = await response.json();

  return artworks as Artwork[];
};
export default getArtworkList;
