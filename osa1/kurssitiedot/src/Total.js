import React from 'react';

const Total = (props) => {
    let total = 0;
    for(let i = 0; i < props.exercises.length; i++) {
        total += props.exercises[i];
    }
    
    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total;