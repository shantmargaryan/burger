# FullBurger

A simple and lightweight JavaScript library for accordion

## Peculiarities

+ __No dependencies__.  The library is written in pure JavaScript and does not require any other libraries to work.
+ __Simplicity and functionality__. You can easily and quickly connect and use a library that implements important functionality for the accordion
+ __Availability__. The accordion meets all accessibility rules.
+ __Customization with CSS__. You can easily change the appearance, layout using CSS.

## How to work with the library

1. Download the latest version of the library
2. Connect accordion.min.css and accordion.min.js from the dist folder to the page
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
4. Place the following markup in your HTML document:
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

### Important nuance

You can create positioning styles only for the child element accordion__content, for example for accordion__body
1. margin
2. padding
3. position and so on
```html
<ul class="accordion" data-acordion="accordion">
	<li class="accordion__item">
    <button class="accordion__button">button</button>
    <div class="accordion__collapse">
      <div class="accordion__content">
        <div class="accordion__body">
          You can create positioning styles for the accordion__body element
        </div>
      </div>
    </div>
  </li>
</ul>  
```

`data-burger-header` - an important data attribute through which all interaction with the plugin works. The value of this attribute must be unique to the page.

4. Place the following JS code to connect the accordion:

```javascript
const burger = new Burger('header');
```

## The library supports eight parameters:

1. params `whichSide: top or left or right or bottom` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  whichSide: {
    right: true
  },
  ...
});
```

2. params `position: top or left or right or bottom` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  position: {
    left: true
  },
  ...
});
```

3. params `offsetSize: vh or vw or % or px` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  offsetSize: {
    maxWidth: '70%',
    maxHeight: '100%'
  },
  ...
});
```

4. params `fixed: scrolling or defaultValue ` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  fixed: {
      scrolling: 500,
      // defaultValue: true
  },
  ...
});
```

5. params `dropdown: click or hover ` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  dropdown: {
      click: true,
      hover: true
  }
  ...
});
```

6. params `breakpoint: 768 ` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  breakpoint: 768,
  ...
});
```

7. params `overlay: true or false ` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  overlay: true,
  ...
});
```

8. params `speed: 1000 ` - affects the speed of the accordion

```javascript
const burger = new Burger('header', {
  ...
  speed: 1000,
  ...
});
```

You can see an example of how the library works by opening the index.html file from the demo folder in the browser.

Enjoy!