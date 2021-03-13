import styled from "styled-components";

export default styled.input<{ area?: string }>`
    padding: 4px;
    border-radius: 2px;

    ${p => p.area != null && `grid-area: ${p.area};`}
`;
