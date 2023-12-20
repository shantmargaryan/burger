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
            breakpoint: 768,
            offsetSize: {
                maxHeight: '100%',
                maxWidth: '100%',
            },
            whichSide: {
                top: true,
                bottom: this.bottom,
                left: this.left,
                right: this.right
            },
            speed: 900,
            overlay: false
        }
        this.options = Object.assign(defaultOptions, options);
        this.header = document.querySelector(`[data-burger-header="${burgerElem}"]`);
        this.nav = this.header?.querySelector('[data-burger-nav]');
        this.navItems = this.nav?.querySelectorAll('[data-burger-nav-item]');
        this.burger = this.header?.querySelector('[data-burger-btn]');
        this.mediaQuery = window.matchMedia(`(min-width: ${this.options.breakpoint}px)`);

        this.elemsClassNameActive = {
            nav: 'nav_open',
            burger: 'burger_active',
        }
        this.header.style.setProperty('--burger-speed', `${this.options.speed}ms`)
        this.headerClickHandle = this.headerClickHandle.bind(this);
        this.documentEventKey = this.documentEventKey.bind(this);
        this.handleMediaChange = this.handleMediaChange.bind(this);
        this.mediaQuery.addEventListener('change', this.handleMediaChange);
        this.header.addEventListener('click', this.headerClickHandle);
        this.setWhichSide(true)
        this.getFixed();
        this.initMedia();
    }

    navToggle(open) {
        this.header.classList.toggle('header_active', open)
        this.burger?.classList.toggle(this.elemsClassNameActive.burger, open);
        this.nav?.classList.toggle(this.elemsClassNameActive.nav, open);
        this.burger?.setAttribute('aria-expanded', open.toString());
        this.burger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    navShow() {
        this.navToggle(true);
        if (this.nav.style.getPropertyValue('max-width').includes('%')) {
            this.nav.setAttribute('data-fixed-block', '');
        }
        disableScroll()
        document.body.addEventListener("keydown", this.documentEventKey);
        this.setWhichSide(false);
        this.getOffsetSize(true);
    }

    navHide() {
        this.navToggle(false);
        enableScroll();
        document.body.removeEventListener("keydown", this.documentEventKey);
        this.setWhichSide(true);
    }

    getOffsetSize(open) {
        if (open) {
            this.nav.style.setProperty('max-height', this.options.offsetSize.maxHeight);
            this.nav.style.setProperty('max-width', this.options.offsetSize.maxWidth);
        } else {
            this.nav.style.removeProperty('max-height');
            this.nav.style.removeProperty('max-width');
        }

    }

    setWhichSide(open) {
        if (this.options.whichSide.top) {
            this.nav.style.setProperty('top', open ? '-100%' : '0');
            this.nav.style.setProperty('bottom', open ? '100%' : '0');
            this.nav.style.setProperty('left', '0');
            this.nav.style.setProperty('right', '0');
        }
        if (this.options.whichSide.bottom) {
            this.nav.style.setProperty('bottom', open ? '-100%' : '0');
            this.nav.style.setProperty('top', open ? '100%' : '0');
            this.nav.style.setProperty('right', '0');
            this.nav.style.setProperty('left', '0');
        }
        if (this.options.whichSide.left) {
            this.nav.style.setProperty('left', open ? '-100%' : '0');
            this.nav.style.setProperty('right', open ? '100%' : '0');
            this.nav.style.setProperty('top', '0');
            this.nav.style.setProperty('bottom', '0');
        }
        if (this.options.whichSide.right) {
            this.nav.style.setProperty('right', open ? '-100%' : '0');
            this.nav.style.setProperty('left', open ? '100%' : '0');
            this.nav.style.setProperty('bottom', '0');
            this.nav.style.setProperty('top', '0');
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
    disableFixed() {
        this.header.style.setProperty('padding-right', '0')
        this.header.classList.remove('header_fixed');
        this.header.removeAttribute('data-fixed-block');
        document.body.style.paddingTop = '';
    }
    mobileVersion() {
        this.getOffsetSize(true);
        this.getOverlay(true);
        this.header.classList.remove('header_desctop');
        this.headerContainer.append(this.burger)
        this.nav.classList.remove('nav_desctop');
        if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
            this.nav.classList.contains(this.elemsClassNameActive.nav)) {
            disableScroll();
        }
        this.nav.style.paddingTop = this.nav.closest('.header').offsetHeight + "px";
    }
    desctopVersion() {
        this.header.classList.add('header_desctop');
        this.nav.classList.add('nav_desctop');
        this.burger.remove();
        this.nav.style.paddingTop = '';
        enableScroll();
        this.getOffsetSize(false);
        this.getOverlay(false);
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
        if (e.key === "Escape") {
            this.navHide();
            console.log('key');
        }
    }
    getOverlay(open) {
        if (this.options.overlay) {
            const overlay = document.createElement('div');
            overlay.classList.add('header__overlay');
            this.headerContainer = this.header?.querySelector('.header__container');
            if (!open) {
                this.header?.querySelector('.header__overlay')?.remove();
            }
            if (open) {
                this.headerContainer?.append(overlay);
            }
        }
    }
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
                this.navItems.forEach(item => {item.classList.remove('nav__item_active') });
                currentNavItem.classList.add('nav__item_active');
            }
            this.navHide();
        }
        if (e.target.closest('.header__overlay')) {
            this.navHide();
        }
    }
}