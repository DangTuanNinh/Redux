import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { decrease, increment } from "./redux/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Button from "react-bootstrap/Button";
import Header from "./components/header";
import TabsContent from "./components/tabs.content";
import UserTable from "./components/user.table";

function App() {
  const dispatch = useAppDispatch();

  // const count = useSelector((state: RootState) => state.counter);
  const count = useAppSelector((state) => state.counter);

  console.log(">>Check count:", count);

  return (
    <>
      <Header />
      <TabsContent />
    </>
  );
}

export default App;
