// const loadingElement = document.querySelector('.loading');
// loadingElement.style.display = 'flex';

// const loading = {
//     init: function () {
//         window.addEventListener('load', function () {
//             // 스피너 확인 용 코드
//             setTimeout(() => {
//                 loadingElement.style.display = 'none';
//             }, 11111500);
//             // loadingElement.style.display = 'none';
//         });
//     },
// };
// loading.init();

document.addEventListener('DOMContentLoaded', function () {
    // VARIABLES
    let ww = window.outerWidth;
    let st = window.scrollY;
    let isScrolling = false;

    // CACHING
    const $header = document.querySelector('.header');
    const $footer = document.querySelector('.footer');
    const $customSelect = document.querySelectorAll('.custom-select');
    const $btnAllMenu = document.querySelector('.btn-allmenu');
    const $floatingMenu = document.querySelector('.floating-menu__container');
    const $topButton = document.querySelector('.btn-top');

    // FUNCTIONS
    const scroll = {
        updateScrollPosition() {
            st = window.scrollY;
            this.headerToggle();
            this.handleFloatingMenu();
        },
        headerToggle() {
            $header?.classList.toggle('active', st > 0);
        },
        handleFloatingMenu() {
            const footerTop = $footer.offsetTop;
            const screenBottom = st + window.innerHeight;

            $floatingMenu.classList.toggle('fixed', screenBottom >= footerTop);
            $floatingMenu.classList.toggle('active', st > 0);
        },
        init() {
            const checkScrolling = () => {
                if (!isScrolling) {
                    isScrolling = true;
                    requestAnimationFrame(() => {
                        this.updateScrollPosition();
                        isScrolling = false;
                    });
                }
            };
            window.addEventListener('scroll', checkScrolling);
            window.addEventListener('wheel', checkScrolling);
        },
    };

    const resize = {
        updateWindowWidth() {
            ww = window.outerWidth;
            console.log(ww);
        },
        init() {
            window.addEventListener('resize', this.updateWindowWidth.bind(this));
        },
    };

    const header = {
        init() {
            if ($btnAllMenu) {
                $btnAllMenu.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            }
        },
    };

    const customSelect = {
        initSubMenu($subMenu) {
            $subMenu.style.height = '0';
            $subMenu.style.visibility = 'hidden';
        },
        toggleCustomSelect() {
            $customSelect.forEach(($select) => {
                const $subMenu = $select.querySelector('ul');
                if ($subMenu) this.initSubMenu($subMenu);

                $select.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.handleCustomSelect($select);
                });
            });
        },
        handleCustomSelect($select) {
            const siblings = Array.from($select.parentElement.children).filter((child) => child !== $select);
            $select.classList.toggle('active');

            siblings.forEach((node) => {
                node.classList.remove('active');
                const siblingSubMenu = node.querySelector('ul');
                if (siblingSubMenu) this.hideSubMenu(siblingSubMenu);
            });

            const currentSubMenu = $select.querySelector('ul');
            if (currentSubMenu) {
                this[$select.classList.contains('active') ? 'showSubMenu' : 'hideSubMenu'](currentSubMenu);
            }
        },
        showSubMenu(subMenu) {
            subMenu.style.visibility = 'visible';
            subMenu.style.height = `${subMenu.scrollHeight}px`;
        },
        hideSubMenu(subMenu) {
            subMenu.style.height = '0';
            subMenu.addEventListener(
                'transitionend',
                () => {
                    if (subMenu.style.height === '0px') {
                        subMenu.style.visibility = 'hidden';
                    }
                },
                { once: true }
            );
        },
        closeCustomSelect(event) {
            $customSelect.forEach(($select) => {
                if (!$select.contains(event.target)) {
                    $select.classList.remove('active');
                    const $subMenu = $select.querySelector('ul');
                    if ($subMenu) this.hideSubMenu($subMenu);
                }
            });
        },
        init() {
            this.toggleCustomSelect();
            document.addEventListener('click', this.closeCustomSelect.bind(this));
        },
    };

    const footer = {
        scrollTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        init() {
            if ($topButton) {
                $topButton.addEventListener('click', this.scrollTop.bind(this));
            }
        },
    };

    // INITIALIZING
    scroll.init();
    resize.init();
    header.init();
    customSelect.init();
    footer.init();
});
