import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import { LoggerLayout } from "./layout/Logger";
import { HocLoggerLayout } from "./layout/HocLogger";
import { MainLayout } from "./layout/Main";
import { About } from "./pages/About";
import { Foo } from "./pages/Foo";
import { Home } from "./pages/Home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<LoggerLayout />}>
          <Route element={<HocLoggerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/foo" element={<Foo />} />
          </Route>
        </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
