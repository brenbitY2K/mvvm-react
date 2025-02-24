import React from "react";

interface CounterViewProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function CounterView({
  count,
  onIncrement,
  onDecrement,
}: CounterViewProps) {
  return (
    <div>
      <h1>Counter Example (React)</h1>
      <div>
        Count: <span>{count}</span>
      </div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
}
