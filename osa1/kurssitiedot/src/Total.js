import React from 'react';

const Total = (props) => {
    let total = 0;
    for(let i = 0; i < props.parts.length; i++) {
        total += props.parts[i].exercises;
    }
    
    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total;