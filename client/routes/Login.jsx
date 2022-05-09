const React = require('react');

class Login extends React.Component {
  render(){
    return (
      <div class="usercred-box">
        <div class="usercred-title">Book Exchange</div>
        <form class="usercred-form">
          <input type="text" placeholder="username" name="username" required />
          <input type="password" placeholder="password" name="password" required />
          <input type="submit" value="Log in"/>
        </form>
      </div>
    )
  }
}

export default Login;








