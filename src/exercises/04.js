// render props

import React from 'react'
import {Switch} from '../switch'

// we're back to basics here. Rather than compound components,
// let's use a render prop!
class Toggle extends React.Component {
  state = { on: false }

  handleToggle = () => {
    this.setState(
      ({on}) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  render() {
    const { on } = this.state
    const renderProps = {
      on,
      toggle: this.handleToggle
    }
    return typeof this.props.children === 'function' ? this.props.children(renderProps) : React.cloneElement(this.props.children, renderProps)
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
      {({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Render Props'

export {Toggle, Usage as default}
