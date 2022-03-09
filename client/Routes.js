import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts'
import { me } from './store'
import SingleProduct from './components/SingleProduct'
import AccountInfo from './components/AccountInfo';
import Cart from './components/Cart';
import UserList from './components/UserList';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    console.log(" // [ Routes Component ] - this.props: ", this.props)
    const { isLoggedIn, isAdmin } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path='/login' exact component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            <Route exact path="/accountinfo" component={AccountInfo} />
            <Route exact path="/cart" component={Cart} />
            {isAdmin ? <Route exact path="/users" component={UserList} /> : ""}

          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log("// [Routes Component - mapstate] state: ", state)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
