import { useState } from 'react';
import styled from 'styled-components';
import Character from './components/Character';

function App() {
  const [num, setNum] = useState(0);
  return (
    <Container>
      <Character />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 4px;
  margin: 1rem;
  text-align: center;
  border-radius: 5px;
`;

export default App;
