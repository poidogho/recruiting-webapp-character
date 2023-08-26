import React from 'react';
import styled from 'styled-components';
import Header from '../header';
import Button from '../button';

const Skills = ({ skills, onSkillClick }) => {
  return (
    <Container>
      <Header name='Skills' />
      <Paragraph>Total skill points available</Paragraph>
      <List>
        {skills.map((skill, idx) => {
          const { name, attributeModifier } = skill;
          return (
            <li key={idx}>
              {`${name}: ${skill.score}`}
              {`(Modifier: ${attributeModifier}) ${skill.modifier}`}
              <Button onClick={() => onSkillClick('increment', idx)}>+</Button>
              <Button onClick={() => onSkillClick('decrement', idx)}>-</Button>
              {`total: ${skill.total}`}
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
  padding: 0 20px;
  border-radius: 5px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  line-height: 1.5;
`;

const Paragraph = styled.p`
  margin: 0;
`;

export default Skills;
