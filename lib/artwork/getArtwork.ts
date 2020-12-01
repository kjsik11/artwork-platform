const getArtworkById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/artwork/${id}`);
  const { artwork } = await response.json();

  return artwork;
};

export default getArtworkById;
