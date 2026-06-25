(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  // node_modules/nice-select2/dist/js/nice-select2.js
  var require_nice_select2 = __commonJS({
    "node_modules/nice-select2/dist/js/nice-select2.js"(exports, module) {
      !(function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.NiceSelect = t() : e.NiceSelect = t();
      })(self, () => (() => {
        "use strict";
        var _h_instances, e_fn, o_fn, d_fn, a_fn, l_fn, c_fn, p_fn, u_fn, t_fn, r_fn, S_fn, w_fn, m_fn, y_fn, i_fn, s_fn, L_fn, v_fn, b_fn, E_fn, x_fn, g_fn, f_fn, n_fn, h_fn, C_fn;
        var e = { d: (t2, s2) => {
          for (var i2 in s2) e.o(s2, i2) && !e.o(t2, i2) && Object.defineProperty(t2, i2, { enumerable: true, get: s2[i2] });
        }, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r: (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        } }, t = {};
        e.r(t), e.d(t, { bind: () => u, default: () => p });
        const s = (e2, t2, s2 = {}) => {
          let i2;
          i2 = "click" === t2 ? MouseEvent : "change" === t2 ? Event : t2.includes("focus") ? FocusEvent : UIEvent;
          const l2 = new i2(t2, { bubbles: true, cancelable: false, ...s2 });
          e2.dispatchEvent(l2);
        }, i = (e2) => s(e2, "click"), l = (e2) => s(e2, "change"), n = (e2) => s(e2, "modalclose"), o = (e2, t2) => void 0 !== e2[t2] ? e2[t2] : e2.getAttribute(t2), d = (e2, t2) => e2?.classList.contains(t2), a = (e2, t2) => e2?.classList.add(t2), r = (e2, t2) => e2?.classList.remove(t2), c = { data: null, searchable: true, showSelectedItems: true, placeholder: "Select an option", searchtext: "Search", selectedtext: "selected", hideSelect: true };
        class h {
          constructor(e2, t2 = {}) {
            __privateAdd(this, _h_instances);
            if (!e2) throw new Error("No element provided to NiceSelect");
            if (!(e2 instanceof Element)) throw new Error("Invalid element provided to NiceSelect - must be a valid DOM element");
            this.el = e2, this.el._niceSelect = this, this.config = { ...c, ...t2 }, this.data = this.config.data, this.selectedOptions = [], this.placeholder = o(this.el, "placeholder") || this.config.placeholder, this.searchtext = o(this.el, "searchtext") || this.config.searchtext, this.selectedtext = o(this.el, "selectedtext") || this.config.selectedtext, this.dropdown = null, this.selectionList = null, this.multiple = o(this.el, "multiple"), this.disabled = o(this.el, "disabled"), __privateMethod(this, _h_instances, e_fn).call(this), __privateMethod(this, _h_instances, t_fn).call(this);
          }
          update(e2 = "") {
            var _a;
            let t2 = this;
            "" != e2 && (t2 = e2.target._niceSelect), __privateMethod(_a = t2, _h_instances, s_fn).call(_a);
          }
          disable() {
            this.disabled || (this.disabled = true, a(this.dropdown, "disabled"));
          }
          enable() {
            this.disabled && (this.disabled = false, r(this.dropdown, "disabled"));
          }
          clear() {
            __privateMethod(this, _h_instances, i_fn).call(this), this.selectedOptions = [], __privateMethod(this, _h_instances, l_fn).call(this), this.update(), l(this.el);
          }
          destroy() {
            this.selectionList && __privateMethod(this, _h_instances, n_fn).call(this), this.dropdown && (this.dropdown.remove(), this.el.classList.remove("hidden-select"));
          }
          focus(e2 = "") {
            var t2;
            if (d(this.dropdown, "open") ? this.multiple ? e2 === this.dropdown.querySelector(".multiple-options") && (r(this.dropdown, "open"), n(this.el)) : (r(this.dropdown, "open"), n(this.el)) : (a(this.dropdown, "open"), t2 = this.el, s(t2, "modalopen")), d(this.dropdown, "open")) {
              const e3 = this.dropdown.querySelector(".nice-select-search");
              e3 && (e3.value = "", e3.focus());
              const t3 = this.dropdown.querySelector(".focus");
              t3 && r(t3, "focus");
              const s2 = this.dropdown.querySelector(".selected");
              s2 && a(s2, "focus"), this.dropdown.querySelectorAll("ul li").forEach((e4) => e4.style.display = "");
            } else this.dropdown.focus();
          }
        }
        _h_instances = new WeakSet();
        e_fn = function(e2 = true) {
          this.data ? __privateMethod(this, _h_instances, o_fn).call(this, this.data) : __privateMethod(this, _h_instances, d_fn).call(this, e2), this.el.classList.remove("hidden-select"), __privateMethod(this, _h_instances, a_fn).call(this), this.config.hideSelect && this.el.classList.add("hidden-select"), __privateMethod(this, _h_instances, r_fn).call(this);
        };
        o_fn = function(e2) {
          this.options = e2.map((e3) => ({ data: e3, attributes: { selected: !!e3.selected, disabled: !!e3.disabled, optgroup: "optgroup" === e3.value } }));
        };
        d_fn = function(e2) {
          const t2 = Array.from(this.el.querySelectorAll("option,optgroup")), s2 = [], i2 = [];
          this.data = t2.map((t3) => {
            let l2, n2 = t3.selected;
            e2 && t3.selected && !t3.defaultSelected && (n2 = false), l2 = "OPTGROUP" === t3.tagName ? { text: t3.label, value: "optgroup" } : { text: t3.dataset.display ?? t3.innerText, value: t3.value, extra: t3.dataset.extra, selected: n2, disabled: t3.disabled };
            const o2 = { selected: n2, disabled: t3.disabled, optgroup: "OPTGROUP" === t3.tagName }, d2 = { data: l2, attributes: o2, element: null };
            return s2.push(d2), o2.selected && i2.push(d2), l2;
          }), this.options = s2, this.selectedOptions = i2;
        };
        a_fn = function() {
          const e2 = ["nice-select", o(this.el, "class") || "", this.disabled ? "disabled" : "", this.multiple ? "has-multiple" : ""].filter(Boolean), t2 = this.config.searchable ? `
      <div class="nice-select-search-box">
        <input type="text" class="nice-select-search" placeholder="${this.searchtext}..." title="search"/>
      </div>
    ` : "", s2 = `
      <div class="${e2.join(" ")}" tabindex="${this.disabled ? "" : 0}">
        <span class="${this.multiple ? "multiple-options" : "current"}"></span>
        <div class="nice-select-dropdown">
          ${t2}
          <ul class="list"></ul>
        </div>
      </div>
    `;
          this.el.insertAdjacentHTML("afterend", s2), this.dropdown = this.el.nextElementSibling, __privateMethod(this, _h_instances, l_fn).call(this), __privateMethod(this, _h_instances, c_fn).call(this);
        };
        l_fn = function() {
          if (this.multiple) {
            let e2 = "";
            "auto" === window.getComputedStyle(this.dropdown).width || this.selectedOptions.length < 2 ? (this.selectedOptions.forEach((t2, s2, i2) => {
              let l2 = t2.data.text;
              s2 !== i2.length - 1 && (l2 += ", ");
              let n2 = document.createElement("span");
              n2.classList.add("current"), n2.textContent = l2, e2 += n2.outerHTML;
            }), e2 = e2 || this.placeholder) : e2 = `${this.selectedOptions.length} ${this.selectedtext}`, this.dropdown.querySelector(".multiple-options").innerHTML = e2;
          } else {
            const e2 = this.selectedOptions.length > 0 ? this.selectedOptions[0].data.text : this.placeholder;
            this.dropdown.querySelector(".current").textContent = e2;
          }
        };
        c_fn = function() {
          const e2 = this.dropdown.querySelector("ul");
          this.options.forEach((t2) => {
            this.multiple && this.config.showSelectedItems && __privateMethod(this, _h_instances, h_fn).call(this, t2), e2.appendChild(__privateMethod(this, _h_instances, p_fn).call(this, t2));
          });
        };
        p_fn = function(e2) {
          const t2 = document.createElement("li");
          if (t2.textContent = e2.data.text, void 0 !== e2.data.extra && t2.appendChild(__privateMethod(this, _h_instances, u_fn).call(this, e2.data.extra)), e2.attributes.optgroup) a(t2, "optgroup");
          else {
            t2.setAttribute("data-value", e2.data.value);
            const s2 = ["option"];
            e2.attributes.selected && s2.push("selected"), e2.attributes.disabled && s2.push("disabled"), t2.classList.add(...s2), t2.addEventListener("click", (t3) => __privateMethod(this, _h_instances, m_fn).call(this, e2, t3));
          }
          return e2.element = t2, t2;
        };
        u_fn = function(e2) {
          const t2 = document.createElement("span");
          return t2.innerHTML = e2, a(t2, "extra"), t2;
        };
        t_fn = function() {
          this.el.addEventListener("invalid", () => __privateMethod(this, _h_instances, f_fn).call(this, "invalid")), window.addEventListener("click", (e2) => __privateMethod(this, _h_instances, v_fn).call(this, e2)), this.el.addEventListener("change", this.update);
        };
        r_fn = function() {
          this.dropdown.addEventListener("click", (e2) => __privateMethod(this, _h_instances, w_fn).call(this, e2)), this.dropdown.addEventListener("keydown", (e2) => __privateMethod(this, _h_instances, b_fn).call(this, e2)), this.dropdown.addEventListener("focusin", () => {
            return e2 = this.el, s(e2, "focusin");
            var e2;
          }), this.dropdown.addEventListener("focusout", () => {
            return e2 = this.el, s(e2, "focusout");
            var e2;
          }), this.config.searchable && __privateMethod(this, _h_instances, S_fn).call(this);
        };
        S_fn = function() {
          const e2 = this.dropdown.querySelector(".nice-select-search");
          e2 && (e2.addEventListener("click", (e3) => e3.stopPropagation()), e2.addEventListener("input", (e3) => __privateMethod(this, _h_instances, g_fn).call(this, e3)));
        };
        w_fn = function(e2) {
          e2.preventDefault(), this.focus(e2.target);
        };
        m_fn = function(e2, t2) {
          const s2 = t2.target;
          if (!d(s2, "disabled")) {
            if (this.multiple) {
              let t3;
              d(s2, "selected") ? (t3 = false, r(s2, "selected"), this.selectedOptions = this.selectedOptions.filter((t4) => t4.data !== e2.data)) : (t3 = true, a(s2, "selected"), this.selectedOptions.push(e2)), e2.data.selected = t3, e2.attributes.selected = t3;
            } else {
              this.dropdown.querySelectorAll("li.selected").forEach((e3) => r(e3, "selected")), a(s2, "selected"), this.selectedOptions = [e2];
              let t3 = this.options.find((e3) => e3.attributes.selected);
              t3 && (t3.data.selected = false, t3.attributes.selected = false), e2.data.selected = true, e2.attributes.selected = true;
            }
            __privateMethod(this, _h_instances, l_fn).call(this), __privateMethod(this, _h_instances, y_fn).call(this), __privateMethod(this, _h_instances, L_fn).call(this);
          }
        };
        y_fn = function() {
          const e2 = this.el;
          this.selectedOptions.length > 0 ? e2.value = this.selectedOptions[0].data.value : (e2.value = "", e2.selectedIndex = -1), this.options.forEach((t2) => {
            let s2 = Array.from(e2.options).find((e3) => String(e3.dataset.display || e3.textContent).trim().toLowerCase() === String(t2.data.text).trim().toLowerCase());
            null == s2 && (s2 = Array.from(e2.options).find((e3) => String(e3.value).trim().toLowerCase() === String(t2.data.value).trim().toLowerCase())), null != s2 ? t2.attributes.selected ? s2.selected = true : s2.selected = false : console.warn(`No matching option found for value: "${t2.data.value}" in select element`, e2);
          }), e2.removeEventListener("change", this.update), l(e2), e2.addEventListener("change", this.update);
        };
        i_fn = function() {
          if (this.multiple) {
            const e2 = this.el;
            this.selectedOptions.forEach((t2) => {
              const s2 = e2.querySelector(`option[value="${t2.data.value}"]`);
              s2 && (s2.selected = false);
            });
          } else this.selectedOptions.length > 0 && (this.el.selectedIndex = -1);
          l(this.el);
        };
        s_fn = function() {
          if (this.dropdown) {
            const e2 = d(this.dropdown, "open");
            __privateMethod(this, _h_instances, n_fn).call(this), this.dropdown.remove(), this.data = null, __privateMethod(this, _h_instances, e_fn).call(this, false), e2 && i(this.dropdown);
          }
          o(this.el, "disabled") ? this.disable() : this.enable();
        };
        L_fn = function() {
          this.config.showSelectedItems && (__privateMethod(this, _h_instances, n_fn).call(this), this.selectedOptions.forEach((e2) => {
            __privateMethod(this, _h_instances, h_fn).call(this, e2);
          }));
        };
        v_fn = function(e2) {
          this.dropdown.contains(e2.target) || (r(this.dropdown, "open"), n(this.el));
        };
        b_fn = function(e2) {
          const t2 = this.dropdown.querySelector(".focus"), s2 = d(this.dropdown, "open");
          if (13 === e2.keyCode) i(s2 ? t2 : this.dropdown);
          else if (40 === e2.keyCode) {
            if (s2) {
              const e3 = __privateMethod(this, _h_instances, E_fn).call(this, t2);
              e3 && (t2 && r(t2, "focus"), a(e3, "focus"));
            } else i(this.dropdown);
            e2.preventDefault();
          } else if (38 === e2.keyCode) {
            if (s2) {
              const e3 = __privateMethod(this, _h_instances, x_fn).call(this, t2);
              e3 && (t2 && r(t2, "focus"), a(e3, "focus"));
            } else i(this.dropdown);
            e2.preventDefault();
          } else if (27 === e2.keyCode && s2) i(this.dropdown);
          else if (32 === e2.keyCode && s2) return false;
          const l2 = this.dropdown.querySelector(".focus");
          return l2 && l2.scrollIntoView({ block: "center" }), false;
        };
        E_fn = function(e2) {
          let t2 = e2 ? e2.nextElementSibling : this.dropdown.querySelector(".list .option");
          for (; t2; ) {
            if (!d(t2, "disabled") && "none" !== t2.style.display) return t2;
            t2 = t2.nextElementSibling;
          }
          return null;
        };
        x_fn = function(e2) {
          let t2 = e2 ? e2.previousElementSibling : this.dropdown.querySelector(".list .option:last-child");
          for (; t2; ) {
            if (!d(t2, "disabled") && "none" !== t2.style.display) return t2;
            t2 = t2.previousElementSibling;
          }
          return null;
        };
        g_fn = function(e2) {
          const t2 = e2.target.value.toLowerCase();
          if ("" === t2) this.options.forEach((e3) => e3.element.style.display = "");
          else if (d(this.dropdown, "open")) {
            const e3 = new RegExp(t2);
            this.options.forEach((t3) => {
              t3.element.style.display = e3.test(t3.data.text.toLowerCase()) ? "" : "none";
            });
          }
          this.dropdown.querySelectorAll(".focus").forEach((e3) => r(e3, "focus"));
          const s2 = __privateMethod(this, _h_instances, E_fn).call(this, null);
          s2 && a(s2, "focus");
        };
        f_fn = function(e2) {
          "invalid" === e2 ? (a(this.dropdown, "invalid"), r(this.dropdown, "valid")) : (a(this.dropdown, "valid"), r(this.dropdown, "invalid"));
        };
        n_fn = function() {
          null != this.selectionList && (this.selectionList.remove(), this.selectionList = null);
        };
        h_fn = function(e2) {
          if (!this.multiple || e2.data.disabled || "" == e2.data.value || !e2.attributes.selected) return;
          if (null == this.selectionList) this.selectionList = document.createElement("ul"), this.selectionList.classList.add("select-selection-list"), this.el.after(this.selectionList);
          else if (null != this.selectionList.querySelector(`[data-value="${e2.data.value}"]`)) return;
          let t2 = document.createElement("li");
          t2.classList.add("select-selection"), t2.dataset.value = e2.data.value;
          let s2 = document.createElement("button");
          s2.classList.add("small", "remove-select-selection");
          let i2 = document.createElement("span");
          i2.classList.add("remove-select-selection"), i2.textContent = "x", s2.appendChild(i2), t2.appendChild(s2), i2 = document.createElement("span"), i2.classList.add("selected-name"), i2.textContent = e2.data.text, t2.appendChild(i2), this.selectionList.appendChild(t2), t2.querySelectorAll(".remove-select-selection").forEach((e3) => e3.addEventListener("click", __privateMethod(this, _h_instances, C_fn).bind(this)));
        };
        C_fn = function(e2) {
          if (null == this.selectionList) return;
          if (null != e2.target && (e2 = e2.target), null == e2.matches || !e2.matches(".remove-select-selection")) return;
          let t2 = e2.closest("li.select-selection"), s2 = this.options.find((e3) => e3.data.value === t2.dataset.value).element;
          s2 && s2.matches(".selected") && s2.click();
        };
        const p = h;
        function u(e2, t2) {
          return new h(e2, t2);
        }
        return t;
      })());
    }
  });

  // src/js/modules/init.js
  var import_nice_select2 = __toESM(require_nice_select2(), 1);
  function init() {
    gsap.registerPlugin(ScrollTrigger);
    function initHeader() {
      const header = document.querySelector(".header");
      if (!header) return null;
      const isInitialLight = header.classList.contains("header_light");
      let lastScroll = window.scrollY || document.documentElement.scrollTop;
      const panelState = {
        search: false,
        categories: false,
        burger: false
      };
      const headerTween = gsap.to(header, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.out",
        paused: true
      });
      function updateTheme(currentScroll = window.scrollY || document.documentElement.scrollTop) {
        if (isInitialLight) {
          header.classList.add("header_light");
          return;
        }
        const hasOpenPanels = Object.values(panelState).some(Boolean);
        if (hasOpenPanels) {
          header.classList.add("header_light");
          return;
        }
        if (currentScroll <= 100) {
          header.classList.remove("header_light");
          return;
        }
        if (currentScroll < lastScroll) {
          header.classList.add("header_light");
        } else if (currentScroll > lastScroll) {
          header.classList.remove("header_light");
        }
      }
      function setPanelState(name, state) {
        panelState[name] = state;
        updateTheme();
      }
      window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll < 0) currentScroll = 0;
        if (currentScroll > lastScroll && currentScroll > 100) {
          headerTween.play();
        } else if (currentScroll < lastScroll) {
          headerTween.reverse();
        }
        updateTheme(currentScroll);
        lastScroll = currentScroll;
      }, { passive: true });
      return {
        setPanelState
      };
    }
    function initSearch(header) {
      const panel = document.querySelector(".h-search");
      if (!panel) return null;
      const content = panel.querySelector(".search-form");
      let isOpen = false;
      const tl = gsap.timeline({ paused: true });
      tl.set(panel, { pointerEvents: "auto" });
      tl.set(panel, { autoAlpha: 1 });
      tl.fromTo(
        panel,
        { y: "-100%" },
        { y: 0, duration: 0.45, ease: "power2.out" }
      );
      if (content) {
        tl.fromTo(content, { x: 100, autoAlpha: 0 }, {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power4.out"
        }, "-=0.2");
      }
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(panel, { pointerEvents: "none" });
      });
      function open() {
        if (isOpen) return;
        isOpen = true;
        header.setPanelState("search", true);
        tl.play();
      }
      function close() {
        if (!isOpen) return;
        isOpen = false;
        header.setPanelState("search", false);
        tl.reverse();
      }
      return { open, close, isOpen: () => isOpen };
    }
    function initCategories(header) {
      const panel = document.querySelector(".h-mega-menu");
      if (!panel) return null;
      const cards = panel.querySelectorAll(".category-card");
      let isOpen = false;
      const tl = gsap.timeline({ paused: true });
      tl.set(panel, { pointerEvents: "auto" });
      tl.set(panel, { autoAlpha: 1 });
      tl.fromTo(
        panel,
        { y: "-100%" },
        { y: 0, duration: 0.5, ease: "power2.out" }
      );
      if (cards.length) {
        tl.fromTo(cards, { x: 140, autoAlpha: 0, scale: 0.96 }, {
          x: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.09,
          ease: "power1.out"
        }, "-=0.2");
      }
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(panel, { pointerEvents: "none" });
      });
      function open() {
        if (isOpen) return;
        isOpen = true;
        header.setPanelState("categories", true);
        tl.play();
      }
      function close() {
        if (!isOpen) return;
        isOpen = false;
        header.setPanelState("categories", false);
        tl.reverse();
      }
      return { open, close, isOpen: () => isOpen };
    }
    function initHeaderComponent() {
      const header = initHeader();
      if (!header) return;
      const search = initSearch(header);
      const categories = initCategories(header);
      const searchTrigger = document.querySelector(".btn_open-search");
      const searchPanel = document.querySelector(".h-search");
      const categoriesTrigger = document.querySelector(".btn_open-megamenu");
      const categoriesPanel = document.querySelector(".h-mega-menu");
      const isDesktop = window.matchMedia("(min-width: 1025px)");
      function bindHover(trigger, panel, instance) {
        let timeout;
        const open = () => {
          if (!isDesktop.matches) return;
          clearTimeout(timeout);
          instance.open();
        };
        const close = () => {
          if (!isDesktop.matches) return;
          timeout = setTimeout(() => {
            instance.close();
          }, 120);
        };
        trigger?.addEventListener("mouseenter", open);
        panel?.addEventListener("mouseenter", open);
        trigger?.addEventListener("mouseleave", close);
        panel?.addEventListener("mouseleave", close);
      }
      function bindClick(trigger, instance, otherInstance) {
        if (!trigger) return;
        trigger.addEventListener("click", (e) => {
          if (isDesktop.matches) return;
          e.preventDefault();
          if (instance.isOpen()) {
            instance.close();
          } else {
            otherInstance?.close();
            instance.open();
          }
        });
      }
      bindHover(searchTrigger, searchPanel, search);
      bindHover(categoriesTrigger, categoriesPanel, categories);
      bindClick(searchTrigger, search, categories);
      bindClick(categoriesTrigger, categories, search);
      if (categoriesPanel && categories) {
        const categoryCards = categoriesPanel.querySelectorAll(".category-card");
        categoryCards.forEach((card) => {
          card.addEventListener("click", () => {
            categories.close();
          });
        });
      }
    }
    function initMobMenu() {
      const nav = document.querySelector(".header__nav");
      const burger = document.querySelector(".btn_burger");
      const menuLinks = document.querySelectorAll(".menu__link");
      const body = document.body;
      const btnClose = document.querySelector(".btn_close");
      burger.addEventListener("click", (e) => {
        e.preventDefault();
        nav.classList.add("is_open");
        body.classList.add("disable-scroll");
      });
      function closeMenu() {
        nav.classList.remove("is_open");
        body.classList.remove("disable-scroll");
      }
      btnClose.addEventListener("click", closeMenu);
      menuLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    }
    function initSidebar() {
      const bntOpenSb = document.querySelector(".btn_open-sidebar");
      const sidebar = document.querySelector(".sidebar");
      const btnCloseSb = document.querySelector(".sidebar .btn_close");
      const backdrop = document.querySelector(".sidebar-backdrop");
      if (!sidebar || !backdrop) return;
      if (bntOpenSb) {
        bntOpenSb.addEventListener("click", (e) => {
          e.preventDefault();
          sidebar.classList.add("is_open");
          backdrop.classList.add("show");
          document.body.classList.add("disable-scroll");
        });
      }
      function closeSidebar(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        sidebar.classList.remove("is_open");
        backdrop.classList.remove("show");
        document.body.classList.remove("disable-scroll");
      }
      if (btnCloseSb) {
        btnCloseSb.addEventListener("click", closeSidebar);
      }
      if (backdrop) {
        backdrop.addEventListener("click", closeSidebar);
      }
    }
    function initHeroAnimation() {
      const container = document.querySelector(".animation-view");
      if (!container) return;
      ScrollTrigger.config({ ignoreMobileResize: true });
      gsap.fromTo(
        ".section-banner .staggered-heading__line",
        { y: "50%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          stagger: 0.25,
          delay: 0.1
        }
      );
      const spriteConfig = {
        src: "images/plate-sprite.webp",
        cols: 10,
        totalFrames: 90,
        frameWidth: 640,
        frameHeight: 580
      };
      const canvas = document.querySelector(".canvas-container canvas");
      let ctx = null;
      let img = null;
      function renderFrame(frameIndex) {
        if (!ctx || !img || !img.complete) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cyclicFrame = frameIndex % spriteConfig.totalFrames;
        const x = cyclicFrame % spriteConfig.cols * spriteConfig.frameWidth;
        const y = Math.floor(cyclicFrame / spriteConfig.cols) * spriteConfig.frameHeight;
        ctx.drawImage(
          img,
          x,
          y,
          spriteConfig.frameWidth,
          spriteConfig.frameHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
      if (canvas) {
        ctx = canvas.getContext("2d");
        canvas.width = spriteConfig.frameWidth;
        canvas.height = spriteConfig.frameHeight;
        img = new Image();
        img.src = spriteConfig.src;
        img.onload = () => {
          renderFrame(0);
          initScrollAnimation(true);
        };
      } else {
        initScrollAnimation(false);
      }
      function initScrollAnimation(hasCanvas) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1.8,
            invalidateOnRefresh: true,
            refreshPriority: 1
          }
        });
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
        if (hasCanvas) {
          tl.set(".canvas-container", { display: "flex" }, 0);
          tl.fromTo(
            ".canvas-container",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
            0
          );
          const plateTween = { currentFrame: 0 };
          tl.to(plateTween, {
            currentFrame: spriteConfig.totalFrames * 2 - 1,
            snap: "currentFrame",
            ease: "none",
            duration: 1.5,
            onUpdate: () => renderFrame(plateTween.currentFrame)
          }, 0);
        }
        if (typeof my3DModel !== "undefined") {
          tl.to(my3DModel, {
            rotationY: Math.PI * 2,
            duration: 1,
            ease: "none"
          }, 0);
        }
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
    function initBaselineAnim() {
      const baselineSection = document.querySelector("#about-trigger");
      if (!baselineSection) return;
      const mediaItems = baselineSection.querySelectorAll(".baseline__wrapper-item img");
      gsap.set(mediaItems, { opacity: 0, scale: 0, y: 40 });
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
          toggleActions: "play none none none"
        }
      });
    }
    function initSliderPartners() {
      if (!document.querySelector(".partner-marquee")) return;
      new Splide(".partner-marquee", {
        type: "loop",
        drag: "free",
        focus: "center",
        arrows: false,
        pagination: false,
        autoWidth: true,
        gap: "10px",
        clones: 30,
        autoScroll: {
          speed: 1,
          pauseOnHover: false,
          pauseOnFocus: false
        }
      }).mount(window.splide.Extensions);
    }
    function initTabs() {
      document.querySelectorAll("[data-tabs]").forEach((tabs) => {
        const buttons = tabs.querySelectorAll("[data-tab]");
        const contents = tabs.querySelectorAll("[id]");
        const indicator = tabs.querySelector(".tab-active-border");
        const move = (btn) => {
          if (!indicator) return;
          indicator.style.width = btn.offsetWidth + "px";
          indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
        };
        const activate = (btn) => {
          const id = btn.dataset.tab;
          buttons.forEach((b) => b.classList.remove("active"));
          contents.forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          tabs.querySelector("#" + id)?.classList.add("active");
          move(btn);
        };
        buttons.forEach((b) => b.onclick = () => activate(b));
        const initial = tabs.querySelector(".active[data-tab]") || buttons[0];
        if (initial) activate(initial);
      });
      window.addEventListener("resize", () => {
        document.querySelectorAll("[data-tabs]").forEach((tabs) => {
          const active = tabs.querySelector("[data-tab].active");
          const indicator = tabs.querySelector(".tab-active-border");
          if (!active || !indicator) return;
          indicator.style.width = active.offsetWidth + "px";
          indicator.style.transform = `translateX(${active.offsetLeft}px)`;
        });
      });
    }
    function initSplitTabs(options = {}) {
      options = {
        menuItemSelector: ".split-showcase__menu-item",
        tabContentSelector: ".split-showcase__tab",
        activeClass: "active"
      };
      const settings = {
        menuItemSelector: options.menuItemSelector,
        tabContentSelector: options.tabContentSelector,
        activeClass: options.activeClass
      };
      const menuItems = document.querySelectorAll(settings.menuItemSelector);
      const allTabs = document.querySelectorAll(settings.tabContentSelector);
      if (!menuItems.length || !allTabs.length) return;
      menuItems.forEach((item) => {
        item.addEventListener("click", () => {
          if (item.classList.contains(settings.activeClass)) return;
          const target = item.getAttribute("data-target");
          if (!target) return;
          menuItems.forEach((el) => el.classList.remove(settings.activeClass));
          item.classList.add(settings.activeClass);
          allTabs.forEach((tab) => {
            if (tab.classList.contains(target)) {
              tab.classList.add(settings.activeClass);
            } else {
              tab.classList.remove(settings.activeClass);
            }
          });
        });
      });
    }
    function initSliderRelated() {
      if (!document.querySelector(".related-posts")) return null;
      const relatedSlider = new Splide(".related-posts", {
        type: "slide",
        perPage: 2,
        perMove: 1,
        gap: "20px",
        pagination: false,
        arrows: true,
        autoWidth: false,
        breakpoints: {
          576: { perPage: 1 }
        }
      });
      relatedSlider.mount();
      return relatedSlider;
    }
    function initSliderSimilarProducts() {
      if (!document.querySelector(".similar-products")) return null;
      const similarProductsSlider = new Splide(".similar-products", {
        type: "slide",
        perPage: 3,
        perMove: 1,
        gap: 0,
        pagination: false,
        arrows: true,
        autoWidth: false,
        breakpoints: {
          768: { perPage: 2 }
        }
      });
      similarProductsSlider.mount();
      return similarProductsSlider;
    }
    function initSliderProduct() {
      if (!document.querySelector(".product-slider")) return null;
      const productSlider = new Splide(".product-slider", {
        type: "slide",
        perPage: 1,
        perMove: 1,
        gap: "20px",
        pagination: false,
        arrows: true
      });
      productSlider.mount();
      return productSlider;
    }
    function initCertificatesSlider() {
      const sliderSelector = ".slider-certificates";
      if (!document.querySelector(sliderSelector)) return;
      new Splide(sliderSelector, {
        type: "slide",
        drag: "free",
        autoWidth: true,
        gap: "12px",
        pagination: false,
        arrows: false,
        breakpoints: {
          768: { gap: "18px" }
        }
      }).mount();
      baguetteBox.run(".slider-certificates .splide__track");
    }
    function initSidebarCollapse() {
      const toggles = document.querySelectorAll('[data-toggle="collapse"]');
      if (toggles.length === 0) return;
      toggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = toggle.getAttribute("data-target");
          const targetBlock = document.querySelector(targetId);
          if (targetBlock) {
            targetBlock.classList.toggle("show");
            toggle.classList.toggle("is-active");
            const section = toggle.closest(".sidebar__section");
            if (section) {
              if (targetBlock.classList.contains("show")) {
                section.classList.add("is-open");
              } else {
                section.classList.remove("is-open");
              }
            }
          }
        });
      });
    }
    function initCustomSelect() {
      const customSelect = document.querySelector(".js-custom-select");
      if (customSelect) {
        import_nice_select2.default.bind(customSelect, { searchable: false });
        const niceSelectHtml = customSelect.nextElementSibling;
        if (niceSelectHtml) {
          gsap.fromTo(
            niceSelectHtml,
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
    function initOpenSpecs() {
      const triggers = document.querySelectorAll(".js-accordion-trigger");
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", function() {
          if (window.innerWidth <= 767) {
            const contentId = this.getAttribute("aria-controls");
            const content = document.getElementById(contentId);
            if (content) {
              const isOpen = content.classList.contains("is-open");
              if (isOpen) {
                content.classList.remove("is-open");
                this.setAttribute("aria-expanded", "false");
              } else {
                content.classList.add("is-open");
                this.setAttribute("aria-expanded", "true");
              }
            }
          }
        });
      });
    }
    function initTabsSlider() {
      const tabSliderElements = document.querySelectorAll(".tab-slider");
      const tabSliders = [];
      tabSliderElements.forEach((el) => {
        const slider = new Splide(el, {
          destroy: true,
          // на десктопі відразу вимкнено
          breakpoints: {
            767: {
              destroy: false,
              // вмикається на мобільних
              type: "slide",
              perPage: 4,
              perMove: 1,
              focus: 0,
              gap: "16px",
              arrows: false,
              pagination: true
            },
            580: {
              perPage: 3,
              perMove: 1,
              gap: "16px"
            },
            490: {
              perPage: 2,
              perMove: 1,
              gap: "16px"
            }
          }
        });
        slider.mount();
        tabSliders.push(slider);
      });
      const tabButtons = document.querySelectorAll(".prod-overview__tab-btn");
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          setTimeout(() => {
            tabSliders.forEach((slider) => {
              if (window.innerWidth <= 767 && typeof slider.refresh === "function") {
                slider.refresh();
              }
            });
          }, 100);
        });
      });
    }
    function initStepsSlider() {
      const stepsSliderEl = document.querySelector(".steps-slider");
      if (!stepsSliderEl) return;
      const slider = new Splide(stepsSliderEl, {
        destroy: true,
        // На десктопі відразу вимкнено (ваша робоча логіка)
        breakpoints: {
          991: {
            destroy: false,
            // Вмикається на мобільних (ваша робоча логіка)
            type: "slide",
            perPage: 2,
            perMove: 1,
            // СУВОРO ПО 1 СЛАЙДУ ЗА РАЗ
            focus: 0,
            // Фіксуємо фокус, щоб рахувало поштучно, а не сторінками
            gap: "16px",
            arrows: false,
            pagination: true
          },
          580: {
            perPage: 1,
            perMove: 1,
            // Тут також по 1 слайду
            focus: 0,
            gap: "16px"
          }
        }
      });
      slider.mount();
    }
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
    window.addEventListener("load", () => {
      initHeaderComponent();
      initBaselineAnim();
      initHeroAnimation();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  }

  // src/js/app.js
  document.addEventListener("DOMContentLoaded", init);
})();
//# sourceMappingURL=app.js.map
