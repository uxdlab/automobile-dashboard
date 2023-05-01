import './App.css';
import { Router } from './Routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar/Sidebar';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Sidebar> */}
          <Router />
        {/* </Sidebar> */}
      </BrowserRouter>
    </>
  );
}

export default App;
