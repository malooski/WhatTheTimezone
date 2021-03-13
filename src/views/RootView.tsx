import { observer } from "mobx-react";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import AppView from "./AppView";

export default function RootView(): JSX.Element {
    return (
        <React.Fragment>
            <AppView />
        </React.Fragment>
    );
}
