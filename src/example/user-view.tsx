import React from 'react';
import { ViewProps } from '../core/view-interface.js';
import { useObservable } from '../core/use-observable.js';
import { UserViewModel } from './user-viewmodel.js';

export function UserView({ viewModel }: ViewProps) {
    const user = useObservable(viewModel.getBinding('user')!);
    const loading = useObservable(viewModel.getBinding('loading')!);
    const error = useObservable(viewModel.getBinding('error')!);
    const userViewModel = viewModel as UserViewModel;

    const loadRandomUser = () => {
        const randomId = Math.floor(Math.random() * 10) + 1;
        userViewModel.loadUser(randomId);
    };

    React.useEffect(() => {
        userViewModel.loadUser(1);
    }, []);

    return (
        <div className="user-card">
            <h2>User Profile (React)</h2>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span className={`status ${user.status}`}>
                            {user.status}
                        </span>
                    </p>
                </div>
            )}
            <div>
                <button onClick={loadRandomUser}>Load Random User</button>
                <button onClick={() => userViewModel.refreshUser()}>Refresh</button>
            </div>
        </div>
    );
}
