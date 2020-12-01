const deleteArtworkById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/artwork/${id}`, {
    method: 'DELETE',
  });
  const { result } = await response.json();

  return result;
};

export default deleteArtworkById;
