// Initialization module

import NiceSelect from "nice-select2";

export function init() {
    gsap.registerPlugin(ScrollTrigger);

    //=====================================================================
    // SETTINGS HEADER
    //=====================================================================
    function initHeader() {
        const header = document.querySelector('.header');

        if (!header) return null;

        // Запам'ятовуємо початковий стан при завантаженні сторінки
        const isInitialLight = header.classList.contains('header_light');
        let lastScroll = window.scrollY || document.documentElement.scrollTop;

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

        function updateTheme(currentScroll = window.scrollY || document.documentElement.scrollTop) {
            // 1. Якщо хедер початково мав бути білим, він завжди білий
            if (isInitialLight) {
                header.classList.add('header_light');
                return;
            }

            // 2. Якщо відкрита будь-яка панель — хедер обов'язково білий
            const hasOpenPanels = Object.values(panelState).some(Boolean);
            if (hasOpenPanels) {
                header.classList.add('header_light');
                return;
            }

            // 3. Якщо ми на самому верху сторінки (менше 100px), повертаємо початковий стан (не light)
            if (currentScroll <= 100) {
                header.classList.remove('header_light');
                return;
            }

            // 4. Логіка під час скролу: якщо скролимо вгору — додаємо light.
            // Якщо викликано вручну (при закритті панелі) і скрол на місці — зберігаємо поточний стан.
            if (currentScroll < lastScroll) {
                header.classList.add('header_light');
            } else if (currentScroll > lastScroll) {
                header.classList.remove('header_light');
            }
        }

        function setPanelState(name, state) {
            panelState[name] = state;
            updateTheme();
        }

        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll < 0) currentScroll = 0;

            if (currentScroll > lastScroll && currentScroll > 100) {
                headerTween.play();
            } else if (currentScroll < lastScroll) {
                headerTween.reverse();
            }

            updateTheme(currentScroll);
            lastScroll = currentScroll;
        }, {passive: true});

        return {
            setPanelState
        };
    }

// =====================================================================
// SEARCH PANEL
// =====================================================================
    function initSearch(header) {
        const panel = document.querySelector('.h-search');
        if (!panel) return null;

        const content = panel.querySelector('.search-form');
        let isOpen = false;
        const tl = gsap.timeline({ paused: true });

        tl.set(panel, { pointerEvents: 'auto' });
        tl.set(panel, { autoAlpha: 1 });

        tl.fromTo(panel,
            { y: '-100%' },
            { y: 0, duration: 0.45, ease: 'power2.out' }
        );

        if (content) {
            tl.fromTo(content, {x: 100, autoAlpha: 0}, {
                x: 0,
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power4.out'
            }, '-=0.2');
        }

        tl.eventCallback('onReverseComplete', () => {
            gsap.set(panel, {pointerEvents: 'none'});
        });

        function open() {
            if (isOpen) return;
            isOpen = true;
            header.setPanelState('search', true);
            tl.play();
        }

        function close() {
            if (!isOpen) return;
            isOpen = false;
            header.setPanelState('search', false);
            tl.reverse();
        }

        return {open, close, isOpen: () => isOpen};
    }

// =====================================================================
// CATEGORY MEGA-MENU
// =====================================================================
    function initCategories(header) {
        const panel = document.querySelector('.h-mega-menu');
        if (!panel) return null;

        const cards = panel.querySelectorAll('.category-card');
        let isOpen = false;
        const tl = gsap.timeline({ paused: true });

        tl.set(panel, { pointerEvents: 'auto' });
        tl.set(panel, { autoAlpha: 1 });
        tl.fromTo(panel,
            { y: '-100%' },
            { y: 0, duration: 0.5, ease: 'power2.out' }
        );

        if (cards.length) {
            tl.fromTo(cards, {x: 140, autoAlpha: 0, scale: 0.96}, {
                x: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.09,
                ease: 'power1.out'
            }, '-=0.2');
        }

        tl.eventCallback('onReverseComplete', () => {
            gsap.set(panel, {pointerEvents: 'none'});
        });

        function open() {
            if (isOpen) return;
            isOpen = true;
            header.setPanelState('categories', true);
            tl.play();
        }

        function close() {
            if (!isOpen) return;
            isOpen = false;
            header.setPanelState('categories', false);
            tl.reverse();
        }

        return {open, close, isOpen: () => isOpen};
    }

