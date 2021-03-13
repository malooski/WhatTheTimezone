import * as React from "react";
import { observer } from "mobx-react";
import { FriendModel } from "../models/friend";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { TIME_OUTPUT_FORMAT } from "../constants";
import { formatTimezoneName } from "../timezones";
import Input from "./base/Input";
import Button from "./base/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export interface FriendTableRowProps {
    active?: boolean;
    friend: FriendModel;
    time: Date;

    value?: string | null | undefined;

    onRemove(): void;
    onOtherTimeUpdate(value: string): void;
}

const MyRow = styled.tr<{ active?: boolean }>`
    ${p => p.active && "background-color: blue;"}
`;

export default observer((props: FriendTableRowProps) => {
    const { friend, time } = props;

    const val = format(utcToZonedTime(time, friend.timezone), TIME_OUTPUT_FORMAT);

    return (
        <MyRow active={props.active}>
            <td>
                {friend.link === "" ? (
                    friend.name
                ) : (
                    <a href={friend.link} target="_blank" rel="noreferrer">
                        {friend.name}
                    </a>
                )}
            </td>
            <td>{formatTimezoneName(friend.timezone)}</td>
            <td>
                <Input
                    type="text"
                    value={props.value ?? val}
                    onChange={e => props.onOtherTimeUpdate(e.target.value)}
                />
            </td>
            <td>
                <Button onClick={() => props.onRemove()}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
        </MyRow>
    );
});
