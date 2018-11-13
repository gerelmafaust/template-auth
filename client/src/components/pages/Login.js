import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/authService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  async handleClick(e) {
    e.preventDefault();
    try {
      await AuthService.login(this.state.email, this.state.password);
      const { loc } = this.props.location;
      window.location = loc ? loc.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = "user ist schon da";
        this.setState({ errors });
      }
    }
  }
  render() {
    if (AuthService.getLoggedUser()) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="Login" id="form-container">
          <h2>Login</h2>
          <form>
            Email: <br />
            <input
              type="text"
              value={this.state.email}
              onChange={e => this.handleInputChange("email", e)}
            />{" "}
            <br />
            Password: <br />
            <input
              type="password"
              value={this.state.password}
              onChange={e => this.handleInputChange("password", e)}
            />{" "}
            <br />
            <button className="sl-btn" onClick={e => this.handleClick(e)}>
              Login
            </button>
            <p>
              or go to
              <Link className="sl-link" to="/signup">
                {" "}
                Signup
              </Link>
            </p>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