// =====================================================================
// ІНІЦІАЛІЗАЦІЯ ТА РОЗДІЛЕННЯ ДЕСТКОП / МОБІЛКА
// =====================================================================
    function initHeaderComponent() {
        const header = initHeader();
        if (!header) return;

        const search = initSearch(header);
        const categories = initCategories(header);

        const searchTrigger = document.querySelector('.btn_open-search');
        const searchPanel = document.querySelector('.h-search');
        const categoriesTrigger = document.querySelector('.btn_open-megamenu');
        const categoriesPanel = document.querySelector('.h-mega-menu');

        // Перевірка на десктоп
        const isDesktop = window.matchMedia('(min-width: 1025px)');

        // --- ЛОГІКА ХОВЕРУ (ДЕСКТОП) ---
        function bindHover(trigger, panel, instance) {
            let timeout;

            const open = () => {
                if (!isDesktop.matches) return; // Ігноруємо ховер на мобілках
                clearTimeout(timeout);
                instance.open();
            };

            const close = () => {
                if (!isDesktop.matches) return; // Ігноруємо ховер на мобілках
                timeout = setTimeout(() => {
                    instance.close();
                }, 120);
            };

            trigger?.addEventListener('mouseenter', open);
            panel?.addEventListener('mouseenter', open);
            trigger?.addEventListener('mouseleave', close);
            panel?.addEventListener('mouseleave', close);
        }

        // --- ЛОГІКА КЛІКУ (ТОГЛ ДЛЯ МОБІЛКИ) ---
        function bindClick(trigger, instance, otherInstance) {
            if (!trigger) return;

            trigger.addEventListener('click', (e) => {
                if (isDesktop.matches) return; // На десктопі керує ховер
                e.preventDefault();

                if (instance.isOpen()) {
                    instance.close();
                } else {
                    otherInstance?.close(); // Закриваємо сусідню панель, якщо вона відкрита
                    instance.open();
                }
            });
        }

        // Навешуємо ховер (працює лише на десктопі завдяки перевірці всередині)
        bindHover(searchTrigger, searchPanel, search);
        bindHover(categoriesTrigger, categoriesPanel, categories);

        // Навешуємо тогл по кліку (працює лише на мобільних)
        bindClick(searchTrigger, search, categories);
        bindClick(categoriesTrigger, categories, search);

        // --- ЗАКРИТТЯ ПРИ КЛІКУ НА КАРТКУ (КАТЕГОРІЮ) ---
        if (categoriesPanel && categories) {
            const categoryCards = categoriesPanel.querySelectorAll('.category-card');

            categoryCards.forEach(card => {
                card.addEventListener('click', () => {
                    // Закриваємо панель (актуально і для мобілки, і для десктопу, якщо картка не є прямим посиланням з перезавантаженням сторінки)
                    categories.close();
                });
            });
        }
    }
    //=====================================================================
    // MOBILE MENU
    //=====================================================================
    function initMobMenu() {
        const nav = document.querySelector(".header__nav");
        const burger = document.querySelector(".btn_burger");
        const menuLinks = document.querySelectorAll('.menu__link');
        const body = document.body;
        const btnClose = document.querySelector('.btn_close');

        burger.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.add('is_open');
            body.classList.add('disable-scroll');
        });

        function closeMenu() {
            nav.classList.remove('is_open');
            body.classList.remove('disable-scroll');
        }

        btnClose.addEventListener('click', closeMenu);
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

    }

    //=====================================================================
    // OPEN SIDEBAR
    //=====================================================================
    function initSidebar() {
        const bntOpenSb = document.querySelector('.btn_open-sidebar');
        const sidebar = document.querySelector('.sidebar');
        const btnCloseSb = document.querySelector('.sidebar .btn_close');
        const backdrop = document.querySelector('.sidebar-backdrop');

        // КРИТИЧНА ПЕРЕВІРКА: Якщо головних елементів немає на сторінці — просто виходимо
        if (!sidebar || !backdrop) return;

        // Відкриття сайдбару
        if (bntOpenSb) {
            bntOpenSb.addEventListener('click', (e) => {
                e.preventDefault();
                sidebar.classList.add('is_open');
                backdrop.classList.add('show');
                document.body.classList.add('disable-scroll');
            });
        }
        // Функція закриття сайдбару
        function closeSidebar(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            sidebar.classList.remove('is_open');
            backdrop.classList.remove('show');
            document.body.classList.remove('disable-scroll');
        }
        // Безпечно вішаємо слухачі, перевіряючи існування кнопок
        if (btnCloseSb) {
            btnCloseSb.addEventListener('click', closeSidebar);
        }

        if (backdrop) {
            backdrop.addEventListener('click', closeSidebar);
        }
    }

    //=====================================================================
    // SECTION BANNER ANIMATION
    //=====================================================================
    function initHeroAnimation() {
        const container = document.querySelector(".animation-view");
        if (!container) return;

        // Глобальне налаштування для мобільних
        ScrollTrigger.config({ ignoreMobileResize: true });

        // 1. Стартова анімація заголовків (працює завжди)
        gsap.fromTo(".section-banner .staggered-heading__line",
            { y: "50%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.25,
                delay: 0.1
            }
        );

        // 2. Конфігурація спрайту та Канвасу (якщо він є)
        const spriteConfig = {
            src: 'images/plate-sprite.webp',
            cols: 10,
            totalFrames: 90,
            frameWidth: 640,
            frameHeight: 580
        };

        const canvas = document.querySelector('.canvas-container canvas');
        let ctx = null;
        let img = null;

        // Функція рендерингу кадрів
        function renderFrame(frameIndex) {
            if (!ctx || !img || !img.complete) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cyclicFrame = frameIndex % spriteConfig.totalFrames;
            const x = (cyclicFrame % spriteConfig.cols) * spriteConfig.frameWidth;
            const y = Math.floor(cyclicFrame / spriteConfig.cols) * spriteConfig.frameHeight;

            ctx.drawImage(
                img,
                x, y, spriteConfig.frameWidth, spriteConfig.frameHeight,
                0, 0, canvas.width, canvas.height
            );
        }

        // 3. Логіка завантаження: якщо канвас є — чекаємо картинку, якщо немає — стартуємо відразу
        if (canvas) {
            ctx = canvas.getContext('2d');
            canvas.width = spriteConfig.frameWidth;
            canvas.height = spriteConfig.frameHeight;

            img = new Image();
            img.src = spriteConfig.src;
            img.onload = () => {
                renderFrame(0); // Малюємо перший кадр
                initScrollAnimation(true); // Запускаємо скрол з прапорцем hasCanvas = true
            };
        } else {
            // Якщо канвасу немає на сторінці, просто запускаємо анімацію шарів
            initScrollAnimation(false);
        }

        // 4. Основна логіка ScrollTrigger
        function initScrollAnimation(hasCanvas) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1.8,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                }
            });

            // Рух шторки банера (працює всюди)
            tl.to(".section-banner.hero-layer.-front", {
                clipPath: "inset(0% 0% 100% 0%)",
                ease: "none",
                duration: 1
            }, 0);

            tl.to(".banner-mask-wrapper", {
                height: "0%",
                ease: "none",
                duration: 1
            }, 0.5);

            // Анімації суто для КАНВАСУ (виконуються тільки якщо він існує)
            if (hasCanvas) {
                tl.set(".canvas-container", { display: "flex" }, 0);

                tl.fromTo(".canvas-container",
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
                    0
                );

                const plateTween = { currentFrame: 0 };
                tl.to(plateTween, {
                    currentFrame: (spriteConfig.totalFrames * 2) - 1,
                    snap: "currentFrame",
                    ease: "none",
                    duration: 1.5,
                    onUpdate: () => renderFrame(plateTween.currentFrame)
                }, 0);
            }

            // Інтеграція 3D моделі (якщо вона існує)
            if (typeof my3DModel !== 'undefined') {
                tl.to(my3DModel, {
                    rotationY: Math.PI * 2,
                    duration: 1,
                    ease: "none",
                }, 0);
            }

            // 5. Перемикач видимості канвасу (актуально тільки якщо є канвас)
            const nextSection = document.querySelector(".next-section");
            if (nextSection && hasCanvas) {
                ScrollTrigger.create({
                    trigger: nextSection,
                    start: "top top",
                    onEnter: () => gsap.set(".canvas-container", { display: "none" }),
                    onLeaveBack: () => gsap.set(".canvas-container", { display: "flex" })
                });
            }
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
            duration: 0.4,
            ease: "back.out(1.5)",
            stagger: 0.4,
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
        document.querySelectorAll('[data-tabs]').forEach(tabs => {
            const buttons = tabs.querySelectorAll('[data-tab]');
            const contents = tabs.querySelectorAll('[id]');
            const indicator = tabs.querySelector('.tab-active-border');

            const move = (btn) => {
                if (!indicator) return;
                indicator.style.width = btn.offsetWidth + 'px';
                indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
            };

            const activate = (btn) => {
                const id = btn.dataset.tab;

                buttons.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                tabs.querySelector('#' + id)?.classList.add('active');

                move(btn);
            };

            buttons.forEach(b => b.onclick = () => activate(b));

            const initial = tabs.querySelector('.active[data-tab]') || buttons[0];
            if (initial) activate(initial);
        });

        window.addEventListener('resize', () => {
            document.querySelectorAll('[data-tabs]').forEach(tabs => {
                const active = tabs.querySelector('[data-tab].active');
                const indicator = tabs.querySelector('.tab-active-border');
                if (!active || !indicator) return;

                indicator.style.width = active.offsetWidth + 'px';
                indicator.style.transform = `translateX(${active.offsetLeft}px)`;
            });
        });
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
            autoWidth: false,
            breakpoints: {
                576: {perPage: 1},
            }
        });
        relatedSlider.mount();

        return relatedSlider;
    }

    //==========================================================================
    //SIMILAR PRODUCTS
    //==========================================================================
    function initSliderSimilarProducts() {

        if (!document.querySelector('.similar-products')) return null;

        const similarProductsSlider = new Splide('.similar-products', {
            type: 'slide',
            perPage: 3,
            perMove: 1,
            gap: 0,
            pagination: false,
            arrows: true,
            autoWidth: false,
            breakpoints: {
                768: {perPage: 2}
            }
        });
        similarProductsSlider.mount();

        return similarProductsSlider;
    }

    //=========================================================================
    //PRODUCT SLIDER
    //=========================================================================
    function initSliderProduct() {

        if (!document.querySelector('.product-slider')) return null;

        const productSlider = new Splide('.product-slider', {
            type: 'slide',
            perPage: 1,
            perMove: 1,
            gap: '20px',
            pagination: false,
            arrows: true,
        });
        productSlider.mount();

        return productSlider;
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
            gap: '12px',
            pagination: false,
            arrows: false,
            breakpoints: {
                768: {gap: '18px',}
            }
        }).mount();

        // 2. Запуск baguetteBox (Чистий текстовий селектор, який у вас працював)
        baguetteBox.run('.slider-certificates .splide__track');
    }

