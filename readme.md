# React MVVM Adapter Pattern

This project demonstrates how to integrate a React-based UI with an existing MVVM (Model-View-ViewModel) architecture without making the React components directly aware of the ViewModel or observables. We achieve this by introducing an adapter layer that subscribes to the ViewModel and passes plain props down to a pure React component.

## Overview

### ViewModel (MVVM Layer)

The CounterViewModel (or any other XYZViewModel) manages application state and exposes observables via the createBinding / getBinding methods.

### Adapter Layer

This layer is a React component (e.g., CounterViewAdapter.tsx) that:

- Subscribes to the ViewModel's observables using a custom hook (useObservable)
- Passes the current data and callbacks (e.g., methods that change the ViewModel state) to the pure React component

### Pure React View

A component (e.g., CounterView.tsx) that receives data and callbacks purely via props. It has no direct knowledge of:

- How data is fetched or stored
- The presence of observables or any MVVM constructs

By separating the adapter from the pure view, we keep the React layer clean and ensure the MVVM logic is encapsulated in the ViewModel.

## How It Works (Counter Example)

### HTML Entry

In react-counter.html, we import React, ReactDOM, and the CounterViewModel. We create an instance of the ViewModel and render our adapter component into #root:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Counter Example (React)</title>
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@17",
          "react-dom": "https://esm.sh/react-dom@17"
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>

    <script type="module">
      import React from "react";
      import ReactDOM from "react-dom";
      import { CounterViewModel } from "../../view-models/counter-view-model.js";
      import { CounterViewAdapter } from "./components/counter-view-adapter.js";

      // Create ViewModel instance
      const viewModel = new CounterViewModel();

      // Render the React Adapter
      ReactDOM.render(
        React.createElement(CounterViewAdapter, { viewModel }),
        document.getElementById("root"),
      );
    </script>
  </body>
</html>
```

### Adapter Component (counter-view-adapter.tsx)

The adapter subscribes to the observables from the ViewModel and passes the data to the pure view. It also provides callbacks that trigger the ViewModel's methods:

```tsx
import React from "react";
import { useObservable } from "../../../../core/use-observable.js";
import { CounterViewModel } from "../../../view-models/counter-view-model.js";
import { CounterView } from "./counter-view.js";

interface CounterViewAdapterProps {
  viewModel: CounterViewModel;
}

export function CounterViewAdapter({ viewModel }: CounterViewAdapterProps) {
  // Subscribe to the 'count' observable
  const count = useObservable(viewModel.getBinding("count")!);

  // Define callbacks for increment / decrement
  const increment = () => viewModel.increment();
  const decrement = () => viewModel.decrement();

  return (
    <CounterView
      count={count}
      onIncrement={increment}
      onDecrement={decrement}
    />
  );
}
```

### Pure React View (counter-view.tsx)

This component simply receives count, onIncrement, and onDecrement as props. It has no knowledge of observables or the ViewModel:

```tsx
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
```

### ViewModel (counter-view-model.ts)

The ViewModel is part of your MVVM layer and has zero React imports. It manages the count state with an observable and provides methods to increment or decrement the count:

```ts
import { ViewModel } from "../../core/view-model.js";

export class CounterViewModel extends ViewModel {
  constructor() {
    super();
    this.createBinding("count", 0);
  }

  increment() {
    const countBinding = this.getBinding("count")!;
    countBinding.set(countBinding.get() + 1);
  }

  decrement() {
    const countBinding = this.getBinding("count")!;
    countBinding.set(countBinding.get() - 1);
  }
}
```

## Step-by-Step Usage

1. Place the HTML file (react-counter.html) in a directory served by your local dev server (or open it in your browser if your environment supports ES modules).
2. Ensure the import paths are correct for:
   - The ViewModel (e.g. ../../view-models/counter-view-model.js)
   - The adapter component (e.g. ./components/counter-view-adapter.js)
   - The useObservable hook (e.g. ../../../../core/use-observable.js)
3. Launch the page by opening react-counter.html in a modern browser or serving it via a local HTTP server.
4. Interact with the rendered counter. The count changes as you click the increment/decrement buttons.

## Why Use an Adapter?

### Separation of Concerns:

- The Adapter is the only place that touches the ViewModel. It knows how to subscribe to observables and how to call MVVM methods.
- The Pure View is a simple UI component that depends on plain props. It has no knowledge of your MVVM or data-fetching mechanism.

### Testability:

- You can test the pure view in isolation by passing in different count values and verifying UI behavior.
- You can separately test the ViewModel logic without involving React.

### Flexibility:

- You can replace your React layer with another UI layer in the future (or vice versa). The core MVVM logic remains untouched.

## Additional Notes

The useObservable hook is a simple custom hook that:

- Calls observable.get() to get the initial value
- Subscribes to the observable on mount and updates state whenever a new value is emitted
- Unsubscribes on unmount

Example useObservable snippet:

```ts
import React from "react";
import { Observable } from "./observable";

export function useObservable<T>(observable: Observable<T>) {
  const [value, setValue] = React.useState(observable.get());

  React.useEffect(() => {
    const observer = (newValue: T) => setValue(newValue);
    observable.subscribe(observer);
    return () => {
      observable.unsubscribe(observer);
    };
  }, [observable]);

  return value;
}
```

