
// անջատել scroll
const disableScroll = () => {
    const fixBlocks = document?.querySelectorAll('[data-fixed-block]');
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
    document.documentElement.style.scrollBehavior = 'auto';
    fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
    document.body.style.paddingRight = paddingOffset;
    document.body.classList.add('dis-scroll');
    document.body.dataset.position = pagePosition;
    document.querySelector('.header').style.top = `${pagePosition}px`;
    document.body.style.top = `-${pagePosition}px`;
}

// վերականգնել scroll
const enableScroll = () => {
    const fixBlocks = document?.querySelectorAll('[data-fixed-block]');
    const pagePosition = parseInt(document.body.dataset.position, 10);
    fixBlocks.forEach(el => { el.style.paddingRight = '0'; });
    document.body.style.paddingRight = '0px';
    document.body.style.top = '';
    document.querySelector('.header').style.top = 0;
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
    if (getComputedStyle(document.documentElement).scrollBehavior == 'smooth') {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

class Burger {
    constructor(burgerElem, options) {
        let defaultOptions = {
            marker: this.marker,
            fixed: {
                default: false,
                scrolling: this.scrolling,
            },
            media: {
                width: 'min',
                breakpoint: 768,
            },
            offsetSize: {
                maxHeight: '100%',
                maxWidth: '100%',
            },
            whichSide: {
                top: true,
                bottom: this.bottom,
                left: this.left,
                right: this.right
            }
        }
        this.options = Object.assign(defaultOptions, options);
        this.header = document.querySelector(`[data-burger-header="${burgerElem}"]`);
        this.nav = this.header?.querySelector('[data-burger-nav]');
        this.navItems = this.nav?.querySelectorAll('[data-burger-nav-item]');
        this.burger = this.header?.querySelector('[data-burger-btn]');
        this.mediaQuery = window.matchMedia(`(${this.options.media.width}-width: ${this.options.media.breakpoint}px)`);
        
        this.elemsClassNameActive = {
            nav: 'nav_open',
            burger: 'burger_active',
        }
        this.headerClickHandle = this.headerClickHandle.bind(this);
        this.documentEventKey = this.documentEventKey.bind(this);
        this.handleMediaChange = this.handleMediaChange.bind(this);

        this.mediaQuery.addEventListener('change', this.handleMediaChange);
        this.header.addEventListener('click', this.headerClickHandle);
        this.setOffsetSize()
        this.setWhichSide(true)
        this.getFixed();
        this.initMedia();
    }

    setOffsetSize () {
        this.nav.style.setProperty('--burger-nav-max-height', this.options.offsetSize.maxHeight);
        this.nav.style.setProperty('--burger-nav-max-width', this.options.offsetSize.maxWidth);
    }

    setWhichSide(open) {
        if (this.options.whichSide.top) {
            this.nav.style.setProperty('--burger-nav-top',open ? '-100%' : '0');
            this.nav.style.setProperty('--burger-nav-bottom',open ? '100%' : '0');
            this.nav.style.setProperty('--burger-nav-left', '0');
            this.nav.style.setProperty('--burger-nav-right', '0');
        }
        if (this.options.whichSide.bottom) {
            this.nav.style.setProperty('--burger-nav-bottom',open ? '-100%' : '0');
            this.nav.style.setProperty('--burger-nav-top',open ? '100%' : '0');
            this.nav.style.setProperty('--burger-nav-right', '0');
            this.nav.style.setProperty('--burger-nav-left', '0');
        }
        if (this.options.whichSide.left) {
            this.nav.style.setProperty('--burger-nav-left',open ? '-100%' : '0');
            this.nav.style.setProperty('--burger-nav-right',open ? '100%' : '0');
            this.nav.style.setProperty('--burger-nav-top', '0');
            this.nav.style.setProperty('--burger-nav-bottom', '0');
        }
        if (this.options.whichSide.right) {
            this.nav.style.setProperty('--burger-nav-right',open ? '-100%' : '0');
            this.nav.style.setProperty('--burger-nav-left',open ? '100%' : '0');
            this.nav.style.setProperty('--burger-nav-bottom', '0');
            this.nav.style.setProperty('--burger-nav-top', '0');
        }
    }

    getFixed() {
        if (this.options.fixed.default) {
            this.enableFixed()
        }

        if (this.options.fixed.scrolling) {
            if (window.scrollY > this.options.fixed.scrolling) {
                this.enableFixed()
            }
            else {
                this.disableFixed()
            }

            window.onscroll = () => {
                if (window.scrollY > this.options.fixed.scrolling) {
                    this.enableFixed()
                } else {
                    this.disableFixed()
                }
            }
        }
    }
    enableFixed() {
        this.header.classList.add('header_fixed');
        this.header.setAttribute('data-fixed-block', '');
        document.body.style.paddingTop = this.header.offsetHeight + "px";
    }
    disableFixed() {this.header.style.setProperty('padding-right', '0')
        this.header.classList.remove('header_fixed');
        this.header.removeAttribute('data-fixed-block');
        document.body.style.paddingTop = '';
    }

    mobileVersion() {
        if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
            this.nav.classList.contains(this.elemsClassNameActive.nav)) {
            disableScroll()
            this.nav.style.paddingTop = this.nav.closest('.header').offsetHeight + "px";
        }
    }

    desctopVersion() {
        this.nav.style.paddingTop = '';
        enableScroll();
    }
    initMedia() {
        if (this.mediaQuery.matches) {
            this.desctopVersion()
        } else {
            this.mobileVersion()
        }
    }
    handleMediaChange(event) {
        if (event.matches) {
            this.desctopVersion()
        } else {
            this.mobileVersion()
        }
    }

    documentEventKey(e) {
        if (e.key == "Escape") {
            this.navHide();
            console.log('key');
        }
    }

    navToggle(open) {
        this.burger?.classList.toggle(this.elemsClassNameActive.burger, open);
        this.nav?.classList.toggle(this.elemsClassNameActive.nav, open);
        this.burger?.setAttribute('aria-expanded', open.toString());
        this.burger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        this.nav.style.paddingTop = this.nav.closest('.header').offsetHeight + "px";
        
        if (open) {
            if (this.nav.style.getPropertyValue('--burger-nav-max-width').includes('%')) {
                this.nav.setAttribute('data-fixed-block', '');
            }
            
            disableScroll()
            document.body.addEventListener("keydown", this.documentEventKey);
            this.setWhichSide(false)
        } else {
            enableScroll()
            document.body.removeEventListener("keydown", this.documentEventKey);
            this.setWhichSide(true)
        }
    }
    navShow() { this.navToggle(true) }
    navHide() { this.navToggle(false) }
    headerClickHandle(e) {
        const currentNavItem = e.target.closest('.nav__item')
        if (e.target.closest('.burger')) {
            if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
                this.nav.classList.contains(this.elemsClassNameActive.nav)) {
                this.navHide();
            } else {
                this.navShow();
            }
        }
        if (currentNavItem) {
            if (this.options.marker === true) {
                this.navItems.forEach(item => { item.classList.remove('nav__item_active') })
                currentNavItem.classList.add('nav__item_active');
            }
            this.navHide();
        }
    }
}

new Burger('header')



// for (let i = 0; i < document.styleSheets.length; i++) {
//     const element = document.styleSheets[i];
//     if (element.href.includes('style.css')) {
//         const newRule = [...element.cssRules].find((r) => r.href.includes('./common.blocks/nav.css'));
//         console.log(newRule.styleSheet.cssRules[1].style);
//     }
// }