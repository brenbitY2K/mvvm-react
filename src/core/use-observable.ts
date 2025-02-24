import React, { useState, useEffect } from 'react';
import { Observable } from './observable.js';

export function useObservable(observable: Observable<any>): any {
    const [value, setValue] = useState(observable.get());

    useEffect(() => {
        const observer = (newValue: any) => {
            setValue(newValue);
        };

        observable.subscribe(observer);
        return () => observable.unsubscribe(observer);
    }, [observable]);

    return value;
}
