document.addEventListener('DOMContentLoaded', function () {
    // VARIABLES
    let ww = window.outerWidth;
    let st = window.scrollY;
    let isScrolling = false;

    // $ELEMENTS
    const $header = document.querySelector('.header');
    const $customSelect = document.querySelectorAll('.custom-select');
    const $btnAllMenu = document.querySelector('.btn-allmenu');

    // FUNCTIONS
    const scroll = {
        calcScrollTop: function () {
            st = window.scrollY;
        },
        headerToggle: function () {
            if ($header) {
                $header.classList.toggle('active', window.scrollY > 0);
            }
        },
        handleScroll: function () {
            this.headerToggle();
            this.calcScrollTop();
        },
        init: function () {
            const checkScrolling = () => {
                if (!isScrolling) {
                    isScrolling = true;
                    requestAnimationFrame(() => {
                        this.handleScroll();
                        isScrolling = false;
                    });
                }
            };
            window.addEventListener('scroll', checkScrolling);
            window.addEventListener('wheel', checkScrolling);
        },
    };

    const resize = {
        calcScreenWidth: function () {
            ww = window.outerWidth;
        },
        handleResize: function () {
            this.calcScreenWidth();
        },
        init: function () {
            window.addEventListener('resize', this.handleResize.bind(this));
        },
    };

    const header = {
        allMenuToggle: function () {
            if ($btnAllMenu) {
                $btnAllMenu.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            }
        },
        init: function () {
            this.allMenuToggle();
        },
    };

    const customSelect = {
        toggleCustomSelect: function () {
            $customSelect.forEach(($select) => {
                const $subMenu = $select.querySelector('ul');
                if ($subMenu) {
                    $subMenu.style.maxHeight = '0';
                    $subMenu.style.overflow = 'hidden';
                }

                $select.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const siblings = Array.from($select.parentElement.children).filter((child) => child !== $select);
                    this.classList.toggle('active');

                    siblings.forEach((node) => {
                        node.classList.remove('active');
                        const $subMenu = node.querySelector('ul');
                        if ($subMenu) {
                            $subMenu.style.maxHeight = '0';
                        }
                    });

                    if ($subMenu) {
                        $subMenu.style.maxHeight = this.classList.contains('active') ? $subMenu.scrollHeight + 'px' : '0';
                    }
                });
            });
        },
        closeCustomSelect: function (event) {
            $customSelect.forEach(($select) => {
                if (!$select.contains(event.target)) {
                    $select.classList.remove('active');
                    const $subMenu = $select.querySelector('ul');
                    if ($subMenu) {
                        $subMenu.style.maxHeight = '0';
                    }
                }
            });
        },
        init: function () {
            this.toggleCustomSelect();
            document.addEventListener('click', this.closeCustomSelect.bind(this));
        },
    };

    // INITIALIZING
    scroll.init();
    resize.init();
    header.init();
    customSelect.init();
});
