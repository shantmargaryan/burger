
// անջատել scroll
const disableScroll = () => {
    const fixBlocks = document?.querySelectorAll('[data-fixed-block]');
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
    document.documentElement.style.scrollBehavior = 'none';
    fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
    document.body.style.paddingRight = paddingOffset;
    document.body.classList.add('dis-scroll');
    document.body.dataset.position = pagePosition;
    // document.querySelector('.header').style.top = `${pagePosition}px`;
    document.body.style.top = `-${pagePosition}px`;
}

// վերականգնել scroll
const enableScroll = () => {
    const fixBlocks = document?.querySelectorAll('[data-fixed-block]');
    const pagePosition = parseInt(document.body.dataset.position, 10);
    fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
    document.body.style.paddingRight = '0px';
    document.body.style.top = 'auto';
    // document.querySelector('.header').style.top = 0;
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
    document.documentElement.style.scrollBehavior = 'smooth';
}

class Burger {
    constructor(burgerElem, options) {
        let defaultOptions = {
            marker: this.marker,
            fixed: {
                default: this.default,
                scrolling: this.scrolling,
            },
            media: {
                width: 'min',
                breakpoint: 768,
            }
        }
        this.options = Object.assign(defaultOptions, options);
        this.header = document.querySelector(`[data-burger="${burgerElem}"]`);
        this.nav = this.header?.querySelector('.nav');
        this.navItems = this.nav?.querySelectorAll('.nav__item');
        this.burger = this.header?.querySelector('.burger');
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
        this.getFixed();
        this.initMedia();
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
    disableFixed() {
        this.header.classList.remove('header_fixed');
        this.header.removeAttribute('data-fixed-block');
        document.body.style.paddingTop = '';
    }

    mobileVersion() {
        if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
            this.nav.classList.contains(this.elemsClassNameActive.nav)) {
            disableScroll()
        }
    }

    desctopVersion() {
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
        this.nav.style.top = open ? this.nav.closest('.header').offsetHeight + "px" : '';
        if (open) {
            this.nav.setAttribute('data-fixed-block', '');
            disableScroll()
            document.body.addEventListener("keydown", this.documentEventKey);
        } else {
            enableScroll()
            document.body.removeEventListener("keydown", this.documentEventKey);
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

new Burger('header', {
    marker: true,
    fixed: {
        scrolling: 400
    }
})