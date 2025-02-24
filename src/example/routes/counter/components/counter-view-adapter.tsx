import React from "react";
import { useObservable } from "../../../../core/use-observable.js";
import { CounterViewModel } from "../../../view-models/counter-view-model.js";
import { CounterView } from "./counter-view.js";

interface CounterViewAdapterProps {
  viewModel: CounterViewModel;
}

export function CounterViewAdapter({ viewModel }: CounterViewAdapterProps) {
  const count = useObservable(viewModel.getBinding("count")!);

  const increment = () => {
    viewModel.increment();
  };

  const decrement = () => {
    viewModel.decrement();
  };

  return (
    <CounterView
      count={count}
      onIncrement={increment}
      onDecrement={decrement}
    />
  );
}
