import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from './components/Modal';
import { GlobalStyle } from './globalStyles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <>
      <Container>
        <Button onClick={showModal}>Click me!</Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default App;
