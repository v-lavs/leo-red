// Initialization module

import NiceSelect from "nice-select2";

export function init() {
    // Обов'язково реєструємо плагін

    gsap.registerPlugin(ScrollTrigger);

    //=====================================================================
    // SETTINGS HEADER
    //=====================================================================

    function initHeader() {
        const header = document.querySelector('.header');

        if (!header) return null;

        const isInitialLight = header.classList.contains('header_light');

        let lastScroll = 0;

        const panelState = {
            search: false,
            categories: false,
            burger: false
        };

        const headerTween = gsap.to(header, {
            yPercent: -100,
            duration: 0.3,
            ease: 'power2.out',
            paused: true
        });

        function updateTheme(currentScroll = window.scrollY) {
            if (isInitialLight) {
                header.classList.add('header_light');
                return;
            }

            const hasOpenPanels = Object.values(panelState).some(Boolean);

            if (hasOpenPanels) {
                header.classList.add('header_light');
                return;
            }

            const isScrollingUp =
                currentScroll < lastScroll &&
                currentScroll > 100;

            header.classList.toggle('header_light', isScrollingUp);
        }

        function setPanelState(name, state) {
            panelState[name] = state;
            updateTheme();
        }

        window.addEventListener('scroll', () => {
            let currentScroll =
                window.pageYOffset ||
                document.documentElement.scrollTop;

            if (currentScroll < 0) currentScroll = 0;

            if (currentScroll > lastScroll && currentScroll > 100) {
                headerTween.play();
            } else if (currentScroll < lastScroll) {
                headerTween.reverse();
            }

            updateTheme(currentScroll);

            lastScroll = currentScroll;
        });

        return {
            setPanelState
        };
    }

    //====================================================================
    //SEARCH PANEL
    //====================================================================
    function initSearch(header) {
        const panel = document.querySelector('.h-search');

        if (!panel) return null;

        const content = panel.querySelector('.search-form');

        let isOpen = false;

        const tl = gsap.timeline({
            paused: true
        });

        tl.set(panel, {
            pointerEvents: 'auto'
        });

        // Панель зверху
        tl.fromTo(
            panel,
            {
                y: -140,
                autoAlpha: 0
            },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power3.out'
            }
        );

        // Контент справа
        if (content) {
            tl.fromTo(
                content,
                {
                    x: 80,
                    autoAlpha: 0
                },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'power4.out'
                },
                '-=0.2'
            );
        }

        tl.eventCallback('onReverseComplete', () => {
            gsap.set(panel, {
                pointerEvents: 'none'
            });
        });

        function open() {
            if (isOpen) return;

            isOpen = true;

            gsap.set(panel, {
                pointerEvents: 'auto'
            });

            header.setPanelState('search', true);

            tl.play();
        }

        function close() {
            if (!isOpen) return;

            isOpen = false;

            header.setPanelState('search', false);

            tl.reverse();
        }

        return {
            open,
            close,
            isOpen: () => isOpen
        };
    }

    //=====================================================================
    // CATEGORY MEGA-MENU
    //=====================================================================
    function initCategories(header) {
        const panel = document.querySelector('.h-mega-menu');

        if (!panel) return null;

        const cards = panel.querySelectorAll('.category-card');

        let isOpen = false;

        const tl = gsap.timeline({
            paused: true
        });

        tl.set(panel, {
            pointerEvents: 'auto'
        });

        // Панель зверху
        tl.fromTo(
            panel,
            {
                y: -140,
                autoAlpha: 0
            },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.25,
                ease: 'power1.out'
            }
        );

        // Картки справа
        tl.fromTo(
            cards,
            {
                x: 80,
                autoAlpha: 0,
                scale: 0.96
            },
            {
                x: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power1.out'
            },
            '-=0.2'
        );

        tl.eventCallback('onReverseComplete', () => {
            gsap.set(panel, {
                pointerEvents: 'none'
            });
        });

        function open() {
            if (isOpen) return;

            isOpen = true;

            gsap.set(panel, {
                pointerEvents: 'auto'
            });

            header.setPanelState('categories', true);

            tl.play();
        }

        function close() {
            if (!isOpen) return;

            isOpen = false;

            header.setPanelState('categories', false);

            tl.reverse();
        }

        return {
            open,
            close,
            isOpen: () => isOpen
        };
    }

    //загальний ховер
    function bindHover(trigger, panel, instance) {
        let timeout;

        const open = () => {
            clearTimeout(timeout);
            instance.open();
        };

        const close = () => {
            timeout = setTimeout(() => {
                instance.close();
            }, 120);
        };

        trigger?.addEventListener('mouseenter', open);
        panel?.addEventListener('mouseenter', open);

        trigger?.addEventListener('mouseleave', close);
        panel?.addEventListener('mouseleave', close);
    }

    const header = initHeader();

    const search = initSearch(header);
    const categories = initCategories(header);

    const searchTrigger = document.querySelector('.btn_open-search');
    const searchPanel = document.querySelector('.h-search');

    const categoriesTrigger = document.querySelector('.btn_open-megamenu');
    const categoriesPanel = document.querySelector('.h-mega-menu');

    bindHover(searchTrigger, searchPanel, search);
    bindHover(categoriesTrigger, categoriesPanel, categories);
    // клік на кнопку
    searchTrigger?.addEventListener('click', () => {
        if (!search.isOpen()) {
            categories.close();
            search.open();
        } else {
            search.close();
        }
    });
    categoriesTrigger?.addEventListener('click', () => {
        if (!categories.isOpen()) {
            search.close();
            categories.open();
        } else {
            categories.close();
        }
    });


    //=====================================================================
    // SECTION BANNER ANIMATION
    //=====================================================================
    function initHeroAnimation() {

        if (!document.querySelector(".animation-view")) return;
        ScrollTrigger.config({ignoreMobileResize: true});

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".animation-view",
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
// 1. Вмикаємо тарілку
        tl.set(".canvas-container", {display: "flex"}, 0);
// 2. Твій рідний стабільний clipPath для банера
        tl.to(".section-banner.hero-layer.-front", {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "none",
            duration: 1
        }, 0);

        tl.to(".banner-mask-wrapper", {
            height: "0%",       // Стискаємо шторку знизу вгору до нуля
            ease: "none",
            duration: 1
        }, 0);
// 3. Синхронно відкриваємо тарілку
        tl.fromTo(".canvas-container",
            {clipPath: "inset(100% 0% 0% 0%)"},
            {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                duration: 1
            }, 0);
// 3D логіка
        if (typeof my3DModel !== 'undefined') {
            tl.to(my3DModel, {
                rotationY: Math.PI * 2,
                duration: 1,
                ease: "none",
            }, 0);
        }

// Вимикач для третьої секції
        if (document.querySelector(".next-section")) {
            ScrollTrigger.create({
                trigger: ".next-section",
                start: "top top",
                onEnter: () => {
                    gsap.set(".canvas-container", {display: "none"});
                },
                onLeaveBack: () => {
                    gsap.set(".canvas-container", {display: "flex"});
                }
            });
        }
    }

