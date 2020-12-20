import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';
import requests from './requests';

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row 
          title="NETFLIX ORIGINALS" 
          fetchUrl={requests.fetchNetflixOriginals}
          /* 
              Just by passing one prop we can determine if it is a larger tile or a smaller tile
              Tiles for Netflix Originals are much bigger. Therefore, we are going to allow for this variation by adding a prop isLargeRow which by default is equal to true then we render the styles based on this 
              if you do not assign a value it defaults to isLargeRow={true}
          */
          isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;

/*
    https://netflix-clone-7d741.web.app/
*/