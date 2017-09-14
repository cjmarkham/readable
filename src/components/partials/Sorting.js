import React from 'react';

const Sorting = (props) => {
  return (
    <div>
      <select
        defaultValue="voteScore"
        ref={input => this.sort = input}>
        <option value="voteScore">Votes</option>
        <option value="timestamp">Created</option>
      </select>
      &nbsp;
      <select
        defaultValue="desc"
        ref={input => this.direction = input}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      &nbsp;
      <button
        className="btn btn-xs btn-primary"
        onClick={e => props.onSort(this.sort.value, this.direction.value)}>
        Sort
      </button>
    </div>
  )
}

export default Sorting;