//==============================================================================
//  SECTION-ABOUT MEDIA STAGGER
//  ============================================================================
    function initBaselineAnim() {
        const baselineSection = document.querySelector("#about-trigger");
        if (!baselineSection) return;

        const mediaItems = baselineSection.querySelectorAll(".baseline__wrapper-item img");

        gsap.set(mediaItems, {opacity: 0, scale: 0, y: 40});

        gsap.to(mediaItems, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
            stagger: 0.6,
            scrollTrigger: {
                trigger: baselineSection,
                start: "top 50%",
                toggleActions: "play none none none",
            }
        });
    }

//  ============================================================================
//  SLIDER PARTNERS
//  ============================================================================
    function initSliderPartners() {

        if (!document.querySelector('.partner-marquee')) return;

        new Splide('.partner-marquee', {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            arrows: false,
            pagination: false,
            autoWidth: true,
            gap: '10px',
            clones: 30,
            autoScroll: {
                speed: 1,
                pauseOnHover: false,
                pauseOnFocus: false,
            },
        }).mount(window.splide.Extensions);
    }

//=============================================================================
//    TABS
//=============================================================================
    function initTabs() {
        const tabs = document.querySelector('[data-tabs]');

        if (tabs) {
            const buttons = tabs.querySelectorAll('.tabs-nav__link');
            const contents = tabs.querySelectorAll('.tab-content');
            const indicator = tabs.querySelector('.tab-active-border');
            const navContainer = tabs.querySelector('.tabs__nav');

            // Примусово розтягуємо контейнер на 100% і вмикаємо флекс, як вимагає дизайн
            if (navContainer) {
                navContainer.style.display = 'flex';
                navContainer.style.width = '100%';
            }

            const moveIndicator = (button) => {
                if (!indicator || !navContainer) return;

                const buttonRect = button.getBoundingClientRect();
                const navRect = navContainer.getBoundingClientRect();

                // Отримуємо чистий padding контейнера, щоб анулювати будь-які системні зсуви
                const navStyle = window.getComputedStyle(navContainer);
                const navPaddingLeft = parseFloat(navStyle.paddingLeft) || 0;

                // Вираховуємо ідеальну математичну позицію без "хвостів"
                const leftOffset = buttonRect.left - navRect.left + navContainer.scrollLeft - navPaddingLeft;

                indicator.style.width = `${buttonRect.width}px`;
                indicator.style.transform = `translateX(${leftOffset}px)`;
            };

            const activateTab = (button) => {
                const tabId = button.dataset.tab;

                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });

                contents.forEach(content => {
                    content.classList.remove('active');
                });

                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                moveIndicator(button);
            };

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    activateTab(button);
                });
            });

            // Виправляємо баг старого коду при першому завантаженні (через повний рендер DOM)
            const handleInitialPosition = () => {
                const activeButton = tabs.querySelector('.tabs-nav__link.active') || buttons[0];
                if (activeButton) {
                    // Якщо активного класу взагалі не було, додаємо його першій кнопці
                    if (!activeButton.classList.contains('active')) {
                        activateTab(activeButton);
                    } else {
                        moveIndicator(activeButton);
                    }
                }
            };

            // Запуск розрахунку після повної готовності сторінки, щоб уникнути зсуву в 8px
            if (document.readyState === 'complete') {
                handleInitialPosition();
            } else {
                window.addEventListener('load', handleInitialPosition);
            }

            window.addEventListener('resize', () => {
                const current = tabs.querySelector('.tabs-nav__link.active');
                if (current) {
                    moveIndicator(current);
                }
            });
        }
    }


