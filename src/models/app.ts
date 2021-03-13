import { isValid, parse } from "date-fns";
import { toDate, zonedTimeToUtc } from "date-fns-tz";
import { action, makeObservable, observable } from "mobx";
import { APP_STORAGE_DOMAIN, TIME_OUTPUT_FORMAT } from "../constants";
import { TimezoneName } from "../timezones";
import { FriendJSON, FriendModel } from "./friend";
import { LocallyStored } from "./locally_stored";
import { SmartInput } from "./smart_input";

export class AppModel {
    myTime = new SmartInput<Date>({
        throttle: 200,
        transform: t => {
            const d = parse(t, TIME_OUTPUT_FORMAT, new Date());
            if (!isValid(d)) {
                throw new Error("Invalid date.");
            }
            return d;
        },
    });

    friends = new LocallyStored<FriendModel[]>({
        domain: APP_STORAGE_DOMAIN,
        name: "friends",
        initialize: () => {
            return [
                new FriendModel({
                    name: "Malooski",
                    timezone: "America/Chicago",
                }),
                new FriendModel({
                    name: "Silver",
                    timezone: "Canada/Eastern",
                }),
                new FriendModel({
                    name: "Steven",
                    timezone: "America/Los_Angeles",
                }),
                new FriendModel({
                    name: "Tarochi",
                    timezone: "Europe/London",
                }),
            ];
        },
        serialize: friends => {
            return JSON.stringify(friends.map(f => f.toJSON()));
        },
        deserialize: data => {
            const friends = JSON.parse(data) as FriendJSON[];
            return friends.map(f => new FriendModel(f));
        },
    });

    othersUuid: string | null = null;
    othersTz: TimezoneName = "UTC";
    othersTime = new SmartInput<Date>({
        throttle: 200,
        transform: t => {
            const d = parse(t, TIME_OUTPUT_FORMAT, new Date());
            if (!isValid(d)) {
                throw new Error("Invalid date.");
            }
            return zonedTimeToUtc(d, this.othersTz);
        },
    });

    constructor() {
        makeObservable(this, {
            myTime: observable,
            friends: observable,

            othersUuid: observable,
            othersTz: observable,
            othersTime: observable,

            updateMyTime: action,
            updateOthersTime: action,
            clearTimes: action,
        });
    }

    updateMyTime(value: string): void {
        this.othersTime.clear();
        this.othersUuid = null;

        this.myTime.update(value);
    }

    updateOthersTime(uuid: string, value: string, tz: TimezoneName): void {
        this.myTime.clear();

        this.othersTz = tz;
        this.othersUuid = uuid;
        this.othersTime.update(value);
    }

    clearTimes(): void {
        this.myTime.clear();
        this.othersTime.clear();
        this.othersUuid = null;
    }
}
