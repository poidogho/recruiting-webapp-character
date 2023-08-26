import { SKILL_LIST } from '../../consts';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
// import { attributeModifierPoints } from '../Util/HelperMethods';

const SkillCheck = ({ character }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [DC, setDC] = useState(0);
  const [skillCheckResults, setSkillCheckResults] = useState({});

  function performSkillCheck() {
    const skillPoints = character.skills[selectedSkill];
    const attributeModifier = SKILL_LIST.filter(
      (skill) => skill.name === selectedSkill
    )[0].attributeModifier;
    const modifierPoints = 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const totalPoints = skillPoints + modifierPoints;
    const passed = totalPoints + roll >= DC;

    setSkillCheckResults({
      skill: selectedSkill,
      totalPoints,
      dc: DC,
      roll,
      passed,
    });
  }

  return (
    <Container>
      <Header name='Skill Check' />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '25px',
        }}
      >
        <label>Skill: </label>
        <select
          value={selectedSkill}
          onChange={(event) => setSelectedSkill(event.target.value)}
        >
          {SKILL_LIST.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>

        <label>DC: </label>
        <input
          type='number'
          value={DC}
          onChange={(e) => setDC(e.target.value)}
        ></input>

        <button onClick={() => performSkillCheck()}>Roll</button>
      </div>

      {Object.keys(skillCheckResults).length !== 0 && (
        <div>
          <h4>Results</h4>

          <div>{`Skill: ${skillCheckResults.skill}: ${skillCheckResults.totalPoints}`}</div>
          <div>{`Roll: ${skillCheckResults.roll}`}</div>
          <div>{`DC: ${skillCheckResults.dc}`}</div>
          <div>{`Result: ${
            skillCheckResults.passed ? 'Passed' : 'Failed'
          }`}</div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`;

export default SkillCheck;
