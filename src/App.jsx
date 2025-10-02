import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    console.log(searchValue);
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
