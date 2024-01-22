class Burger {
    constructor(burgerElem, options) {
        let defaultOptions = {
            marker: this.marker,
            dropdown: {
                click: this.click,
                hover: this.hover
            },
            fixed: {
                defaultValue: this.defaultValue,
                scrolling: this.scrolling,
            },
            breakpoint: 768,
            offsetSize: {
                maxHeight: '100vh',
                maxWidth: '100vw',
            },
            whichSide: {
                top: true,
                bottom: this.bottom,
                left: this.left,
                right: this.right
            },
            position: {
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
        this.headerContainer = this.header.querySelector('.header__container');
        this.nav = this.header?.querySelector('[data-burger-nav]');
        this.navList = this.nav?.querySelector('.nav__list');
        this.navItems = this.nav?.querySelectorAll('[data-burger-nav-item]');
        this.burger = this.header?.querySelector('[data-burger-btn]');
        this.mediaQuery = window.matchMedia(`(min-width: ${this.options.breakpoint}px)`);

        this.elemsClassNameActive = {
            nav: 'nav_open',
            burger: 'burger_active',
        }
        this.header.style.setProperty('--burger-speed', `${this.options.speed}ms`)

        this.documentEventKey = this.documentEventKey.bind(this);
        this.handleMediaChange = this.handleMediaChange.bind(this);
        this.mediaQuery.addEventListener('change', this.handleMediaChange);
        this.headerClick = this.headerHandle.bind(this);
        this.header.addEventListener('click', this.headerClick);

        if (window.matchMedia('(pointer:coarse)').matches || this.options.dropdown.click && !this.options.dropdown.hover) {
            this.drop = this.dropdownHandle.bind(this);
            this.navList.addEventListener('click', this.drop);
        }
        if (window.matchMedia(`(pointer: fine) and (hover: hover)`).matches && this.options.dropdown.hover) {
            this.dropdowns = this.navList.querySelectorAll('.dropdown');
            this.dropdowns.forEach(drop => {
                drop.classList.add('dropdown-hover');
            })
        }

        this.setWhichSide(true);
        this.getFixed();
        this.initMedia();
    }

    // անջատել scroll
    disableScroll() {
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
    enableScroll() {
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

    navToggle(open) {
        this.header.classList.toggle('header_active', open);
        this.burger?.classList.toggle(this.elemsClassNameActive.burger, open);
        this.nav?.classList.toggle(this.elemsClassNameActive.nav, open);
        this.burger?.setAttribute('aria-expanded', open.toString());
        this.burger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    navShow() {
        this.navToggle(true);
        this.disableScroll()
        document.body.addEventListener("keydown", this.documentEventKey);
        this.setWhichSide(false);
        this.setPosition();
    }
    navHide() {
        this.navToggle(false);
        this.enableScroll();
        document.body.removeEventListener("keydown", this.documentEventKey);
        this.setWhichSide(true);
        this.setPosition();
    }
    getOffsetSize(open) {
        if (open) {
            this.nav.style.setProperty('--max-height', this.options.offsetSize.maxHeight);
            this.nav.style.setProperty('--max-width', this.options.offsetSize.maxWidth);
        } else {
            this.nav.style.removeProperty('--max-height');
            this.nav.style.removeProperty('--max-width');
        }
    }
    setWhichSide(open) {
        const { top, bottom, right, left } = this.options.whichSide;
        top && this.nav.style.setProperty('inset', ` ${open ? '-100%' : 0} 0 ${open ? '100%' : 0} 0`);
        bottom && this.nav.style.setProperty('inset', ` ${open ? '100%' : 0} 0 ${open ? '-100%' : 0} 0`);
        left && this.nav.style.setProperty('inset', `0 ${open ? '100%' : 0} 0 ${open ? '-100%' : 0}`);
        right && this.nav.style.setProperty('inset', `0 ${open ? '-100%' : 0} 0 ${open ? '100%' : 0}`);
    }
    setPosition() {
        const { top, bottom, right, left } = this.options.position;
        top && this.nav.style.setProperty('bottom', 'auto');
        bottom && this.nav.style.setProperty('top', 'auto');
        left && this.nav.style.setProperty('right', 'auto');
        right && this.nav.style.setProperty('left', 'auto');
    }
    getFixed() {
        const { scrolling, defaultValue } = this.options.fixed;
        defaultValue && this.enableFixed();
        if (scrolling) {
            window.scrollY > scrolling ? this.enableFixed() : this.disableFixed();
            window.onscroll = () => window.scrollY > scrolling ? this.enableFixed() : this.disableFixed();
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
        this.setPosition()
        this.header.classList.remove('header_desctop');
        this.headerContainer.append(this.burger);
        this.nav.classList.remove('nav_desctop');

        if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
            this.nav.classList.contains(this.elemsClassNameActive.nav)) {
            this.disableScroll();
        }
        this.nav.style.paddingTop = this.nav.closest('.header').offsetHeight + "px";
        this.nav.setAttribute('data-fixed-block', '');

    }
    desctopVersion() {
        this.header.classList.add('header_desctop');
        this.nav.classList.add('nav_desctop');
        this.burger.remove();
        this.nav.style.paddingTop = '';
        this.enableScroll();
        this.getOffsetSize(false);
        this.getOverlay(false);
    }
    initMedia() {
        this.mediaQuery.matches ? this.desctopVersion() : this.mobileVersion();
    }
    handleMediaChange(event) {
        event.matches ? this.desctopVersion() : this.mobileVersion();
    }
    documentEventKey(e) {
        e.key === "Escape" && this.navHide();
    }
    getOverlay(open) {
        if (this.options.overlay) {
            const overlay = document.createElement('div');
            overlay.classList.add('header__overlay');
            this.headerContainer = this.header?.querySelector('.header__container');

            !open && this.header?.querySelector('.header__overlay')?.remove();
            open && this.headerContainer?.append(overlay);
        }
    }
    dropdownHandle(e) {
        if (!e.target.closest('.dropdown-button')) return;
        const dropdownList = e.target.closest('.dropdown').querySelector('.dropdown-list');
        closeAllSubMenu(dropdownList);
        e.target.closest('.dropdown').classList.toggle('dropdown-active');
        e.target.classList.toggle('dropdown-button-active');
        dropdownList.classList.toggle('dropdown-list-active');
        // function to close all submenus
        function closeAllSubMenu(current = null) {
            const parents = [];
            if (current) {
                let currentParent = current.parentNode;
                while (currentParent) {
                    if (currentParent.classList.contains('nav__list')) break;
                    if (currentParent.nodeName === "UL") parents.push(currentParent);
                    currentParent = currentParent.parentNode;
                }
            }
            const subMenu = document.querySelectorAll('.nav__list ul');
            subMenu.forEach(menu => {
                if (menu != current && !parents.includes(menu)) {
                    menu.classList.remove('dropdown-list-active');
                    const dropdownButton = menu.parentNode.querySelector('.dropdown-button');
                    if (dropdownButton && !menu.classList.contains('dropdown-list-active')) {
                        dropdownButton.classList.remove('dropdown-button-active');
                        menu.parentNode.classList.remove('dropdown-active');
                    }
                }
            });
        }
        const clickOutsideDropdown = (event) => {
            if (!event.target.closest('.nav__list')) {
                closeAllSubMenu();
                document.removeEventListener("click", clickOutsideDropdown);
            }
        }
        // click on document outside dropdown
        document.addEventListener("click", clickOutsideDropdown);

        // mouse leave on document outside dropdown
        // this.navList.addEventListener('mouseleave', closeAllSubMneu)
    }
    headerHandle(e) {
        const currentNavItem = e.target.closest('.nav__item');
        const currentNavLink = e.target.closest('.nav__link');
        // click to burger button
        if (e.target.closest('.burger')) {
            if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
                this.nav.classList.contains(this.elemsClassNameActive.nav)) {
                this.navHide();
            } else {
                this.navShow();
            }
        }
        // click to .nav__link
        if (currentNavLink) {
            if (this.options.marker) {
                this.navItems.forEach(item => item.classList.remove('nav__item_active'));
                currentNavItem.classList.add('nav__item_active');
            }
            const subMenu = document.querySelectorAll('.dropdown-list');
            const subButtons = this.navList.querySelectorAll('.dropdown-button');
            subButtons.forEach(button => button.classList.remove('dropdown-button-active'))
            subMenu.forEach(menu => menu.classList.remove('dropdown-list-active'));
            this.navHide();
        }
        // click to overlay
        e.target.closest('.header__overlay') && this.navHide();
    }
}