//==============================================================================
//  COLLAPS CONTENT
//  ============================================================================
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

                    // 1. Знаходимо батьківську секцію, в якій лежить цей таггл
                    const section = toggle.closest('.sidebar__section');

                    // Якщо у вашій структурі клас називається просто 'section', змініть на:
                    // const section = toggle.closest('.section');

                    if (section) {
                        // 2. Перевіряємо, чи відкрився блок (чи є у нього клас 'show')
                        if (targetBlock.classList.contains('show')) {
                            section.classList.add('is-open'); // додаємо клас відкритого стану
                        } else {
                            section.classList.remove('is-open'); // прибираємо, якщо закрили
                        }
                    }
                }
            });
        });
    }

    //===========================================================================
    // CUSTOM SELECT
    //===========================================================================
    function initCustomSelect() {
        const customSelect = document.querySelector(".js-custom-select");
        if (customSelect) {
            NiceSelect.bind(customSelect, {searchable: false});
            const niceSelectHtml = customSelect.nextElementSibling;

            if (niceSelectHtml) {
                gsap.fromTo(niceSelectHtml,
                    {
                        opacity: 0,
                        rotationX: 90,
                        transformOrigin: "bottom center",
                        transformPerspective: 800
                    },
                    {
                        opacity: 1,
                        rotationX: 0,
                        duration: 0.7,
                        ease: "power3.inOut",
                        delay: 0.3
                    }
                );
            }
        }
    }

    //==========================================================================
    // OPEN DESCRIPTION END SPECS PRODUCT
    //==========================================================================
    function initOpenSpecs() {
        const triggers = document.querySelectorAll('.js-accordion-trigger');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function () {
                // Працюємо лише на мобільних (якщо потрібно)
                if (window.innerWidth <= 767) {

                    // Знаходимо ID контенту, який прив'язаний до цієї кнопки
                    const contentId = this.getAttribute('aria-controls');
                    const content = document.getElementById(contentId);

                    if (content) {
                        const isOpen = content.classList.contains('is-open');

                        if (isOpen) {
                            content.classList.remove('is-open');
                            this.setAttribute('aria-expanded', 'false');
                        } else {
                            content.classList.add('is-open');
                            this.setAttribute('aria-expanded', 'true');
                        }
                    }

                }
            });
        });
    }

    //===========================================================================
    // SLIDERS IN TABS MOB
    //===========================================================================
    function initTabsSlider() {
        const tabSliderElements = document.querySelectorAll('.tab-slider');
        const tabSliders = [];

        tabSliderElements.forEach((el) => {
            const slider = new Splide(el, {
                destroy: true, // на десктопі відразу вимкнено
                breakpoints: {
                    767: {
                        destroy: false, // вмикається на мобільних
                        type: 'slide',
                        perPage: 4,
                        perMove: 1,
                        focus: 0,
                        gap: '16px',
                        arrows: false,
                        pagination: true,
                    },
                    580: {
                        perPage: 3,
                        perMove: 1,
                        gap: '16px',
                    },
                    490: {
                        perPage: 2,
                        perMove: 1,
                        gap: '16px',
                    }
                }
            });

            slider.mount();
            tabSliders.push(slider); // зберігаємо екземпляр слайдера
        });

        // БЕЗПЕЧНЕ ОНОВЛЕННЯ ТАБІВ ЧЕРЕЗ КЛІК
        // Знайдіть, який клас мають ваші кнопки табів, і впишіть сюди замість .tab-button
        const tabButtons = document.querySelectorAll('.prod-overview__tab-btn');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Використовуємо невеликий таймаут (100мс), щоб таб встиг повністю відкритися (display: block)
                setTimeout(() => {
                    tabSliders.forEach(slider => {
                        // Перевіряємо, чи ми на мобільному і чи слайдер активний, перш ніж оновлювати
                        if (window.innerWidth <= 767 && typeof slider.refresh === 'function') {
                            slider.refresh(); // Спокійно оновлюємо без нескінченних циклів
                        }
                    });
                }, 100);
            });
        });
    }

    //===========================================================================
    // SLIDER CYCLE-STEPS MOB
    //===========================================================================
    function initStepsSlider() {
        const stepsSliderEl = document.querySelector('.steps-slider');

        // Захист: якщо блоку на сторінці немає, просто виходимо
        if (!stepsSliderEl) return;

        // Запускаємо Splide через вашу робочу логіку з breakpoints
        const slider = new Splide(stepsSliderEl, {
            destroy: true, // На десктопі відразу вимкнено (ваша робоча логіка)
            breakpoints: {
                991: {
                    destroy: false, // Вмикається на мобільних (ваша робоча логіка)
                    type: 'slide',
                    perPage: 2,
                    perMove: 1,     // СУВОРO ПО 1 СЛАЙДУ ЗА РАЗ
                    focus: 0,       // Фіксуємо фокус, щоб рахувало поштучно, а не сторінками
                    gap: '16px',
                    arrows: false,
                    pagination: true,
                },
                580: {
                    perPage: 1,
                    perMove: 1,     // Тут також по 1 слайду
                    focus: 0,
                    gap: '16px',
                }
            }
        });

        slider.mount();
    }

    //===========================================================================
    // init function
    //===========================================================================

    initMobMenu();
    initSliderPartners();
    initTabs();
    initSidebar();
    initSplitTabs();
    initSliderRelated();
    initCertificatesSlider();
    initCustomSelect();
    initSidebarCollapse();
    initSliderProduct();
    initSliderSimilarProducts();
    initOpenSpecs();
    initTabsSlider();
    initStepsSlider();

    // window.addEventListener('load', () => {
    //     initHeroAnimation();
    //     initBaselineAnim();
    //     setTimeout(() => {
    //         ScrollTrigger.refresh();
    //     }, 100);
    // });
    window.addEventListener('load', () => {

        initHeaderComponent();
        initBaselineAnim();
        initHeroAnimation();

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
    });
}