import styled from "styled-components";

export default styled.div<{ spacing?: string }>`
    display: flex;
    flex-direction: column;

    & > * {
        margin-top: ${p => p.spacing ?? 0};
        margin-bottom: ${p => p.spacing ?? 0};
    }
    & > *:first-child {
        margin-top: 0px;
    }
    & > *:last-child {
        margin-bottom: 0px;
    }
`;
