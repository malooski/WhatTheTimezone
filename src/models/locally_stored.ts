import { action, computed, makeObservable, observable } from "mobx";

export interface LocallyStoredOpts<T> {
    domain: string;
    name: string;

    initialize: () => T;
    serialize(value: T): string;
    deserialize(value: string): T;
}

/**
 * A value retrieved from and saved into LocalStorage.
 */
export class LocallyStored<T> {
    value: T;

    private _opts: LocallyStoredOpts<T>;

    constructor(opts: LocallyStoredOpts<T>) {
        this._opts = opts;

        this.value = this.getFromStorage() ?? opts.initialize();
        this.saveToStorage(this.value);

        makeObservable(this, {
            set: action,
            value: observable,
        });
    }

    set(value: T): void {
        this.value = value;
        this.saveToStorage(this.value);
    }

    private saveToStorage(value: T): void {
        const val = this._opts.serialize(value);
        localStorage.setItem(this.getKey(), val);
    }

    private getFromStorage(): T | undefined {
        const foundItem = localStorage.getItem(this.getKey());
        if (foundItem == null) return undefined;
        try {
            const result = this._opts.deserialize(foundItem);
            return result;
        } catch {
            return undefined;
        }
    }

    private getKey(): string {
        return `${this._opts.domain}:${this._opts.name}`;
    }
}
