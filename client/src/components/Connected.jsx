// import { useState } from 'react'

const Connected = (props) => {
  // const [publicKey, setPublicKey] = useState('')

  // async function publicKeyHandler(pbKey) {
  //   if (pbKey === '0x0013084E06229a6919C4A5a339ca9A2c5bD96472') {
  //     props.setResults(true)
  //   }
  // }

  return (
    <div className='connected-container'>
      <h1 className='connected-header'>You are Connected to Metamask</h1>
      {/* <p className='connected-account'>Metamask Account: {props.account}</p> */}
      <p className='connected-account'>Remaining Time: {props.remainingTime}</p>
    <div className='connected-container'>
      <h1 className='connected-header'>You are Connected to Metamask</h1>
      {/* <p className='connected-account'>Metamask Account: {props.account}</p> */}
      <p className='connected-account'>Remaining Time: {props.remainingTime}</p>
      {props.showButton ? (
        <p className='connected-account'>You have already voted</p>
      ) : (
        <div>
          <input
            type='number'
            type='number'
            className='index-input'
            placeholder='Enter Candidate Index'
            value={props.number}
            onChange={props.handleNumberChange}
          ></input>
          ></input>
          <br />
          <button className='login-button' onClick={props.voteFunction}>
          <button className='login-button' onClick={props.voteFunction}>
            Vote
          </button>
        </div>
      )}

      <table id='myTable' className='candidates-table'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate name</th>
            {/* <th>Candidate votes</th> */}
            {/* <th>Candidate votes</th> */}
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              {/* <td>{candidate.voteCount}</td> */}
              {/* <td>{candidate.voteCount}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/*props.remainingTime === 0 && (
        <>
          <h3>View Results</h3>
          <label>Enter your public key</label>
          <input
            type='text'
            className='public-key-input'
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <br />
          <button
            onClick={() => publicKeyHandler(publicKey)}
            className='login-button'
          >
            Submit
          </button>
        </>
      )*/}
    </div>
  )
}

export default Connected
