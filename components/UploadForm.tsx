import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Root = styled.div`
  #file {
    display: none;
  }
  .filebox {
    margin: 10px 0;
    height: 30px;
  }
`;

interface Props {
  className?: string;
}
const UploadForm: React.FC<Props> = ({ className, ...props }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [myFile, setMyFile] = React.useState<File | null>(null);
  const [artwork, setArtwork] = React.useState<ArtworkForm>({
    title: '',
    name: '',
    material: '',
    year: '',
    width: '',
    height: '',
  });
  const refFileInput = React.useRef<HTMLInputElement>(null);

  const handleSubmit = React.useCallback(async () => {
    const formdata = new FormData();
    if (!myFile) return;
    if (!artwork.title || !artwork.name || !artwork.material) {
      return;
    }
    formdata.append('image', myFile);
    formdata.append('title', artwork.title);
    formdata.append('name', artwork.name);
    formdata.append('material', artwork.material);

    if (artwork.year) formdata.append('year', artwork.year);
    if (artwork.width) formdata.append('width', artwork.width);
    if (artwork.height) formdata.append('height', artwork.height);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/artwork/', {
        method: 'POST',
        body: formdata,
      });
      const resJson = await response.json();
      console.log(resJson);
      setLoading(false);
    } catch (err) {
      console.log('error', err);
    }
  }, [myFile, artwork]);

  return (
    <Root className={className} {...props}>
      <input
        ref={refFileInput}
        type="file"
        id="file"
        onChange={(e) => {
          // setName(e.target.name);
          // setSelectFile(e.target.files[0]);
          // console.log(e.target.name);
          if (e.target.files) setMyFile(e.target.files[0]);
        }}
      />

      <div>
        <TextField
          id="standard-basic"
          label="Title"
          onChange={(e) => {
            setArtwork({
              ...artwork,
              title: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Name"
          onChange={(e) => {
            setArtwork({
              ...artwork,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Material"
          onChange={(e) => {
            setArtwork({
              ...artwork,
              material: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Year"
          onChange={(e) => {
            setArtwork({
              ...artwork,
              year: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="width"
          onChange={(e) => {
            setArtwork({
              ...artwork,
              width: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="height"
          onChange={(e) => {
            setArtwork({
              ...artwork,
              height: e.target.value,
            });
          }}
        />
      </div>
      <div className="filebox">File: {myFile && myFile.name} </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => refFileInput.current?.click()}
      >
        select file
      </Button>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
          disabled={loading}
        >
          submit
        </Button>
      </div>
    </Root>
  );
};

export default UploadForm;
