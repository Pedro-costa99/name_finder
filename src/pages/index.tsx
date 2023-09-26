import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react'

interface DataItem {
  names: string[]
}

function Home (){
    const [usage, setUsage] = useState<string>('');
    const [data, setData] = useState<DataItem | null>(null)
    const [gender, setGender] = useState('')
    const [number, setNumber] = useState('')
    const key = "pe839753942"

    const namesSelect = {
      'eng': 'Inglês',
      'ita': 'Italiano',
      'fre': 'Francês',
      'por': 'Português',
      'afr': 'Africano',
      'spa': 'Espanhol'
    };

      const handleSearchClick = () => {
        fetch(`https://www.behindthename.com/api/random.json?number=${number}&usage=${usage}&gender=${gender}&key=${key}`)
          .then(response => response.json())
          .then(jsonData => setData(jsonData))
          .catch(error => console.log(error));
      }

      console.log('data', data)

      const handleGenderChange = (value: string) => {
        setGender(value);
        console.log("Gender selected:", value)
      };
    
      const handleNumberChange = (value: string) => {
        setNumber(value);
        console.log("Number selected:", value)
      };

      const handleChange = (event: SelectChangeEvent<typeof usage>) => {
        const {
          target: { value },
        } = event;
        setUsage(value);
      };

      const ITEM_HEIGHT = 48;
      const ITEM_PADDING_TOP = 8;

      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

      const isSearchDisabled = !(gender && number)
    
      return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h1>Encontre o nome perfeito para seu bebê...</h1>
            <Grid container spacing={2} style={{ maxWidth: "80%"}}>
                <Grid item xs={6} container justifyContent="center">
                    <Chip
                    label="Female"
                    color={gender === "F" ? "primary" : "default"}
                    onClick={() => handleGenderChange("F")}
                    style={{ marginRight: "8px" }}
                    />
                    <Chip
                    label="Male"
                    color={gender === "M" ? "primary" : "default"}
                    onClick={() => handleGenderChange("M")}
                    />
                </Grid>
                <Grid item xs={6} container justifyContent="center">
                    <Chip
                    label="1"
                    color={number === "1" ? "primary" : "default"}
                    onClick={() => handleNumberChange("1")}
                    style={{ marginRight: "8px" }}
                    />
                    <Chip
                    label="2"
                    color={number === "2" ? "primary" : "default"}
                    onClick={() => handleNumberChange("2")}
                    style={{ marginRight: "8px" }}
                    />
                    <Chip
                    label="3"
                    color={number === "3" ? "primary" : "default"}
                    onClick={() => handleNumberChange("3")}
                    style={{ marginRight: "8px" }}
                    />
                    <Chip
                    label="4"
                    color={number === "4" ? "primary" : "default"}
                    onClick={() => handleNumberChange("4")}
                    style={{ marginRight: "8px" }}
                    />
                    <Chip
                    label="5"
                    color={number === "5" ? "primary" : "default"}
                    onClick={() => handleNumberChange("5")}
                    style={{ marginRight: "8px" }}
                    />
                    <Chip
                    label="6"
                    color={number === "6" ? "primary" : "default"}
                    onClick={() => handleNumberChange("6")}
                    />
                </Grid>
            </Grid>
            <div>
      <FormControl sx={{ m: 1, width: 300 }}>
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
            <MenuItem 
              key={name}
              value={name}
            >
              {namesSelect[name]}
            </MenuItem>
           ))}
        </Select>
      </FormControl>
    </div>
            <div>
            <Button variant="outlined" onClick={handleSearchClick} disabled={isSearchDisabled}>Pesquisar</Button>
            {data && (
                <ul>
                {data?.names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
                </ul>
            )}
            </div>
            </div>
        </>

      );
}

export default Home