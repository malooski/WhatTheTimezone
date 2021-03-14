import styled from "styled-components";

export default styled.input<{ area?: string }>`
    ${p => p.area != null && `grid-area: ${p.area};`}
`;
