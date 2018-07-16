# Advanced React Patterns

Advanced React Patterns is a Kent C. Dodds tutorial on various methods of sharing a component's internal state and bindings with implementers of that component. Each technique provides some way of using a closure inside the component definition to a function that is accessible for the user of the component.

The patterns are:

* Compound Components
* "Flexible" Compound Components
* Render Props
* State Reducer
* Control Props
* Provider Pattern
* Higher Order Components

## Compound Components

Compound Components are child components that are bound to the context/state of their parent component. The way an ```<option>``` element is bound to the value of a ```<select>``` in HTML.

These HTML elements are an excellent metaphor for Compound Components because any created option element has no binding to the instance of its parent until the parent renders and binds itself to its children. That is, the children are not created with access to the instance of the parent, the way a render prop component would be.

This makes a static method a semantically meaningful method for providing Compound Component children. It tells the user, "this component will be related to the parent, but it is clearly not yet bound to the instance".

One pattern for creating Compound Components is a static method that returns functional components (on the parent component class). The Compound Components are bound to the instance in the render method, by React.cloneElement. Other than this render binding, this is very similar to render props. And probably should have been introduced later, as an alternative to render props.

## Flexible Compound Components

Flexibile Compound Components are compound components that are created with in the context of the consumer of a React Context. The parent component is a context provider, so both elements must be created with a closure to the inital context value (probably in the parent component module file). This allows compound components to be rendered as grandchildren or deeper of the state holding component as the Provider and Consumer bindings are already included.

I'm not sure that I like the idea of having grandchild components acting as compound components because it breaks the select/option model for me, but I don't think there is anything specifically wrong with this pattern.

## Render Props

The Render Props pattern is the practice of passing a function to a component which the component uses to render its children.

The author of the parent component exposes an API via property or children, that will accept and execute a function, passing internal state getters and setters for use in the callback.

## State Reducer

A state reducer is a function passed into a component that the component runs before updating internal state, to manipulate state changes. The example involves checking a value on the calling component and optionally updating the state, accordingly.

## Control Props

Control Props allow a component to optionally control its own render values* via or allow the same values to be passed in via props. KCD references controlled inputs in React as a model for this pattern.

The exercise involves checking whether a value is passed in via props, and if not, creating a state property to be managed internally, and deciding how to update values, (ie whether to run setState). This is done without tracking props as state via lifecycle methods, (which is a good thing).

## Provider Pattern

The Provider Pattern exposes a context consumer as a static method of a parent component which includes the context provider in the render. I'm not sure how this differs from the "flexible" compound component.

## Higher Order Components

KCD makes a good case for always implementing higher order components as users of a render prop API underneath and I like that idea(use a powerful API, if needed, but a simple one, when possible; also eat your own dog food)

The exercise also highlights several props and values that need to be forwarded or created for children of HOCs.

* React.forwardRef
* hoistNonReactStatics
* Component.displayName: ``` HOCName.displayName = `withHOCName(${Component.displayName})` ```
* spread parent props in child ``` ...props ```
