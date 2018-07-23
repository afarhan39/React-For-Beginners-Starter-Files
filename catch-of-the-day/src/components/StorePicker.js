import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getFunName } from '../helpers'

class StorePicker extends Component {
  myInput = React.createRef()

  static propTypes = {
    history: PropTypes.object
  }

  goToStore = event => {
    event.preventDefault()
    const storeName = this.myInput.value.value
    this.props.history.push(`/store/${storeName}`)
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          placeholder="Store name"
          required
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker
