import styled from "styled-components";

export default styled.div<{ spacing?: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        margin-left: ${p => p.spacing ?? 0};
        margin-right: ${p => p.spacing ?? 0};
    }
    & > *:first-child {
        margin-left: 0px;
    }
    & > *:last-child {
        margin-right: 0px;
    }
`;
