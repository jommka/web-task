import './styles/App.css';
import Slider from "./components/UI/Slider";
import ImageRotation from "./components/UI/ImageRotation";
import FileDownloader from "./components/UI/FileDownloader";
import CheckingServerLogic from "./components/UI/CheckingServerLogic";

function App() {
  return (
      <div className="App">
          <Slider/>
          <hr width="100%" size="1" color="CAC4D0"/>
          <ImageRotation/>
          <hr width="100%" size="1" color="CAC4D0"/>
          <FileDownloader/>
          <hr width="100%" size="1" color="CAC4D0"/>
          <CheckingServerLogic/>
      </div>
  );
}

export default App;
