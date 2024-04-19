const Finished = (props) => {
  return (
    <div>
      <h1>Voting is Finished</h1>
      <h2>Results</h2>
      <table id='myTable' className='candidates-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Finished
