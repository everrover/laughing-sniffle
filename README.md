# \[Any suggestions or improvement on this small humble endaevour is welcome. Willing to learn and grow here, as we all are😊\]

# A very basic demo of *React hooks*, *Flux model* and *Basics of using observers with React hooks*

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.(the only tested mode)
Open [http://localhost:3020](http://localhost:3020) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### Associated article [\[link\]](https://www.everrover.com/articles/observers-in-react-vbasic)

> **Use navbar to navigate to the associated demo page.**

### Intersection observer 

Simple block loading effect within the screen. 
The blocks far above and far below the view will stay faded out(via opacity transition from 1 to 0) and will have their opacity restored when they come in view. 

#### Other practical use-cases

- Lazy loading elements when they come in view(eg: images, posts, etc)
- Lazy loading imports when they come in view
- Data grabbing
- Auto-play and auto-pause videos when they come in view


> Others might be there but I couldn't think of any. As and when I continue by dev journey, I'll know more and hence I'll add more.

### Resize observer

This observer will only allow `ciel(viewport-width/image_width)` number of images to display at a time. Simple.

### Mutation observer

#### Some points
- Any one of the `essential`'s should be selected or else observer will not work
- The actual config being used is on display at the bottom of the page
- `CharacterData`
  - *Parent list* text can be editted if `CharacterData` is selected
  - To view mutation events `Subtree` should be selected. Since `CharacterData` only monitors root level text by default.
  - Select `CharacterDataOldValue` to see old value of text before mutation
  - Ignore the following warning for now. It's just a demo after all.
  ```
  Warning: A component is `contentEditable` and contains `children` managed by React.
  ```
- `ChildData`
  - `Subtree` selection does what it does. Allows us to monitor child list elements
  - By default only monitors parent list elements
- `Attributes`
  - Allows monitoring of three attributes
    - `data-green`
    - `data-blue`
    - `data-red`
  - Select via element above **Add/Remove entry** button
  - Colors will only show after first selection and if `Attributes` is selected
  - Monitoring will only happen if both `Attributes` and `Subtree` are selected. Since `Attributes` only monitors root level attributes by default
  - Select `AttributeOldValue` to see old value of attributes in `entry` before mutation
  - `AttributeFilter` is to be used to monitor only specific attributes. The list is comma separated. (eg: `data-green, data-blue`). The space after comma is required.

### Context reducer

- Four level hierarchy is present
  - `Alpha` element is where reducer, context and state is defined
  - `Parent` element is where **count** is shown. Data is fetched via `useContext` hook
  - `Child` element is where **count** is incremented via a button. `Reducer` dispatch is fetched via `useContext` hook
  - `SubChild` element is where **count** is decremented via a button. `Reducer` dispatch is fetched via `useContext` hook
