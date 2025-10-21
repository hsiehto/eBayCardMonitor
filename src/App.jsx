import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@mui/material/Container";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSearch = async () => {
    console.log(searchValue);
    const url = `http://localhost:5000/api/search?query=${searchValue}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result?.error?.errors[0]?.message) {
        setErrorMessage(result.error.errors[0].message);
      } else {
        console.log("check");
        setErrorMessage("");
        setSearchResults(result.itemSummaries);
      }
    } catch (error) {
      console.error("error message", error.message);
    }
  };

  return (
    <>
      <Container fixed>
        <div className="search-container">
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
        </div>
        <div className="flex-container">
          <div>{errorMessage}</div>
          {!searchResults.length && <div>No search results</div>}
          {searchResults &&
            searchResults.map((item) => {
              return (
                <a
                  href={item.itemWebUrl}
                  key={item.itemId}
                  target="_blank"
                  className="flex-item"
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image.imageUrl}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {`${item.price.currency} ${item.price.value}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </a>
              );
            })}
        </div>
      </Container>
    </>
  );
}

export default App;
