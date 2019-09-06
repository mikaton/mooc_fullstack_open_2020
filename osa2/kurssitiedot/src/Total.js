import React from 'react';

const Total = ({ parts }) => {
    
    const total = parts
        .map(part => part = part.exercises)
        .reduce((summa, exercises) => summa += exercises, 0);

    return (
        <strong>Total of {total} excercises</strong>
    );
}

export default Total;