//==============================================================================
//  SPLIT-TABS
//  ============================================================================
    function initSplitTabs(options = {}) {
        options = {
            menuItemSelector: '.split-showcase__menu-item',
            tabContentSelector: '.split-showcase__tab',
            activeClass: 'active'
        }
        const settings = {
            menuItemSelector: options.menuItemSelector,
            tabContentSelector: options.tabContentSelector,
            activeClass: options.activeClass
        };

        const menuItems = document.querySelectorAll(settings.menuItemSelector);
        const allTabs = document.querySelectorAll(settings.tabContentSelector);

        if (!menuItems.length || !allTabs.length) return;

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains(settings.activeClass)) return;

                const target = item.getAttribute('data-target');
                if (!target) return;

                menuItems.forEach(el => el.classList.remove(settings.activeClass));
                item.classList.add(settings.activeClass);

                allTabs.forEach(tab => {
                    if (tab.classList.contains(target)) {
                        tab.classList.add(settings.activeClass);
                    } else {
                        tab.classList.remove(settings.activeClass);
                    }
                });
            });
        });
    }

    //==========================================================================
    //RELATED POSTS
    //==========================================================================

    function initSliderRelated() {

        if (!document.querySelector('.related-posts')) return null;

        const relatedSlider = new Splide('.related-posts', {
            type: 'slide',
            perPage: 2,
            perMove: 1,
            gap: '20px',
            pagination: false,
            arrows: true,
            breakpoints: {
                576: {perPage: 1},
                perMove: 1,
            }
        });
        relatedSlider.mount();

        return relatedSlider;
    }

    //===========================================================================
    //SLIDER WITH LIGHTBOX
    //===========================================================================
    function initCertificatesSlider() {
        const sliderSelector = '.slider-certificates';

        if (!document.querySelector(sliderSelector)) return;

        // 1. Запуск Splide (Тільки рух і відступи)
        new Splide(sliderSelector, {
            type: 'slide',
            drag: 'free',
            autoWidth: true,
            gap: '18px',
            pagination: false,
            arrows: false
        }).mount();

        // 2. Запуск baguetteBox (Чистий текстовий селектор, який у вас працював)
        baguetteBox.run('.slider-certificates .splide__track');
    }

//==============================================================================
//  COLLAPS CONTENT
//  ============================================================================
// Окремо оформлена функція для сайдбару
    function initSidebarCollapse() {
        const toggles = document.querySelectorAll('[data-toggle="collapse"]');
        if (toggles.length === 0) return;
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = toggle.getAttribute('data-target');
                const targetBlock = document.querySelector(targetId);

                if (targetBlock) {
                    targetBlock.classList.toggle('show');
                    toggle.classList.toggle('is-active');
                }
            });
        });
    }
    //===========================================================================
    // CUSTOM SELECT
    //===========================================================================
    const customSelect = document.querySelectorAll(".js-custom-select");

    if (customSelect) {
        NiceSelect.bind(customSelect);
    }

    //===========================================================================
    // init function
    //===========================================================================

    initBaselineAnim();
    initSliderPartners();
    initTabs();
    initSplitTabs();
    initSliderRelated();
    initCertificatesSlider();
    initSidebarCollapse();

    window.addEventListener('load', () => {
        initHeroAnimation();
    });
    // window.addEventListener("load", () => {
    //   // Сначала регистрируем и создаем ВСЕ триггеры на странице
    //   initBannerAnimations();
    //
    //   setTimeout(() => {
    //     ScrollTrigger.refresh();
    //   }, 100);
    // });

}