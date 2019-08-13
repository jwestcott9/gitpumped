import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import UserInfo from "./pages/UserInfo";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import { Container } from 'reactstrap';



function App() {
  return (
      <Router>
        <>
          <TopNav />
          
          
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path = "/UserInfo" render = {(props) => <UserInfo {...props} />}/>
              <Route component= {NoMatch} />
            </Switch>
          </div>
                 </>
      </Router>
  );
}

export default App;
