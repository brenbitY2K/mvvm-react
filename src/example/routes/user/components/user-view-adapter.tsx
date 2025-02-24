import React from "react";
import { useObservable } from "../../../../core/use-observable.js";
import { UserViewModel } from "../../../view-models/user-view-model.js";
import { UserView } from "./user-view.js";

/**
 * Props for the adapter: specifically the ViewModel
 */
interface UserViewAdapterProps {
  viewModel: UserViewModel;
}

export function UserViewAdapter({ viewModel }: UserViewAdapterProps) {
  // Use hooks to subscribe to the observables from the ViewModel
  const user = useObservable(viewModel.getBinding("user")!);
  const loading = useObservable(viewModel.getBinding("loading")!);
  const error = useObservable(viewModel.getBinding("error")!);

  // Define any callbacks that directly call into the ViewModel
  const loadRandomUser = React.useCallback(() => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    viewModel.loadUser(randomId);
  }, [viewModel]);

  const refreshUser = React.useCallback(() => {
    viewModel.refreshUser();
  }, [viewModel]);

  // If you want to load default data on mount:
  React.useEffect(() => {
    viewModel.loadUser(1);
  }, [viewModel]);

  // Render a pure view and pass the relevant props
  return (
    <UserView
      user={user}
      loading={loading}
      error={error}
      onLoadRandomUser={loadRandomUser}
      onRefreshUser={refreshUser}
    />
  );
}
