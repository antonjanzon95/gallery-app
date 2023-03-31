import ImageView from "./Components/ImageView";
import UploadForm from "./Components/UploadForm";
import Layout from "./Components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/images" element={<ImageView />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
