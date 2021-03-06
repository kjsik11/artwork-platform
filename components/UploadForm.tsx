import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  #file {
    display: none;
  }
  .uploadBox {
    text-align: center;
    width: 213px;
  }
  .inputBox {
    input {
    }
  }
  .filebox {
    width: 100%;
    margin: 10px 0;
    height: 30px;
    text-align: left;
  }
  .top-buttonBox {
    display: flex;
    margin: 5px 0;
  }
  .bottom-buttonBox {
    text-align: right;
  }
  .selectButton {
    text-align: right;
  }
  .errorBox {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
  }
`;

interface Props {
  className?: string;
}
const UploadForm: React.FC<Props> = ({ className, ...props }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [myFile, setMyFile] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<string>('');
  const [fileResult, setFileResult] = React.useState<string>('');
  const inputProps = {
    fullWidth: true,
  };
  const [artwork, setArtwork] = React.useState<ArtworkForm>({
    title: '',
    name: '',
    material: '',
    year: '',
    width: '',
    height: '',
  });
  const refFileInput = React.useRef<HTMLInputElement>(null);

  const clearPage = React.useCallback(() => {
    setMyFile(null);
    setArtwork({
      title: '',
      name: '',
      material: '',
      year: '',
      width: '',
      height: '',
    });
    setLoading(false);
    setFileResult('');
    setResult('');
  }, []);
  const handleSubmit = React.useCallback(async () => {
    const formdata = new FormData();
    if (!myFile) return setFileResult('Please input File');
    if (!artwork.title || !artwork.name || !artwork.material) {
      return setResult('Please fill in the title, name, material blanks');
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
      clearPage();
    } catch (err) {
      console.log('error', err);
    }
  }, [myFile, artwork, clearPage]);

  return (
    <Root className={className} {...props}>
      <div className="uploadBox">
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

        <div className="inputBox">
          <TextField
            label="Title"
            value={artwork.title}
            onChange={(e) => {
              setArtwork({
                ...artwork,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div className="inputBox">
          <TextField
            label="Name"
            value={artwork.name}
            onChange={(e) => {
              setArtwork({
                ...artwork,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="inputBox">
          <TextField
            label="Material"
            value={artwork.material}
            onChange={(e) => {
              setArtwork({
                ...artwork,
                material: e.target.value,
              });
            }}
          />
        </div>
        <div className="inputBox">
          <TextField
            label="Year"
            value={artwork.year}
            onChange={(e) => {
              setArtwork({
                ...artwork,
                year: e.target.value,
              });
            }}
          />
        </div>
        <div className="inputBox">
          <TextField
            label="width"
            value={artwork.width}
            inputProps={inputProps}
            onChange={(e) => {
              setArtwork({
                ...artwork,
                width: e.target.value,
              });
            }}
          />
        </div>
        <div className="inputBox">
          <TextField
            label="height"
            value={artwork.height}
            onChange={(e) => {
              setArtwork({
                ...artwork,
                height: e.target.value,
              });
            }}
          />
        </div>
        <div className="filebox">File: {myFile ? myFile.name : fileResult}</div>
        <div className="top-buttonBox">
          <div className="selectButton">
            <Button
              variant="contained"
              color="primary"
              onClick={() => refFileInput.current?.click()}
            >
              select file
            </Button>
          </div>
          <div className="submitButton">
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
        </div>
        <div className="bottom-buttonBox">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              router.push('/');
            }}
          >
            main
          </Button>
        </div>
        <div className="errorBox">{result}</div>
      </div>
    </Root>
  );
};

export default UploadForm;
