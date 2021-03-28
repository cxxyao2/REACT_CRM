import "./App.css";
import React, { Component } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

import auth from "./services/authservice";
import Backdrop from "./components/Backdrop/Backdrop";
import configureStore from "./store/configureStore";
import Channel from "./components/Channel";
import ChannelReports from "./components/DashBoard/ChannelReports";
import VisitReports from "./components/DashBoard/VisitReports";
import Inventory from "./components/Inventory/Inventory";

import LoginForm from "./components/Auth/LoginForm";
import LogoutForm from "./components/Auth/LogoutForm";

import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import OrderDetails from "./components/Order/OrderDetails";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PlaceOrder from "./components/Order/PlaceOrder";

import ResetPassword from "./components/Auth/ResetPassword";
import RegisterForm from "./components/Auth/RegisterForm";
import SendResetEmail from "./components/Auth/SendResetEmail";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Toolbar from "./components/Toolbar/Toolbar";
import FooterBar from "./components/Toolbar/FooterBar";
import VisitCustomerForm from "./components/VisitCustomerForm";

const store = configureStore();

class App extends Component {
  state = {
    sideDrawerOpen: false,
    user: undefined,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <>
        <ToastContainer />
        <Provider store={store}>
          <div>
            <Toolbar
              drawerClickHandler={this.drawerToggleClickHandler}
              user={this.state.user}
              {...this.props}
            />
            <SideDrawer
              show={this.state.sideDrawerOpen}
              click={this.backdropClickHandler}
              user={this.state.user}
            />
            {backdrop}
            <main
              className="position-relative container  bg-white my-2 p-2 appMainw"
              id="topDiv"
            >
              <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <ProtectedRoute
                  exact
                  path="/orders"
                  component={PlaceOrder}
                ></ProtectedRoute>
                <ProtectedRoute
                  exact
                  path="/channels"
                  component={Channel}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/order-details"
                  exact
                  component={OrderDetails}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/admin/channels"
                  exact
                  component={ChannelReports}
                  user={this.state.user}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/admin/visits"
                  exact
                  component={VisitReports}
                ></ProtectedRoute>
                <Route path="/login" component={LoginForm}></Route>
                <ProtectedRoute
                  path="/admin/stocks"
                  component={Inventory}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/visits"
                  render={() => <VisitCustomerForm user={this.state.user} />}
                ></ProtectedRoute>
                <Route path="/register" component={RegisterForm}></Route>
                <Route path="/logout" component={LogoutForm}></Route>
                <Route path="/reset-password" component={ResetPassword}></Route>
                <Route
                  path="/send-reset-password-email"
                  component={SendResetEmail}
                ></Route>
                <Route path="/not-found" component={NotFound}></Route>
                <Redirect from="/home" exact to="/" />
                <Route path="*" component={NotFound}></Route>
              </Switch>
            </main>
            <FooterBar />
          </div>
        </Provider>
      </>
    );
  }
}

export default withRouter(App);
