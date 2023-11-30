(function () {
    const classListElem = {
        header: 'header',
        headerActive: 'header_active',
        nav: 'nav',
        navOpen: 'nav_open',
        navItems: 'nav__item',
        burgerBtn: 'burger',
        burgerBtnActive: 'burger_active',
    }
    const header = document.querySelector(`.${classListElem.header}`);
    const nav = document.querySelector(`.${classListElem.nav}`);
    const navItems = document.querySelectorAll(`.${classListElem.navItems}`);
    const burger = document.querySelector(`.${classListElem.burgerBtn}`);

    const documentEventKey = (e) => {
        if (e.key == "Escape") {
            navHide();
        }
    }

    const navShow = () => {
        burger?.classList.toggle(`${classListElem.burgerBtnActive}`);
        // setTimeout(() => {
        //     burger?.focus();
        // }, 300);
        nav?.classList.add(`${classListElem.navOpen}`);
        header.classList.add(`${classListElem.headerActive}`);
        nav.style.paddingTop = header.offsetHeight + "px";
        burger?.setAttribute('aria-expanded', 'true');
        burger?.setAttribute('aria-label', 'Close menu');
        disableScroll();
        document.addEventListener("keydown", documentEventKey)
    }

    const navHide = () => {
        burger.classList.remove(`${classListElem.burgerBtnActive}`);
        nav?.classList.remove(`${classListElem.navOpen}`);
        setTimeout(() => {
            header.classList.remove(`${classListElem.headerActive}`);
        }, 300);
        nav.style.paddingTop = "";
        burger?.setAttribute('aria-expanded', 'false');
        burger?.setAttribute('aria-label', 'Open menu');
        enableScroll();
        // setTimeout(() => {
        // }, 300);
        document.removeEventListener("keydown", documentEventKey)
    }

    navItems?.forEach(el => {
        el.addEventListener('click', () => {
            navHide();
        });
    });

    const burgerClickHandle = function (event) {
        if (event.target.closest(`.${classListElem.burgerBtn}`)) {
            navShow();
        }
        if (!burger.classList.contains(`${classListElem.burgerBtnActive}`)) {
            navHide();
        }
    }
    burger.addEventListener("click", burgerClickHandle);

    window.matchMedia('(min-width: 768px)').addEventListener("change", (e) => {
        if (e.matches) {
            nav.style.paddingTop = "";
            header.classList.remove(`${classListElem.headerActive}`);
            enableScroll();
        } else {
            nav.style.paddingTop = header.offsetHeight + "px";
            if (burger.matches(`.${classListElem.burgerBtnActive}`)) {
                disableScroll();
                header.classList.add(`${classListElem.headerActive}`);
            }
        }
        return false;
    });
})();

// անջատել scroll
const disableScroll = () => {
    const fixBlocks = document?.querySelectorAll('.fixed-block');
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)}px`;
    document.documentElement.style.scrollBehavior = 'none';
    fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
    document.body.style.paddingRight = paddingOffset;
    document.body.classList.add('dis-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = `-${pagePosition}px`;
}

// վերականգնել scroll
const enableScroll = () => {
    const fixBlocks = document?.querySelectorAll('.fixed-block');
    const pagePosition = parseInt(document.body.dataset.position, 10);
    fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
    document.body.style.paddingRight = '0px';
    document.body.style.top = 'auto';
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
    document.documentElement.style.scrollBehavior = 'smooth';
}