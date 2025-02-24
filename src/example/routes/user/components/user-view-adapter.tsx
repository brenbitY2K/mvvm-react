import React from "react";
import { useObservable } from "../../../../core/use-observable.js";
import { UserViewModel } from "../../../view-models/user-view-model.js";
import { UserView } from "./user-view.js";

interface UserViewAdapterProps {
  viewModel: UserViewModel;
}

export function UserViewAdapter({ viewModel }: UserViewAdapterProps) {
  const user = useObservable(viewModel.getBinding("user")!);
  const loading = useObservable(viewModel.getBinding("loading")!);
  const error = useObservable(viewModel.getBinding("error")!);

  const loadRandomUser = React.useCallback(() => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    viewModel.loadUser(randomId);
  }, [viewModel]);

  const refreshUser = React.useCallback(() => {
    viewModel.refreshUser();
  }, [viewModel]);

  React.useEffect(() => {
    viewModel.loadUser(1);
  }, [viewModel]);

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
