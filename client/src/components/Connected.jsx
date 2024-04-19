const Connected = (props) => {
  return (
    <div>
      <h1>Voting in progress</h1>
      {/* <p>Metamask account : {props.account}</p> */}
      <p>Remaining time : {props.remainingTime}</p>

      {props.showButton ? (
        <p className='connected-account'>You have already voted</p>
      ) : (
        <div>
          <input
            className='index-input'
            type='number'
            placeholder='Enter Candidate Index'
            value={props.number}
            onChange={props.handleNumberChange}
          />
          <br />
          <button className='vote-button' onClick={props.voteFunction}>
            Vote
          </button>
        </div>
      )}

      <table id='myTable' className='candidates-table'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate name</th>
            <th>Candidate votes</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Connected
