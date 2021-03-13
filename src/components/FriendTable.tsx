import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { FriendModel } from "../models/friend";
import { TimezoneName } from "../timezones";
import FriendTableRow from "./FriendTableRow";

const MyTable = styled.table`
    width: 100%;
`;

const MyTableHead = styled.thead`
    font-weight: bold;
`;

export interface FriendTableProps {
    friends: FriendModel[];
    myTime: Date;

    otherTime?: Date | null | undefined;
    otherValue?: string | null | undefined;
    otherUuid?: string | null | undefined;

    onOtherTimeUpdate(uuid: string, value: string, tz: TimezoneName): void;
    onRemoveFriend(uuid: string): void;
}

export default observer((props: FriendTableProps) => {
    const { friends, myTime, otherUuid, otherTime } = props;

    return (
        <MyTable>
            <MyTableHead>
                <tr>
                    <td>Name</td>
                    <td>Timezone</td>
                    <td>Time</td>
                    <td></td>
                </tr>
            </MyTableHead>
            <tbody>
                {friends.map(f => {
                    const active = f.uuid === otherUuid;
                    return (
                        <FriendTableRow
                            time={otherTime ?? myTime}
                            active={active}
                            key={f.uuid}
                            friend={f}
                            value={active ? props.otherValue : null}
                            onOtherTimeUpdate={v => props.onOtherTimeUpdate(f.uuid, v, f.timezone)}
                            onRemove={() => props.onRemoveFriend(f.uuid)}
                        />
                    );
                })}
            </tbody>
        </MyTable>
    );
});
