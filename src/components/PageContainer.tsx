import React, { SFC } from 'react';

import { PageContainerProps } from '../types';

import styled from 'styled-components';

const Container = styled.div`
    padding: 1em;
`;

const PageTitle = styled.div`
    text-align: center;
    font-size: 40px;

    @media (max-width: 768px) {
        font-size: 30px;
    }
`;

const PageText = styled.div`
    text-align: center;
    font-size: 20px;
`;

const PageContainer: SFC<PageContainerProps> = ({ title, text, children }) => (
    <Container>
        <PageTitle>{title}</PageTitle>
        <PageText>{text}</PageText>
        {children}
    </Container>
);

export default PageContainer;
