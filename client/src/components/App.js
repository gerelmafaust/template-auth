import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/notFound";
import Navbar from "./Navbar";
import AuthService from "../services/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentView: "app"
    };
    this.changeView = this.changeView.bind(this);
    // this.createUser = this.createUser.bind(this);
  }
  changeView(view) {
    this.setState({ currentView: view });
  }

  componentDidMount() {
    const user = AuthService.getLoggedUser();
    if (user) this.setState({ user });
  }

  componentDidUpdate() {
    if (this.state.currentView === "signup") {
      //alert ("did");
      this.changeView("ChatApp");
      const user = AuthService.getLoggedUser();
      if (user) this.setState({ user });
    }
  }

  render() {
    console.log(this.state.currentView);

    return (
      <div>
        <ToastContainer />
        <Navbar
          user={this.state.user.username}
          onChangeValue={this.handleChange}
        />
        <Switch>
          <Route
            path="/signup"
            render={props => <Signup {...props} onView={this.changeView} />}
          />
          <Route path="/login" component={Login} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/home" render={props => <Home />} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
