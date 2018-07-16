// control props primer

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}

  toggle = () => {
    if (!this.hasProp('on')) { 
      this.setState(
        ({on}) => ({on: !on }),
        () => this.props.onToggle(this.state.on)
      )
    } else {
      this.props.onToggle(!this.props.on)
    }
  }

  hasProp = (key) => this.props[key] !== undefined

  render() {
    const stateSource = this.hasProp('on') ? this.props : this.state
    const {on} = stateSource
    return <Switch on={on} onClick={this.toggle} />
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
class Usage extends React.Component {
  state = {bothOn: false}
  handleToggle = on => {
    this.setState({bothOn: on})
  }
  render() {
    const {bothOn} = this.state
    const {toggle1Ref, toggle2Ref} = this.props
    return (
      <div>
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle1Ref}
          />
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle2Ref}
        />
      </div>
    )
  }
}
Usage.title = 'Control Props (primer)'

export {Toggle, Usage as default}
