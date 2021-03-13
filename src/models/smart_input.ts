import { action, makeObservable, observable } from "mobx";

export interface SmartInputOpts<T> {
    throttle?: number;
    transform(v: string): T;
}

export class SmartInput<T> {
    raw: string | null = null;
    value: T | null = null;
    error: string | null = null;

    private _opts: SmartInputOpts<T>;

    constructor(opts: SmartInputOpts<T>) {
        this._opts = opts;

        makeObservable(this, {
            raw: observable,
            value: observable,
            error: observable,
            update: action,
            clear: action,
        });
    }

    update(raw: string): void {
        this.raw = raw;

        this.process();
    }

    @action
    private process(): void {
        if (this.raw == null) return;

        try {
            this.value = this._opts.transform(this.raw);
            this.error = null;
        } catch (e) {
            this.value = null;
            if (e instanceof Error) {
                this.error = e.message;
            } else if (typeof e === "string") {
                this.error = e;
            } else {
                this.error = "Bad input.";
            }
        }
    }

    clear(): void {
        this.raw = null;
        this.value = null;
        this.error = null;
    }
}
