import React from 'react'
import {connect} from 'react-redux'
import { AllProducts  } from './AllProducts'
/**
 * COMPONENT
 */
export const Home = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email.split("@")[0]}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.auth.email
  }
}

export default connect(mapState)(Home)
