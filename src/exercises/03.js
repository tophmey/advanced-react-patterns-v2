// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

// Right now our component can only clone and pass props to immediate children.
// So we need some way for our compound components to implicitly accept the on
// state and toggle method regardless of where they're rendered within the
// Toggle component's "posterity" :)
//
// The way we do this is through context. React.createContext is the API we
// want. Here's a simple example of that API:
//
// const defaultValue = 'light'
// const ThemeContext = React.createContext(defaultValue)
//
// ...
// <ThemeContext.Provider value={this.state}>
//   {this.props.children}
// </ThemeContext.Provider>
// ...
//
// ...
// <ThemeContext.Consumer>
//   {value => <div>The current theme is: {value}</div>}
// </ThemeContext.Consumer>
// ...

// 🐨 create a ToggleContext with React.createContext here
const defaultState = { on: false, toggle: () => {} }
const ToggleContext = React.createContext(defaultState)

class Toggle extends React.Component {

  state = {
    on: false,
  }

  onToggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => { this.props.onToggle(this.state.on) }
    )
  }

  static On = ({ children }) => <ToggleContext.Consumer>{({ on }) => on ? children : null }</ToggleContext.Consumer>
  static Off = ({ children }) => <ToggleContext.Consumer>{({ on }) => !on ? children : null }</ToggleContext.Consumer>
  static Button = (props) => <ToggleContext.Consumer>{({ on, toggle }) => <Switch on={on} onClick={toggle} {...props} /> }</ToggleContext.Consumer>

  render() {
    return <ToggleContext.Provider value={{on: this.state.on, toggle: this.onToggle }}>
      {this.props.children}
    </ToggleContext.Provider>
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
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
