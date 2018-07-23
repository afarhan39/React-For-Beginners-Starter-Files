import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  }

  state = {
    email: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this })
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.email
      })
    }

    this.setState({
      email: authData.user.email,
      owner: store.owner || authData.user.email
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({
      email: null
    })
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>

    if (!this.state.email) {
      return <Login authenticate={this.authenticate} />
    }

    if (this.state.email !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner we looking for!</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample</button>
      </div>
    )
  }
}

export default Inventory
