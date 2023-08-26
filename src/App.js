import { useState } from 'react';
import styled from 'styled-components';
import Header from './components/header';
import Character from './components/Character';
import Button from './components/button';
import { API_URL } from './utils';

function App() {
  const [num, setNum] = useState(1);
  const [allCharacters, setAllCharacters] = useState([]);

  const saveAllCharacters = async (count, character) => {
    setAllCharacters([...allCharacters, character]);

    if (allCharacters.length === num) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(allCharacters),
        });
        const data = await res.json();
        console.log('Character data saved:', data);
      } catch (error) {
        console.error('Failed to save character data:', error);
      }
    }

    return allCharacters;
  };

  return (
    <Container>
      <Header name={'React Coding Exercise - Odafe Idogho'} />
      <ContainButtons>
        <Button onClick={() => setNum(num + 1)}>Add New Character</Button>
        <Button onClick={() => setNum(1)}>Reset All Characters</Button>
        <Button onClick={() => {}}>Save All Characters</Button>
      </ContainButtons>
      {Array.from({ length: num }).map((_, idx) => (
        <Character count={idx + 1} saveAllCharacters={saveAllCharacters} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  margin: 1rem;
  text-align: center;
  border-radius: 5px;
`;

const ContainButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px;
  margin: 1rem;
  text-align: center;
  border-radius: 5px;
`;

export default App;
