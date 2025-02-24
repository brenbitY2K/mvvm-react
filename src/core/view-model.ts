import { Observable } from './observable.js';

export abstract class ViewModel {
    private bindings: Map<string, Observable<any>> = new Map();

    protected createBinding<T>(key: string, initialValue: T): Observable<T> {
        const observable = new Observable<T>(initialValue);
        this.bindings.set(key, observable);
        return observable;
    }

    getBinding(key: string): Observable<any> | undefined {
        return this.bindings.get(key);
    }

    bindView(template: string): string {
        let result = template;
        
        // Replace all {{binding}} with actual values
        this.bindings.forEach((observable, key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, observable.get().toString());
            
            // Set up the observer for future updates
            observable.subscribe((newValue) => {
                const element = document.querySelector(`[data-bind="${key}"]`);
                if (element) {
                    element.textContent = newValue.toString();
                }
            });
        });

        return result;
    }
}
