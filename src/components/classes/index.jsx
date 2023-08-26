import React from 'react';
import styled from 'styled-components';
import Header from '../header';

const Classes = ({ config }) => {
  return (
    <Container>
      <Header name='Classes' />
      <List>
        {config.map((item, index) => {
          const { isRed } = item;
          console.log({ isRed, item });

          return (
            <li key={index}>
              <Button
                onClick={item.onclick}
                style={{
                  color: isRed ? 'red' : 'black',
                }}
              >
                {item.character}
              </Button>
            </li>
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1px;
  margin: 0 1rem;
  text-align: center;
  border-radius: 5px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 1rem;
`;

const Button = styled.a`
  background-color: #fff;
  color: #000;
  cursor: pointer;
  margin: 0 5px;
  line-height: 1.5;
  text-decoration: none;
`;

export default Classes;
