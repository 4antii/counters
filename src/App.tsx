import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, add, remove } from "./redux/counterSlice";
import { RootState } from "./redux/store";
import "./App.css";

//one second timer rate
const timerRate = 1000;

enum CounterType {
  controlled,
  uncontrolled,
}

interface CounterProps {
  index: number;
  value: number;
  type: CounterType;
}

const Counter: React.FC<CounterProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.type === CounterType.uncontrolled) {
      const interval = setInterval(() => {
        dispatch(increment({ index: props.index }));
      }, timerRate);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  return (
    <div>
      <h2>{props.value}</h2>
      {props.type === CounterType.controlled && (
        <Fragment>
          <button
            className="button"
            onClick={() => dispatch(increment({ index: props.index }))}
          >
            +
          </button>
          <button
            className="button"
            onClick={() => dispatch(decrement({ index: props.index }))}
          >
            -
          </button>
        </Fragment>
      )}
      <button
        className="button button-remove"
        onClick={() => dispatch(remove({ index: props.index }))}
      >
        Удалить
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const counters = useSelector((state: RootState) => state.counters);

  return (
    <div className="counters">
      <button className="button button-add" onClick={() => dispatch(add())}>
        Добавить счетчик
      </button>
      {counters.map((value, index) => (
        <Counter
          key={index}
          index={index}
          value={value}
          type={
            (index + 1) % 4 === 0
              ? CounterType.uncontrolled
              : CounterType.controlled
          }
        />
      ))}
    </div>
  );
};

export default App;
