## @wakeupingear/react

Lots of neat universal components to quickly make a site feel good.

This assumes you're using TailwindCSS.

It also exports the `@radix-ui/themes` library, which is a nice foundation for a lot of these patterns. Some components here use Radix; others will use the ShadCN wrappers around Radix.

## Components

### `<Button />`

### `<Expandable />`
Wrapper component that animates the expansion of its children.
The component shows/hides when the truthiness of the `children` prop changes. When `false`, the last truthy value of `children` is displayed during the closing animation.

#### Params

* `props.children` - The content to be displayed.
* `props.className` - The class name to be applied to the container.
* `props.duration` - The duration of the animation in milliseconds.
* `props.expandedClassName` - The class name to be applied to the container when expanded.
* `props.fitWidth` - Whether the content should fit the width of the container.
* `props` - The component props.

#### Returns

The JSX element.
 

### `<Icon_Loading />`

### `<Input />`

### `<Label />`

### `<SubmitRow />`

### `<Transition />`



(file autogenerated w/ jsdoc reflection :D)