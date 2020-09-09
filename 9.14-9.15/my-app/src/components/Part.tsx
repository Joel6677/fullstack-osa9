import React from 'react';
import { CoursePart } from '../App';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {

  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description} <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
        </p>
      );
    case 'My own': 
      return (
        <div>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;