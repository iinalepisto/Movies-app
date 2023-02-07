import Navbar from "./components/navbar/Navbar";
import Trending from "./pages/trending/Trending";
import "../src/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Searching from "./pages/searching/Searching";
import Details from "./pages/details/Details";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <div className='app'>
        <Container>
          <Routes>
            <Route exact path="/" element={<Trending />} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/series" element={<Series />} />
            <Route exact path="/trending" element={<Trending />} />
            <Route exact path="/search" element={<Searching />} />
            <Route exact path="/find/:id" element={<Details />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>

  );
};

export default App;
