import React, { useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import './styles.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SVGBackground from './SVGBackground.tsx';
import { renderToString } from 'react-dom/server';

interface DataItem {
  names: string[];
}

const Home = () => {
  const svgString = renderToString(<SVGBackground />);
  const [usage, setUsage] = useState<string>('');
  const [data, setData] = useState<DataItem | null>(null);
  const [gender, setGender] = useState('F');
  const [number, setNumber] = useState('1');
  const key = 'pe839753942';

  const namesSelect = {
    eng: 'Inglês',
    ita: 'Italiano',
    fre: 'Francês',
    por: 'Português',
    afr: 'Africano',
    spa: 'Espanhol',
  };

  const handleSearchClick = () => {
    fetch(`https://www.behindthename.com/api/random.json?number=${number}&usage=${usage}&gender=${gender}&key=${key}`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.log(error));
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleNumberChange = (value: string) => {
    setNumber(value);
  };

  const handleChange = (event: SelectChangeEvent<typeof usage>) => {
    const {
      target: { value },
    } = event;
    setUsage(value);
  };

  const ITEM_HEIGHT = 24;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const genders = [
    { label: 'Female', value: 'F' },
    { label: 'Male', value: 'M' },
  ];

  const isSearchDisabled = !usage;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svgString)}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid sx={{ p: 2, pt: 5, textAlign: 'center' }}>
        <h1 style={{ color: '#333333' }}>Encontre o nome perfeito para seu bebê...</h1>
      </Grid>
      <Grid container sx={{ p: 2 }}>
        <Grid item md={6} container justifyContent="center" sx={{ mb: 2 }}>
          {genders.map((genderOption) => {
            const isOptionSelected = gender === genderOption.value;
            return (
              <Chip
                key={genderOption.value}
                label={genderOption.label}
                color={isOptionSelected ? 'secondary' : 'default'}
                variant="outlined"
                onClick={() => handleGenderChange(genderOption.value)}
                sx={{
                  m: 1,
                  p: 2,
                  fontSize: '20px',
                  borderColor: 'gray',
                  backgroundColor: isOptionSelected ? 'gray' : '',
                  color: isOptionSelected ? 'white' : '',
                }}
              />
            );
          })}
        </Grid>
        <Grid item md={6} container justifyContent="center" sx={{ mb: 2 }}>
          {[1, 2, 3, 4, 5, 6].map((value) => {
            const isValueSelected = number === String(value);
            return (
              <Chip
                key={value}
                label={String(value)}
                color={isValueSelected ? 'secondary' : 'default'}
                variant="outlined"
                onClick={() => handleNumberChange(String(value))}
                sx={{
                  m: 1,
                  p: 2,
                  fontSize: '20px',
                  borderColor: 'gray',
                  backgroundColor: isValueSelected ? 'gray' : '',
                  color: isValueSelected ? 'white' : '',
                }}
              />
            );
          })}
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={4} md={4} sx={{ p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={usage}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {Object.keys(namesSelect).map((name) => (
                <MenuItem key={name} value={name}>
                  {namesSelect[name]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item sx={{ p: 3 }}>
        <Button
          sx={{ borderColor: 'gray', color: 'gray' }}
          variant="outlined"
          onClick={handleSearchClick}
          disabled={isSearchDisabled}
        >
          <AutoAwesomeIcon /> Search
        </Button>
      </Grid>
      <Grid item sx={{ p: 3, textAlign: 'center' }}>
        {data && data?.names && data?.names.length > 0 ? (
          data?.names.map((name, index) => (
            <div key={name} className="magic-name">
              <span>{name}</span>
              {index < data.names.length - 1 && ' |'}
            </div>
          ))
        ) : (
          <span>Data not found</span>
        )}
      </Grid>
    </Grid>
  );
};

export default Home
