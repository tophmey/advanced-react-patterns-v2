// prop collections

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = { on: false }

  handleToggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  togglerProps = {}

  render() {
    return this.props.children({ on: this.state.on, toggle: this.toggle, togglerProps: { onClick: this.handleToggle, 'aria-expanded': this.state.on } })
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, togglerProps}) => (
        <div>
          <Switch on={on} {...togglerProps} />
          <hr />
          <button aria-label="custom-button" {...togglerProps}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Prop Collections'

export {Toggle, Usage as default}
