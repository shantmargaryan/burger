# FullBurger

[example fullburger menu](https://vahanhovanisyan.github.io/burger/#).

A simple and lightweight JavaScript library for burger menu

## Peculiarities

+ __No dependencies__.  The library is written in pure JavaScript and does not require any other libraries to work.
+ __Simplicity and functionality__. You can easily and quickly connect and use a library that implements important functionality for the burger menu
+ __Availability__. The burger menu meets all accessibility rules.
+ __Customization with CSS__. You can easily change the appearance, layout using CSS.

## example of use in react js 
```javascript
useEffect(() => {
    new Fullburger('header', {});
  }, []);
```
and be sure to remove : 
```javascript 
  <React.StrictMode>
 ```

## How to work with the library

1. Download the latest version of the library
the page
```javascript
npm i fullburger
```

2. ways to connect the library 
```javascript
import Fullburger from 'fullburger';
import 'fullburger/style';
```
or

```javascript
const fullBurger = require('fullburger');
```

3. Place the following markup in your HTML document:

```html
<header class="header" data-burger-header="header">
  <div class="header__container">
    <a class="logo" href="#">
      Logo
    </a> 
    <nav class="nav" data-burger-nav title="navigation menu">
      <ul class="nav__list">
          <li class="nav__item" data-burger-nav-item>
              <a href="#" class="nav__link">home</a>
          </li>
          <li class="nav__item" data-burger-nav-item>
            <a href="#" class="nav__link">about</a>
          </li>
          <li class="nav__item" data-burger-nav-item>
              <a href="#" class="nav__link">contact</a>
          </li>
          <li class="nav__item" data-burger-nav-item>
            <a href="#" class="nav__link">blog</a>
          </li>
          <li class="nav__item" data-burger-nav-item>
            <a href="#" class="nav__link">price</a>
          </li>
          <li class="nav__item" data-burger-nav-item>
            <a href="#" class="nav__link">sign in</a>
          </li>
      </ul>
    </nav>
    <button class="burger" data-burger-btn aria-label="open menu" aria-expanded="false">
        <span class="burger__line burger__line_top"></span>
        <span class="burger__line burger__line_middle"></span>
        <span class="burger__line burger__line_bottom"></span>
    </button>
  </div>
</header>
```

4. if you want to use dropdown Place the following markup in your HTML document:

```html
<header class="header" data-burger-header="header">
  <div class="header__container">
    <a class="logo" href="#">
        Logo
    </a> 
    <nav class="nav" data-burger-nav title="navigation menu">
      <ul class="nav__list">
        <li class="nav__item dropdown" data-burger-nav-item>
          <a href="#" class="nav__link">home</a>
          <button class="dropdown-button"></button>
          <ul class="nav__sub-list dropdown-list">
              <li class="nav__sub-item">subitem</li>
              <li class="nav__sub-item dropdown">
                  <a href="#" class="nav__link">contact</a>
                  <button class="dropdown-button"></button>
                  <ul class="nav__sub-list dropdown-list">
                      <li class="nav__sub-item">subitem</li>
                      <li class="nav__sub-item dropdown">
                          <a href="#" class="nav__link">contact</a>
                          <button class="dropdown-button"></button>
                          <ul class="nav__sub-list dropdown-list ">
                              <li class="nav__sub-item">subitem</li>
                              <li class="nav__sub-item">
                                  <a href="#" class="nav__link">contact</a>
                              </li>
                              <li class="nav__sub-item">subitem</li>
                              <li class="nav__sub-item">subitem</li>
                          </ul>
                      </li>
                      <li class="nav__sub-item">subitem</li>
                      <li class="nav__sub-item">subitem</li>
                  </ul>
              </li>
              <li class="nav__sub-item">subitem</li>
              <li class="nav__sub-item dropdown">
                  <a href="#" class="nav__link">contact</a>
                  <button class="dropdown-button"></button>
                  <ul class="nav__sub-list dropdown-list ">
                      <li class="nav__sub-item">subitem</li>
                      <li class="nav__sub-item">
                          <a href="#" class="nav__link">contact</a>
                      </li>
                      <li class="nav__sub-item">subitem</li>
                      <li class="nav__sub-item">subitem</li>
                  </ul>
              </li>
          </ul>
        </li>
        <li class="nav__item" data-burger-nav-item>
          <a href="#" class="nav__link">about</a>
        </li>
        <li class="nav__item dropdown" data-burger-nav-item>
          <a href="#" class="nav__link">contact</a>
          <button class="dropdown-button"></button>
          <ul class="nav__sub-list dropdown-list">
              <li class="nav__sub-item">subitem</li>
              <li class="nav__sub-item">subitem</li>
              <li class="nav__sub-item">subitem</li>
              <li class="nav__sub-item">subitem</li>
          </ul>
        </li>
        <li class="nav__item" data-burger-nav-item>
          <a href="#" class="nav__link">blog</a>
        </li>
        <li class="nav__item" data-burger-nav-item>
          <a href="#" class="nav__link">price</a>
        </li>
        <li class="nav__item" data-burger-nav-item>
          <a href="#" class="nav__link">sign in</a>
        </li>
      </ul>
    </nav>
    <button class="burger" data-burger-btn aria-label="open menu" aria-expanded="false">
      <span class="burger__line burger__line_top"></span>
      <span class="burger__line burger__line_middle"></span>
      <span class="burger__line burger__line_bottom"></span>
    </button>
  </div>
</header>
```

`data-burger-header` - an important data attribute through which all interaction with the plugin works. The value of this attribute must be unique to the page.

you can change the background-color of the header by accessing this css variable `--header-color`, for example you can write this variable in css 
```css
:root{
--header-color:#fff;
}
```

## Place the following JS code to connect the Burger:

```javascript
const fullBurger = new Fullburger('header');
```

## The library supports nine parameters:

1. params `whichSide: top or left or right or bottom` - The WhichSide parameter affects which side the menu is displayed on

```javascript
Default

whichSide: {
  top: true
}
```

```javascript
const fullBurger = new Fullburger('header', {
  ...
  whichSide: {
    left: true
  },
  ...
});
```


2. params `position: top or left or right or bottom` - The position parameter affects which side
there will be a menu item.
This is clearly visible when the menu width or height is less than 100%.

```javascript
Default

position: {
  top: true
}.
```

```javascript
const fullBurger = new Fullburger('header', {
  ...
  position: {
    left: true
  },
  ...
});
```


3. params `offsetSize: maxWidth || maxHeight` - The offsetSize parameter affects the width and height of the menu. By the way, you can select any unit of measurement. 

```javascript
Default 

offsetSize: {
  maxHeight: '100vh',
  maxWidth: '100vw',
}.
```

```javascript
const fullBurger = new Fullburger('header', {
  ...
  offsetSize: {
    maxWidth: '70%',
    maxHeight: '100%'
  },
  ...
});
```


4. params `fixed: scrolling or defaultValue` - The fixed parameter affects the fixed state of the menu, using the "scrolling" property you can select from what distance the menu will be fixed.
Both are disabled by default.

```javascript
const fullBurger = new Fullburger('header', {
  ...
  fixed: {
      scrolling: 500,
      // defaultValue: true
  },
  ...
});
```


5. params `dropdown: click || hover` - The dropdown parameter affects the operation of the dropdown, the "click" property is needed so that the dropdown only opens when clicked without hovering, the "hover" property is so that the dropdown occurs with a hover effect, these two properties can be enabled together, even I recommend doing so a dropdown worked on all devices.
Both are disabled by default.

```javascript
const fullBurger = new Fullburger('header', {
  ...
  dropdown: {
      click: true,
      hover: true
  }
  ...
});
```


6. params `breakpoint: ...` - Setting a breakpoint affects the distance at which the hamburger button appears and disappears. Default media query (min-width: 768px).

```javascript
const fullBurger = new Fullburger('header', {
  ...
  breakpoint: 768,
  ...
});
```


7. params `overlay: true or false` - overlay affects whether an overlay will be present, Default overlay :false.

```javascript
const fullBurger = new Fullburger('header', {
  ...
  overlay: true,
  ...
});
```


8. params `speed: 1000` - The speed setting affects how long it takes for menus to appear or disappear. Default speed: 900

```javascript
const fullBurger = new Fullburger('header', {
  ...
  speed: 1000,
  ...
});
```
9. params `marker: true` - adds the active class to the clicked link in the menu.Default marker: false

```javascript
const fullBurger = new Fullburger('header', {
  ...
  marker: true,
  ...
});
```