import React from 'react';
import styled from 'styled-components';

const LinkUpGallery = () => (
  <Wrapper>
    <Message>LinkUp 데모 준비 중입니다.</Message>
  </Wrapper>
);

export default LinkUpGallery;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #999;
`;
