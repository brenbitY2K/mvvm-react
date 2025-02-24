import React from "react";
import { ViewProps } from "../../../../core/view-interface.js";
import { useObservable } from "../../../../core/use-observable.js";
import { CounterViewModel } from "../../../view-models/counter-view-model.js";

export function CounterView({ viewModel }: ViewProps) {
  const countBinding = viewModel.getBinding("count");
  const count = useObservable(countBinding!);
  const counterViewModel = viewModel as CounterViewModel;

  return (
    <div>
      <h1>Counter Example (React)</h1>
      <div>
        Count: <span>{count}</span>
      </div>
      <button onClick={() => counterViewModel.increment()}>Increment</button>
      <button onClick={() => counterViewModel.decrement()}>Decrement</button>
    </div>
  );
}
