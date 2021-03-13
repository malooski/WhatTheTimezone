import { faQuestionCircle, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import Button from "../components/base/Button";
import ColumnDiv from "../components/base/ColumnDiv";
import HelpIcon from "../components/base/HelpIcon";
import Input from "../components/base/Input";
import RowDiv from "../components/base/RowDiv";
import FriendTable from "../components/FriendTable";
import NewFriendForm from "../components/NewFriendForm";
import { TIME_OUTPUT_FORMAT } from "../constants";
import { AppModel } from "../models/app";
import { useIntervalMemo } from "../util/react";

const RootDiv = styled.div`
    width: 600px;
    margin: 32px auto;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 32px;
    border-radius: 32px;
`;

const MyTimeDiv = styled(RowDiv)`
    justify-content: space-between;
`;

const MY_TIME_HELP_TEXT = [
    "This is your time.",
    "Type a time here to see it in other timezones.",
    "View someone else's time in your timezone here.",
].join("\n");

export default observer(() => {
    const [app] = React.useState(() => new AppModel());
    const friends = app.friends.value;

    const [currTime] = useIntervalMemo(() => new Date(), 5000);
    const myTimeText = React.useMemo(() => format(currTime, TIME_OUTPUT_FORMAT), [currTime]);

    const othersTimeText = React.useMemo(() => {
        if (app.othersTime.value == null) return null;

        return format(app.othersTime.value, TIME_OUTPUT_FORMAT);
    }, [currTime]);

    return (
        <RootDiv>
            <ColumnDiv spacing="16px">
                <h1>What The Timezone??</h1>
                <MyTimeDiv>
                    <h3>
                        Your Time <HelpIcon text={MY_TIME_HELP_TEXT} />
                    </h3>
                    <div>
                        <Input
                            type="text"
                            onChange={e => app.myTime.update(e.target.value)}
                            value={othersTimeText ?? app.myTime.raw ?? myTimeText}
                        />
                        <Button onClick={() => app.clearTimes()}>
                            <FontAwesomeIcon icon={faSync} />
                        </Button>
                    </div>
                </MyTimeDiv>
                <NewFriendForm
                    onNewFriend={f => {
                        friends.push(f);
                        app.friends.set(friends);
                    }}
                />

                <FriendTable
                    friends={friends}
                    myTime={app.myTime.value ?? currTime}
                    onOtherTimeUpdate={(uuid, v, tz) => app.updateOthersTime(uuid, v, tz)}
                    otherValue={app.othersTime.raw}
                    otherUuid={app.othersUuid}
                    otherTime={app.othersTime.value}
                    onRemoveFriend={uuid => app.friends.set(friends.filter(f => f.uuid !== uuid))}
                />
            </ColumnDiv>
        </RootDiv>
    );
});
