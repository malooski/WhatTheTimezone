import * as React from "react";
import styled from "styled-components";
import * as uuid from "uuid";

import dateFnsTz from "date-fns-tz";
import { TimezoneName, TIMEZONES } from "../timezones";
import { format } from "date-fns";
import { useIntervalMemo } from "../util/react";
import TimezoneSelect from "../components/TimezoneSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

const RootDiv = styled.div``;

interface Friend {
    uuid: string;
    name: string;
    timezone: TimezoneName;
}

export default function RootView(): JSX.Element {
    const [friends, setFriends] = React.useState<Friend[]>([
        {
            uuid: uuid.v4(),
            name: "Steven",
            timezone: "America/Los_Angeles",
        },
        {
            uuid: uuid.v4(),
            name: "Silver",
            timezone: "Canada/Eastern",
        },
    ]);

    const [myTimeText] = useIntervalMemo(() => format(new Date(), "hh:mm:ss aaa"), 1000);
    const [myTimeInput, setMyTimeInput] = React.useState<string | null>(null);

    const [selectedTz, setSelectedTz] = React.useState<TimezoneName | null>(null);

    return (
        <RootDiv>
            <div>
                <span>Your Time</span>{" "}
                <input
                    type="text"
                    onFocus={onMyTimeStartEditing}
                    value={myTimeText ?? myTimeText}
                ></input>
            </div>
            <div>
                <input type="text" placeholder="New Friend"></input>
                <TimezoneSelect value={selectedTz} onValueChange={setSelectedTz} />
            </div>

            <table>
                <thead>
                    <td>Name</td>
                    <td>Timezone</td>
                    <td>Time</td>
                    <td></td>
                </thead>
                <tbody>
                    {friends.map((friend) => (
                        <tr key={friend.uuid}>
                            <td>{friend.name}</td>
                            <td>{friend.timezone}</td>
                            <td>
                                <input type="text"></input>
                            </td>
                            <td>
                                <Button>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </RootDiv>
    );

    function onMyTimeStartEditing() {
        setMyTimeInput(myTimeText);
    }

    function onMyTimeEdited(event: React.ChangeEvent<HTMLInputElement>) {
        setMyTimeInput(event.target.value);
    }
}
