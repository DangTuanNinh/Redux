import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { decrease, increment } from "./redux/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();

  // const count = useSelector((state: RootState) => state.counter);
  const count = useAppSelector((state) => state.counter);

  console.log(">>Check count:", count);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>My current = {count.value}</h1>

        <div>
          <button onClick={() => dispatch(increment())}>Increase +1</button>
          <button
            onClick={() => {
              console.log(">>Check dispatch: 1111");
              dispatch(decrease());
            }}
          >
            Decrease -1
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
