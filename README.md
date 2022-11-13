## react-router-dom-last-location

Fork version of [react-router-last-location](https://github.com/hinok/react-router-last-location) but for react-router v6
- Provides access to the last location in `react` + `react-router (v6.x)` applications.
- Hooks, `useLastLocation`.
- Handle redirects.
- TypeScript
- Useful for handling internal routing.
- Easily keep your users inside your app.

## Note: Last location != Previous browser history state

This library only returns the location that was active right before the recent location change, during the lifetime of the current window.

This means, it is not equal to the "location you were at before navigating to this history state".

In other words, the location this library provides is not necessarily the same as the one when you click the browser's back button.

**Example 1**

1. Visit `/`: last location = `null`, previous browser history state = `null`
2. Visit `/a`: last location = `/`, previous browser history state = `/`
3. Visit `/b`: last location = `/a`, previous browser history state = `/a`
4. Reload (url will stay at `/b`): last location = `null`, previous browser history state = `/a`

**Example 2**

1. Visit `/`: last location = `null`
2. Visit `/a`: last location = `/`
3. Visit `/b`: last location = `/a`
4. Go back: last location = `/b`, previous browser history state = `/`

**Example 3**

1. Visit `/`: last location = `null`
2. Visit `/a`: last location = `/`
3. Visit `/b`: last location = `/a`
4. Visit `/c`: last location = `/b`
4. Go back to `/a` (by selecting that state explicitly in "Go back" browser dropdown that is visible upon clicking it with right mouse button): last location = `/c`, previous browser history state = `/`

## Installation

```sh
# npm
npm install react react-router-dom history react-router-dom-last-location --save
# yarn
yarn add react react-router-dom history react-router-dom-last-location

```

### Declare `<LastLocationProvider />` inside `<Router />`.

`index.js`

```jsx
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-dom-last-location';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Logger from './components/Logger';
const App = () => (
  <Router>
    <LastLocationProvider>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </div>
    </LastLocationProvider>
  </Router>
);
render(<App />, document.getElementById('root'));
```

### Use hook `useLastLocation` to get `lastLocation`.

```jsx
import React from 'react';
import { useLastLocation } from 'react-router-dom-last-location';
const Logger = () => {
  const lastLocation = useLastLocation();
  return (
    <div>
      <h2>Logger!</h2>
      <pre>
        {JSON.stringify(lastLocation)}
      </pre>
    </div>
  );
};
export default LoggerHooks;
```

### Use `RedirectWithoutLastLocation` to not store redirects as last location

```jsx
import React from 'react';
import { RedirectWithoutLastLocation } from 'react-router-dom-last-location';
const MyPage = () => (
  <RedirectWithoutLastLocation to="/" />
);
export default MyPage;
```

You can still use a regular `<Navigate to="/" replace />` component from `react-router`.

If you do, you'll  then you need to manually pass the `state: { preventLastLocation: true }`, like below:

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
const MyPage = () => (
  <Navigate
    to={{ pathname: '/' }}
    state={{ preventLastLocation: true }}
    replace
  />
);
export default MyPage;
```

## LastLocationProvider

### Props

**`watchOnlyPathname`**, type: `boolean`, default: `false`

Stores the last route only when `pathname` has changed.

## TODO:
- Add unit test
- Add github actions
