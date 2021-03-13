import { makeObservable, observable } from "mobx";
import { TimezoneName } from "../timezones";
import * as uuid from "uuid";

export interface FriendModelArgs {
    uuid?: string;
    name: string;
    link?: string;
    timezone: TimezoneName;
}

export interface FriendJSON {
    uuid: string;
    name: string;
    link: string;
    timezone: TimezoneName;
}

export class FriendModel {
    uuid: string;
    name: string;
    link: string;
    timezone: TimezoneName;

    constructor(data: FriendModelArgs) {
        this.uuid = data.uuid ?? uuid.v4();
        this.name = data.name;
        this.link = data.link ?? "";
        this.timezone = data.timezone;

        makeObservable(this, {
            name: observable,
            link: observable,
            timezone: observable,
        });
    }

    toJSON(): FriendJSON {
        return {
            uuid: this.uuid,
            name: this.name,
            link: this.link,
            timezone: this.timezone,
        };
    }
}
