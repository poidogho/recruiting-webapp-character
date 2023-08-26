import { CLASS_LIST, SKILL_LIST } from './consts';

export const calModifier = (score) => {
  if (score >= 10) {
    return Math.floor((score - 10) / 2);
  }
  return -1 * Math.ceil((10 - score) / 2);
};

export const initialSkillsState = ({ attributes }) =>
  SKILL_LIST.map((skill) => {
    const { attributeModifier } = skill;
    const modifier = attributes[attributeModifier].modifier;

    return {
      ...skill,
      modifier,
      total: modifier,
      score: 0,
    };
  });

const modifier = 0;
const score = 10;
export const initialAttributes = {
  Strength: {
    modifier,
    score,
  },
  Dexterity: {
    modifier,
    score,
  },
  Constitution: {
    modifier,
    score,
  },
  Intelligence: {
    modifier,
    score,
  },
  Wisdom: {
    modifier,
    score,
  },
  Charisma: {
    modifier,
    score,
  },
};

export const calculateMaxSkillsScore = (modifier) => {
  return 10 + 4 * modifier;
};
