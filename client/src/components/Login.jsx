const Login = (props) => {
  return (
    <div className='login-container'>
      <h1>Welcome to decentralised voting application</h1>
      <button onClick={props.connectWallet}>Login to Metamask</button>
    </div>
  )
}

export default Login
