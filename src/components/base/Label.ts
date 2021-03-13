import styled from "styled-components";

export default styled.label<{ area?: string }>`
    ${p => p.area != null && `grid-area: ${p.area};`}
`;
