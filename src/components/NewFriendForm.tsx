import * as React from "react";
import styled from "styled-components";
import { FriendModel } from "../models/friend";
import { TimezoneName } from "../timezones";
import Button from "./base/Button";
import HelpIcon from "./base/HelpIcon";
import Input from "./base/Input";
import Label from "./base/Label";
import TimezoneSelect from "./TimezoneSelect";

const RootDiv = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-template-areas:
        "header header header"
        "namelabel . nameinput"
        "linklabel . linkinput"
        "tzlabel . tzinput"
        "submit submit submit";
    gap: 8px 0;
`;

const Header = styled.h3`
    grid-area: header;
`;
const SubmitDiv = styled.div`
    grid-area: submit;
    justify-items: end;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const NEW_FRIEND_HELP_TEXT = [
    "Adding a new friend will let you see their time in your timezone and your time in their timezone.",
].join("\n");

export interface NewFriendFormProps {
    onNewFriend(friend: FriendModel): void;
}

export default function NewFriendForm(props: NewFriendFormProps): JSX.Element {
    const [selectedTz, setSelectedTz] = React.useState<TimezoneName>("UTC");
    const [inputFriendName, setInputFriendName] = React.useState("");
    const [inputFriendLink, setInputFriendLink] = React.useState("");

    return (
        <RootDiv>
            <Header>
                New Friend <HelpIcon text={NEW_FRIEND_HELP_TEXT} />
            </Header>

            <Label area="namelabel">Friend&apos;s Name:</Label>
            <Input
                area="nameinput"
                type="text"
                placeholder="Malooski"
                onChange={e => setInputFriendName(e.currentTarget.value)}
            ></Input>

            <Label area="linklabel">Friend&apos;s Link:</Label>
            <Input
                area="linkinput"
                type="text"
                placeholder="https://twitter.com/malooskii"
                onChange={e => setInputFriendLink(e.currentTarget.value)}
            ></Input>

            <Label area="tzlabel">Timezone:</Label>
            <div style={{ gridArea: "tzinput" }}>
                <TimezoneSelect value={selectedTz} onValueChange={setSelectedTz} />
            </div>

            <SubmitDiv>
                <Button onClick={() => onNewFriend()}>Add Friend</Button>
            </SubmitDiv>
        </RootDiv>
    );

    function onNewFriend() {
        props.onNewFriend(
            new FriendModel({
                name: inputFriendName,
                timezone: selectedTz,
                link: inputFriendLink,
            })
        );
        setInputFriendName("");
        setInputFriendLink("");
    }
}
