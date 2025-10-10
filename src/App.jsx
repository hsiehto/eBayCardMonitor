import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = async () => {
    console.log(searchValue);
    const url = `http://localhost:5000/api/search?query=${searchValue}`;
    try {
      const response = await fetch(url);
      console.log(response);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label="search an item"
        variant="standard"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleSearch}>
        search
      </Button>
    </>
  );
}

export default App;
