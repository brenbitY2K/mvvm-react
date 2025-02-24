import { Observable } from './observable.js';

export interface ViewModelInterface {
    getBinding(key: string): Observable<any> | undefined;
}

export interface ViewProps {
    viewModel: ViewModelInterface;
}
