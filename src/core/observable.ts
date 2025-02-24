export type Observer<T> = (value: T) => void;

export class Observable<T> {
    private value: T;
    private observers: Observer<T>[] = [];

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    get(): T {
        return this.value;
    }

    set(newValue: T): void {
        this.value = newValue;
        this.notify();
    }

    subscribe(observer: Observer<T>): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer<T>): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    private notify(): void {
        this.observers.forEach(observer => observer(this.value));
    }
}
