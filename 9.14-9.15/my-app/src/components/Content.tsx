import React from 'react';
import { CoursePart } from '../App';

import Part from './Part';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts
}) => {

  return (
    <>
        {courseParts.map(coursePart => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};

export default Content;