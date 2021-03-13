import * as React from "react";
import styled from "styled-components";
import { formatTimezoneName, isTimezoneNameValid, TimezoneName, TIMEZONES } from "../timezones";

const MySelect = styled.select``;

const MyOption = styled.option``;

interface TimezoneSelectProps {
    value?: TimezoneName | null | undefined;
    onValueChange?(value: TimezoneName): void;
}

export default function TimezoneSelect(props: TimezoneSelectProps): JSX.Element {
    return (
        <MySelect value={props.value ?? undefined} onChange={onSelectChange}>
            {Object.entries(TIMEZONES).map(([name, offset]) => (
                <MyOption key={name} value={name}>
                    {formatTimezoneName(name)} ({offset})
                </MyOption>
            ))}
        </MySelect>
    );

    function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const v = e.currentTarget.value;
        if (!isTimezoneNameValid(v)) return;

        props.onValueChange?.(v);
    }
}
