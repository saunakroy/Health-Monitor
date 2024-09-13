import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const OutputComponent = ({ output }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <TypeAnimation
        sequence={[output, 1000, '']}
        speed={{ type: 'keyStrokeDelayInMs', value: 50 }} // Adjust speed as needed
        omitDeletionAnimation={true}
        style={{ fontSize: '1em', display: 'block', width: '100%' }}
      />
    </div>
  );
};

export default OutputComponent;
