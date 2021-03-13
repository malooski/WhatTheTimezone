import * as React from "react";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface HelpIconProps {
    text?: string | undefined | null;
}

export default function HelpIcon(props: HelpIconProps): JSX.Element {
    return <FontAwesomeIcon size="xs" icon={faQuestionCircle} title={props.text ?? undefined} />;
}
