import React from 'react';
import styled from 'styled-components';
import Header from '../header';

const Requirements = ({ character, onclick, name }) => {
  console.log({ character });
  return (
    <Container>
      <div>
        <Header name={`${name} Minimum Requirements`} />
        <div>
          <p>Strength: {character.Strength}</p>
          <p>Dexterity: {character.Dexterity}</p>
          <p>Constitution: {character.Constitution}</p>
          <p>Intelligence: {character.Intelligence}</p>
          <p>Wisdom: {character.Wisdom}</p>
          <p>Charisma: {character.Charisma}</p>
        </div>
      </div>
      <button onClick={() => onclick(false)}>Close Requirement View</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1px;
  border-radius: 5px;
  margin: 0 1rem;
`;

export default Requirements;
