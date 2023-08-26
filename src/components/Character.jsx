import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Header from './header';
import Classes from './classes';
import Attributes from './attributes';
import Skills from './skills';
import SkillCheck from './skillCheck';
import Requirements from './requirements';
import { CLASS_LIST } from '../consts';
import {
  calModifier,
  initialSkillsState,
  initialAttributes,
  calculateMaxSkillsScore,
} from '../utils';

const Character = ({ count, saveAllCharacters }) => {
  const maxPoints = 70;
  const [attributes, setAttributes] = useState(initialAttributes);
  const [character, setCharacter] = useState(undefined);
  const [requirements, setRequirements] = useState(false);
  const [name, setName] = useState('');

  const [displayRed, setDisplayRed] = useState({
    Barbarian: false,
    Wizard: false,
    Bard: false,
  });

  const [skills, setSkills] = useState(initialSkillsState({ attributes }));

  const totalPoints = Object.keys(attributes).reduce((acc, curr) => {
    return acc + attributes[curr].score;
  }, 0);

  const shouldDisplayRed = useCallback(
    (type) => {
      for (const value of Object.keys(CLASS_LIST)) {
        const char = CLASS_LIST[value][type];
        console.log(value, type, char, attributes[type].score);
        if (attributes[type].score > char) {
          setDisplayRed({
            ...displayRed,
            [value]: true,
          });
        } else {
          setDisplayRed({
            ...displayRed,
            [value]: false,
          });
        }
      }
    },
    [attributes, displayRed]
  );

  const config = [
    {
      character: 'Barbarian',
      isRed: displayRed['Barbarian'],
      onclick: () => displayRequirements(CLASS_LIST.Barbarian, 'Barbarian'),
    },
    {
      character: 'Bard',
      isRed: displayRed['Bard'],
      onclick: () => displayRequirements(CLASS_LIST.Bard, 'Bard'),
    },
    {
      character: 'Wizard',
      isRed: displayRed['Wizard'],
      onclick: () => displayRequirements(CLASS_LIST.Wizard, 'Wizard'),
    },
  ];

  const displayRequirements = (char, name) => {
    setCharacter(char);
    setRequirements(true);
    setName(name);
  };

  const onAttributeClick = (type, attribute) => {
    const currAttribute = attributes[attribute];
    const score =
      type === 'increment' ? currAttribute.score + 1 : currAttribute.score - 1;
    if (totalPoints < maxPoints) {
      setAttributes({
        ...attributes,
        [attribute]: {
          ...currAttribute,
          score,
          modifier: calModifier(score),
        },
      });
    } else {
      alert('You have exceeded the maximum number of points');
    }

    setSkills(initialSkillsState({ attributes }));
    // shouldDisplayRed(attribute);
  };

  const onSkillClick = (type, index) => {
    const currSkill = skills[index];
    const modifiedSkill = {
      ...currSkill,
      total: type === 'increment' ? currSkill.total + 1 : currSkill.total - 1,
    };
    const newSkills = [...skills];
    newSkills[index] = modifiedSkill;

    // Check if the total is greater than the max
    let total = 0;
    const maxScore = calculateMaxSkillsScore(modifiedSkill.modifier);
    newSkills.forEach((skill) => {
      if (skill.attributeModifier === newSkills[index].attributeModifier) {
        total += skill.total;
      }
    });

    if (total <= maxScore) setSkills(newSkills);
    else
      alert(
        `You need more skill points! Upgraded ${modifiedSkill.attributeModifier.toLowerCase()} to get more`
      );
  };

  const apiAttributes = Object.keys(attributes).reduce((acc, attribute) => {
    const { score } = attributes[attribute];

    return {
      ...acc,
      [attribute]: score,
    };
  }, {});

  const apiSkills = skills.reduce((acc, skill) => {
    const { name, total } = skill;

    return {
      ...acc,
      [name]: total,
    };
  }, {});

  const saveCharacters = async (count) => {
    const results = saveAllCharacters(count, {
      attributes: apiAttributes,
      skills: apiSkills,
    });

    return results;
  };

  return (
    <Section>
      <Header name={`Character: ${count}`} />
      <SkillCheck />
      <Container>
        <Attributes
          attributes={attributes}
          onAttributeClick={onAttributeClick}
        />
        <Classes config={config} />
        {character && requirements ? (
          <Requirements
            onclick={(value) => setRequirements(value)}
            character={character}
            name={name}
          />
        ) : null}
        <Skills skills={skills} onSkillClick={onSkillClick} />
      </Container>{' '}
    </Section>
  );
};

const Section = styled.div`
  padding: 10px;
  text-align: center;
  border: 1px solid black;
`;

const Container = styled.div`
  margin: 2rem 1rem;
  display: flex;
  padding: 1px;
`;

export default Character;
