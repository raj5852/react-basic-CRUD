import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Edit from './Component/Pages/Edit';
import Home from './Component/Pages/Home';
import View from './Component/Pages/View';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route path='view/:id' element={<View />} />
          <Route path='edit/:id' element={<Edit />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
