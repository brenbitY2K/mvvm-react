import { ViewModel } from '../core/view-model.js';
import { Observable } from '../core/observable.js';

export class CounterViewModel extends ViewModel {
    public count: Observable<number>;

    constructor() {
        super();
        this.count = this.createBinding('count', 0);
    }

    increment(): void {
        this.count.set(this.count.get() + 1);
    }

    decrement(): void {
        this.count.set(this.count.get() - 1);
    }
}
