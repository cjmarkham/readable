import React from 'react';
import ArrowDown from 'react-icons/lib/fa/angle-down';
import ArrowUp from 'react-icons/lib/fa/angle-up';

const Voting = ({ object, onVoteUp, onVoteDown }) => {
  return (
    <div className="text-center voting">
      <ArrowUp onClick={onVoteUp} size={24} />
      <p>{ object.voteScore }</p>
      <ArrowDown onClick={onVoteDown} size={24} />
    </div>
  )
}

export default Voting;
