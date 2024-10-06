class Burger {
    constructor(fullBurgerElem, options) {
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
        this.header = document.querySelector(fullBurgerElem);
        this.headerContainer = this.header.querySelector('.fullburger-container');
        this.logo = document.querySelector('.fullburger-logo');
        this.nav = this.header?.querySelector('.fullburger-nav');
        this.navList = this.nav?.querySelector('.fullburger-list');
        this.navItems = this.nav?.querySelectorAll('.fullburger-item');
        this.navSubItems = this.navList?.querySelectorAll('.fullburger-sub-item');
        this.burger = document.querySelector('.fullburger-button');
        this.mediaQuery = window.matchMedia(`(min-width: ${this.options.breakpoint}px)`);

        this.elemsClassNameActive = {
            nav: 'fullburger-nav_open',
            burger: 'fullburger-button_active',
        }
        document.body.style.setProperty('--burger-speed', `${this.options.speed}ms`)
        this.nav.setAttribute('title', 'navigation menu');
        this.burger.setAttribute('aria-label', 'open menu');
        this.burger.setAttribute('aria-expanded', 'false');

        this.documentEventKey = this.documentEventKey.bind(this);
        this.handleMediaChange = this.handleMediaChange.bind(this);
        this.mediaQuery.addEventListener('change', this.handleMediaChange);
        this.headerClick = this.headerHandle.bind(this);
        this.header.addEventListener('click', this.headerClick);
        this.burgerHandle();
        this.logoHandle();

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

    disableScroll() {
        const fixBlocks = document?.querySelectorAll('[data-fixed-block]');
        const pagePosition = window.scrollY;
        const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
        document.documentElement.style.scrollBehavior = 'auto';
        fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
        document.body.style.paddingRight = paddingOffset;
        document.body.classList.add('dis-scroll');
        document.body.dataset.position = pagePosition;
        document.querySelector('.fullburger').style.top = `${pagePosition}px`;
        document.body.style.top = `-${pagePosition}px`;
    }

    enableScroll() {
        const fixBlocks = document?.querySelectorAll('[data-fixed-block]');
        const pagePosition = parseInt(document.body.dataset.position, 10);
        fixBlocks.forEach(el => { el.style.paddingRight = '0'; });
        document.body.style.paddingRight = '0px';
        document.body.style.top = '';
        document.querySelector('.fullburger').style.top = 0;
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
    calcBurgerSize(open) {
        const burgerLines = this.burger.querySelectorAll('span');
        burgerLines[0].style.transform = open ? `translateY(${(this.burger.offsetHeight / 2) - (burgerLines[0].offsetHeight / 2)}px) rotate(45deg)` : 'translateY(0) rotate(0)';
        burgerLines[2].style.transform = open ? `translateY(${(this.burger.offsetHeight / -2) - (burgerLines[2].offsetHeight / -2)}px) rotate(-45deg)` : 'translateY(0) rotate(0)';
    }
    navToggle(open) {
        this.calcBurgerSize(open);
        this.header.classList.toggle('fullburger_active', open);
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
            return;
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
        this.header.classList.add('fullburger_fixed');
        this.header.setAttribute('data-fixed-block', '');
        document.body.style.paddingTop = this.header.offsetHeight + "px";
    }
    disableFixed() {
        this.header.style.setProperty('padding-right', '0')
        this.header.classList.remove('fullburger_fixed');
        this.header.removeAttribute('data-fixed-block');
        document.body.style.paddingTop = '';
    }
    mobileVersion() {
        this.getOffsetSize(true);
        this.getOverlay(true);
        this.setPosition()
        this.header.classList.remove('fullburger_desktop');
        this.burger.classList.add('fullburger-button_show');
        this.nav.classList.remove('fullburger-nav_desktop');

        if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
            this.nav.classList.contains(this.elemsClassNameActive.nav)) {
            this.disableScroll();
        }
        this.nav.style.paddingTop = this.nav.closest('.fullburger').offsetHeight + "px";
        this.nav.setAttribute('data-fixed-block', '');
    }
    desktopVersion() {
        this.header.classList.add('fullburger_desktop');
        this.nav.classList.add('fullburger-nav_desktop');
        this.burger.classList.remove('fullburger-button_show')
        this.nav.style.paddingTop = '';
        this.enableScroll();
        this.getOffsetSize(false);
        this.getOverlay(false);
    }
    initMedia() {
        this.mediaQuery.matches ? this.desktopVersion() : this.mobileVersion();
    }
    handleMediaChange(event) {
        event.matches ? this.desktopVersion() : this.mobileVersion();
    }
    documentEventKey(e) {
        e.key === "Escape" && this.navHide();
    }
    getOverlay(open) {
        if (!this.options.overlay) return;
        const overlay = document.createElement('div');
        overlay.classList.add('fullburger-overlay');
        this.headerContainer = this.header?.querySelector('.fullburger-container');

        !open && this.header?.querySelector('.fullburger-overlay')?.remove();
        open && this.headerContainer?.append(overlay);
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
                    if (currentParent.classList.contains('fullburger-list')) break;
                    if (currentParent.nodeName === "UL") parents.push(currentParent);
                    currentParent = currentParent.parentNode;
                }
            }
            const subMenu = document.querySelectorAll('.fullburger-list ul');
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
            if (!event.target.closest('.fullburger-list')) {
                closeAllSubMenu();
                document.removeEventListener("click", clickOutsideDropdown);
            }
        }
        // click on document outside dropdown
        document.addEventListener("click", clickOutsideDropdown);

        // mouse leave on document outside dropdown
        // this.navList.addEventListener('mouseleave', closeAllSubMenu)
    }
    // controlDropdownHaveArrowKey(event) {
    //     const buttonIndex = Array.from(this.navSubItems).indexOf(event.target);
    //     const offset = event.code === 'ArrowUp' ? -1 : event.code === 'ArrowDown' ? 1 : 0;
    //     const nextIndex = (buttonIndex + offset + this.navSubItems.length) % this.navSubItems.length;
    //     this.navSubItems[nextIndex].focus();
    // }

    burgerHandle() {
        this.burger.addEventListener('click', () => {
            if (this.burger.classList.contains(this.elemsClassNameActive.burger) &&
                this.nav.classList.contains(this.elemsClassNameActive.nav)) this.navHide()
            else this.navShow();
        })
    }

    logoHandle() {
        this.logo.addEventListener('click', () => this.navHide())
    }

    headerHandle(e) {
        const currentNavItem = e.target.closest('.fullburger-item');
        const currentNavLink = e.target.closest('.fullburger-link');

        // click to .nav__link
        if (currentNavLink) {
            if (this.options.marker) {
                this.navItems.forEach(item => item.classList.remove('fullburger-item_active'));
                currentNavItem.classList.add('fullburger-item_active');
            }
            const subMenu = document.querySelectorAll('.dropdown-list');
            const subButtons = this.navList.querySelectorAll('.dropdown-button');
            subButtons.forEach(button => button.classList.remove('dropdown-button-active'))
            subMenu.forEach(menu => menu.classList.remove('dropdown-list-active'));
            this.navHide();
        }
        // click to overlay
        e.target.closest('.fullburger-overlay') && this.navHide();
    }
}