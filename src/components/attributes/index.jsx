import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Button from '../button';
import { ATTRIBUTE_LIST } from '../../consts.js';

const Attributes = ({ attributes, onAttributeClick }) => {
  return (
    <Container>
      <Header name='Attributes' />
      <List>
        {ATTRIBUTE_LIST.map((attribute) => {
          const { modifier, score } = attributes[attribute];

          return (
            <li>
              {`${attribute}: ${score}`}
              {`(Modifier: ${modifier}) `}
              <Button onClick={() => onAttributeClick('increment', attribute)}>
                +
              </Button>
              <Button onClick={() => onAttributeClick('decrement', attribute)}>
                -
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
  border-radius: 5px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export default Attributes;
