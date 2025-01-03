/*
 * International Telephone Input v21.0.5
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// UMD
(function (factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        window.intlTelInput = factory();
    }
})(() => {
    var factoryOutput = (() => {
        var v = Object.defineProperty;
        var E = Object.getOwnPropertyDescriptor;
        var S = Object.getOwnPropertyNames;
        var D = Object.prototype.hasOwnProperty;
        var A = (o, t) => {
                for (var e in t) v(o, e, { get: t[e], enumerable: !0 });
            },
            N = (o, t, e, i) => {
                if ((t && typeof t == "object") || typeof t == "function") for (let n of S(t)) !D.call(o, n) && n !== e && v(o, n, { get: () => t[n], enumerable: !(i = E(t, n)) || i.enumerable });
                return o;
            };
        var M = (o) => N(v({}, "__esModule", { value: !0 }), o);
        var z = {};
        A(z, { Iti: () => b, default: () => B });
        var w = [
                ["Afghanistan", "af", "93"],
                ["Albania", "al", "355"],
                ["Algeria", "dz", "213"],
                ["American Samoa", "as", "1", 5, ["684"]],
                ["Andorra", "ad", "376"],
                ["Angola", "ao", "244"],
                ["Anguilla", "ai", "1", 6, ["264"]],
                ["Antigua & Barbuda", "ag", "1", 7, ["268"]],
                ["Argentina", "ar", "54"],
                ["Armenia", "am", "374"],
                ["Aruba", "aw", "297"],
                ["Ascension Island", "ac", "247"],
                ["Australia", "au", "61", 0],
                ["Austria", "at", "43"],
                ["Azerbaijan", "az", "994"],
                ["Bahamas", "bs", "1", 8, ["242"]],
                ["Bahrain", "bh", "973"],
                ["Bangladesh", "bd", "880"],
                ["Barbados", "bb", "1", 9, ["246"]],
                ["Belarus", "by", "375"],
                ["Belgium", "be", "32"],
                ["Belize", "bz", "501"],
                ["Benin", "bj", "229"],
                ["Bermuda", "bm", "1", 10, ["441"]],
                ["Bhutan", "bt", "975"],
                ["Bolivia", "bo", "591"],
                ["Bosnia & Herzegovina", "ba", "387"],
                ["Botswana", "bw", "267"],
                ["Brazil", "br", "55"],
                ["British Indian Ocean Territory", "io", "246"],
                ["British Virgin Islands", "vg", "1", 11, ["284"]],
                ["Brunei", "bn", "673"],
                ["Bulgaria", "bg", "359"],
                ["Burkina Faso", "bf", "226"],
                ["Burundi", "bi", "257"],
                ["Cambodia", "kh", "855"],
                ["Cameroon", "cm", "237"],
                ["Canada", "ca", "1", 1, ["204","226","236","249","250","263","289","306","343","354","365","367","368","382","387","403","416","418","428","431","437","438","450","584","468","474","506","514","519","548","579","581","584","587","604","613","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","902","905",],],
                ["Cape Verde", "cv", "238"],
                ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
                ["Cayman Islands", "ky", "1", 12, ["345"]],
                ["Central African Republic", "cf", "236"],
                ["Chad", "td", "235"],
                ["Chile", "cl", "56"],
                ["China", "cn", "86"],
                ["Christmas Island", "cx", "61", 2, ["89164"]],
                ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]],
                ["Colombia", "co", "57"],
                ["Comoros", "km", "269"],
                ["Congo - Brazzaville", "cg", "242"],
                ["Congo - Kinshasa", "cd", "243"],
                ["Cook Islands", "ck", "682"],
                ["Costa Rica", "cr", "506"],
                ["C\xF4te d\u2019Ivoire", "ci", "225"],
                ["Croatia", "hr", "385"],
                ["Cuba", "cu", "53"],
                ["Cura\xE7ao", "cw", "599", 0],
                ["Cyprus", "cy", "357"],
                ["Czech Republic", "cz", "420"],
                ["Denmark", "dk", "45"],
                ["Djibouti", "dj", "253"],
                ["Dominica", "dm", "1", 13, ["767"]],
                ["Dominican Republic", "do", "1", 2, ["809", "829", "849"]],
                ["Ecuador", "ec", "593"],
                ["Egypt", "eg", "20"],
                ["El Salvador", "sv", "503"],
                ["Equatorial Guinea", "gq", "240"],
                ["Eritrea", "er", "291"],
                ["Estonia", "ee", "372"],
                ["Eswatini", "sz", "268"],
                ["Ethiopia", "et", "251"],
                ["Falkland Islands", "fk", "500"],
                ["Faroe Islands", "fo", "298"],
                ["Fiji", "fj", "679"],
                ["Finland", "fi", "358", 0],
                ["France", "fr", "33"],
                ["French Guiana", "gf", "594"],
                ["French Polynesia", "pf", "689"],
                ["Gabon", "ga", "241"],
                ["Gambia", "gm", "220"],
                ["Georgia", "ge", "995"],
                ["Germany", "de", "49"],
                ["Ghana", "gh", "233"],
                ["Gibraltar", "gi", "350"],
                ["Greece", "gr", "30"],
                ["Greenland", "gl", "299"],
                ["Grenada", "gd", "1", 14, ["473"]],
                ["Guadeloupe", "gp", "590", 0],
                ["Guam", "gu", "1", 15, ["671"]],
                ["Guatemala", "gt", "502"],
                ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
                ["Guinea", "gn", "224"],
                ["Guinea-Bissau", "gw", "245"],
                ["Guyana", "gy", "592"],
                ["Haiti", "ht", "509"],
                ["Honduras", "hn", "504"],
                ["Hong Kong", "hk", "852"],
                ["Hungary", "hu", "36"],
                ["Iceland", "is", "354"],
                ["India", "in", "91"],
                ["Indonesia", "id", "62"],
                ["Iran", "ir", "98"],
                ["Iraq", "iq", "964"],
                ["Ireland", "ie", "353"],
                ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
                ["Israel", "il", "972"],
                ["Italy", "it", "39", 0],
                ["Jamaica", "jm", "1", 4, ["876", "658"]],
                ["Japan", "jp", "81"],
                ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
                ["Jordan", "jo", "962"],
                ["Kazakhstan", "kz", "7", 1, ["33", "7"]],
                ["Kenya", "ke", "254"],
                ["Kiribati", "ki", "686"],
                ["Kosovo", "xk", "383"],
                ["Kuwait", "kw", "965"],
                ["Kyrgyzstan", "kg", "996"],
                ["Laos", "la", "856"],
                ["Latvia", "lv", "371"],
                ["Lebanon", "lb", "961"],
                ["Lesotho", "ls", "266"],
                ["Liberia", "lr", "231"],
                ["Libya", "ly", "218"],
                ["Liechtenstein", "li", "423"],
                ["Lithuania", "lt", "370"],
                ["Luxembourg", "lu", "352"],
                ["Macau", "mo", "853"],
                ["Madagascar", "mg", "261"],
                ["Malawi", "mw", "265"],
                ["Malaysia", "my", "60"],
                ["Maldives", "mv", "960"],
                ["Mali", "ml", "223"],
                ["Malta", "mt", "356"],
                ["Marshall Islands", "mh", "692"],
                ["Martinique", "mq", "596"],
                ["Mauritania", "mr", "222"],
                ["Mauritius", "mu", "230"],
                ["Mayotte", "yt", "262", 1, ["269", "639"]],
                ["Mexico", "mx", "52"],
                ["Micronesia", "fm", "691"],
                ["Moldova", "md", "373"],
                ["Monaco", "mc", "377"],
                ["Mongolia", "mn", "976"],
                ["Montenegro", "me", "382"],
                ["Montserrat", "ms", "1", 16, ["664"]],
                ["Morocco", "ma", "212", 0],
                ["Mozambique", "mz", "258"],
                ["Myanmar (Burma)", "mm", "95"],
                ["Namibia", "na", "264"],
                ["Nauru", "nr", "674"],
                ["Nepal", "np", "977"],
                ["Netherlands", "nl", "31"],
                ["New Caledonia", "nc", "687"],
                ["New Zealand", "nz", "64"],
                ["Nicaragua", "ni", "505"],
                ["Niger", "ne", "227"],
                ["Nigeria", "ng", "234"],
                ["Niue", "nu", "683"],
                ["Norfolk Island", "nf", "672"],
                ["North Korea", "kp", "850"],
                ["North Macedonia", "mk", "389"],
                ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
                ["Norway", "no", "47", 0],
                ["Oman", "om", "968"],
                ["Pakistan", "pk", "92"],
                ["Palau", "pw", "680"],
                ["Palestine", "ps", "970"],
                ["Panama", "pa", "507"],
                ["Papua New Guinea", "pg", "675"],
                ["Paraguay", "py", "595"],
                ["Peru", "pe", "51"],
                ["Philippines", "ph", "63"],
                ["Poland", "pl", "48"],
                ["Portugal", "pt", "351"],
                ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
                ["Qatar", "qa", "974"],
                ["R\xE9union", "re", "262", 0],
                ["Romania", "ro", "40"],
                ["Russia", "ru", "7", 0],
                ["Rwanda", "rw", "250"],
                ["Samoa", "ws", "685"],
                ["San Marino", "sm", "378"],
                ["S\xE3o Tom\xE9 & Pr\xEDncipe", "st", "239"],
                ["Saudi Arabia", "sa", "966"],
                ["Senegal", "sn", "221"],
                ["Serbia", "rs", "381"],
                ["Seychelles", "sc", "248"],
                ["Sierra Leone", "sl", "232"],
                ["Singapore", "sg", "65"],
                ["Sint Maarten", "sx", "1", 21, ["721"]],
                ["Slovakia", "sk", "421"],
                ["Slovenia", "si", "386"],
                ["Solomon Islands", "sb", "677"],
                ["Somalia", "so", "252"],
                ["South Africa", "za", "27"],
                ["South Korea", "kr", "82"],
                ["South Sudan", "ss", "211"],
                ["Spain", "es", "34"],
                ["Sri Lanka", "lk", "94"],
                ["St Barth\xE9lemy", "bl", "590", 1],
                ["St Helena", "sh", "290"],
                ["St Kitts & Nevis", "kn", "1", 18, ["869"]],
                ["St Lucia", "lc", "1", 19, ["758"]],
                ["St Martin", "mf", "590", 2],
                ["St Pierre & Miquelon", "pm", "508"],
                ["St Vincent & Grenadines", "vc", "1", 20, ["784"]],
                ["Sudan", "sd", "249"],
                ["Suriname", "sr", "597"],
                ["Svalbard & Jan Mayen", "sj", "47", 1, ["79"]],
                ["Sweden", "se", "46"],
                ["Switzerland", "ch", "41"],
                ["Syria", "sy", "963"],
                ["Taiwan", "tw", "886"],
                ["Tajikistan", "tj", "992"],
                ["Tanzania", "tz", "255"],
                ["Thailand", "th", "66"],
                ["Timor-Leste", "tl", "670"],
                ["Togo", "tg", "228"],
                ["Tokelau", "tk", "690"],
                ["Tonga", "to", "676"],
                ["Trinidad & Tobago", "tt", "1", 22, ["868"]],
                ["Tunisia", "tn", "216"],
                ["Turkey", "tr", "90"],
                ["Turkmenistan", "tm", "993"],
                ["Turks & Caicos Islands", "tc", "1", 23, ["649"]],
                ["Tuvalu", "tv", "688"],
                ["Uganda", "ug", "256"],
                ["Ukraine", "ua", "380"],
                ["United Arab Emirates", "ae", "971"],
                ["United Kingdom", "gb", "44", 0],
                ["United States", "us", "1", 0],
                ["Uruguay", "uy", "598"],
                ["US Virgin Islands", "vi", "1", 24, ["340"]],
                ["Uzbekistan", "uz", "998"],
                ["Vanuatu", "vu", "678"],
                ["Vatican City", "va", "39", 1, ["06698"]],
                ["Venezuela", "ve", "58"],
                ["Vietnam", "vn", "84"],
                ["Wallis & Futuna", "wf", "681"],
                ["Western Sahara", "eh", "212", 1, ["5288", "5289"]],
                ["Yemen", "ye", "967"],
                ["Zambia", "zm", "260"],
                ["Zimbabwe", "zw", "263"],
                ["\xC5land Islands", "ax", "358", 1, ["18"]],
            ],
            I = [];
        for (let o = 0; o < w.length; o++) {
            let t = w[o];
            I[o] = { name: t[0], iso2: t[1], dialCode: t[2], priority: t[3] || 0, areaCodes: t[4] || null, nodeById: {} };
        }
        var C = I;
        var k = 0,
            T = {
                allowDropdown: !0,
                autoPlaceholder: "polite",
                countrySearch: !0,
                containerClass: "",
                customPlaceholder: null,
                dropdownContainer: null,
                excludeCountries: [],
                fixDropdownWidth: !0,
                formatAsYouType: !0,
                formatOnDisplay: !0,
                geoIpLookup: null,
                hiddenInput: null,
                i18n: {},
                initialCountry: "",
                nationalMode: !0,
                onlyCountries: [],
                placeholderNumberType: "MOBILE",
                preferredCountries: [],
                showFlags: !0,
                showSelectedDialCode: !1,
                strictMode: !1,
                useFullscreenPopup: typeof navigator < "u" && typeof window < "u" ? /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500 : !1,
                utilsScript: "",
            },
            x = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"],
            f = (o) => o.replace(/\D/g, ""),
            _ = (o = "") =>
                o
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase(),
            P = (o, t, e) => {
                e && !o.classList.contains(t) ? o.classList.add(t) : !e && o.classList.contains(t) && o.classList.remove(t);
            },
            L = (o) => {
                let t = f(o);
                if (t.charAt(0) === "1") {
                    let e = t.substr(1, 3);
                    return x.indexOf(e) !== -1;
                }
                return !1;
            },
            H = (o, t) => (o.name < t.name ? -1 : o.name > t.name ? 1 : 0),
            U = (o, t, e, i) => {
                if (e === 0 && !i) return 0;
                let n = 0;
                for (let s = 0; s < t.length; s++) {
                    if ((/[+0-9]/.test(t[s]) && n++, n === o && !i)) return s + 1;
                    if (i && n === o + 1) return s;
                }
                return t.length;
            },
            h = (o, t, e) => {
                let i = document.createElement(o);
                return t && Object.entries(t).forEach(([n, s]) => i.setAttribute(n, s)), e && e.appendChild(i), i;
            },
            y = (o) => {
                let { instances: t } = window.intlTelInputGlobals;
                Object.values(t).forEach((e) => e[o]());
            },
            b = class {
                id;
                promise;
                telInput;
                activeItem;
                highlightedItem;
                options;
                hadInitialPlaceholder;
                isRTL;
                selectedCountryData;
                countries;
                dialCodeMaxLen;
                dialCodeToIso2Map;
                dialCodes;
                preferredCountries;
                countryContainer;
                selectedCountry;
                selectedCountryInner;
                selectedCountryA11yText;
                selectedDialCode;
                dropdownArrow;
                dropdownContent;
                searchInput;
                searchResultsA11yText;
                countryList;
                dropdown;
                hiddenInput;
                hiddenInputCountry;
                maxCoreNumberLength;
                defaultCountry;
                _a14;
                _a9;
                _a10;
                _a11;
                _a12;
                _handleKeydownEvent;
                _a4;
                _a0;
                _a1;
                _a2;
                _a3;
                _a7;
                resolveAutoCountryPromise;
                rejectAutoCountryPromise;
                resolveUtilsScriptPromise;
                rejectUtilsScriptPromise;
                constructor(t, e = {}) {
                    (this.id = k++), (this.a = t), (this.b = null), (this.c = null), (this.d = Object.assign({}, T, e)), (this.e = !!t.getAttribute("placeholder"));
                }
                _init() {
                    this.d.useFullscreenPopup && (this.d.fixDropdownWidth = !1), this.d.countrySearch && !this.d.useFullscreenPopup && (this.d.fixDropdownWidth = !0);
                    let t = this.d.allowDropdown && !this.d.showSelectedDialCode;
                    !this.d.showFlags && t && (this.d.showFlags = !0), this.d.useFullscreenPopup && !this.d.dropdownContainer && (this.d.dropdownContainer = document.body), (this.isRTL = !!this.a.closest("[dir=rtl]"));
                    let e = new Promise((n, s) => {
                            (this.h = n), (this.i = s);
                        }),
                        i = new Promise((n, s) => {
                            (this.i0 = n), (this.i1 = s);
                        });
                    (this.promise = Promise.all([e, i])), (this.s = {}), this._b(), this._f(), this._h(), this._i(), this._i3();
                }
                _b() {
                    this._d(), this._d2(), this._e(), this._d0(), (this.d.onlyCountries.length || this.d.i18n) && this.p.sort(H);
                }
                _c(t, e, i) {
                    e.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = e.length), this.q.hasOwnProperty(e) || (this.q[e] = []);
                    for (let s = 0; s < this.q[e].length; s++) if (this.q[e][s] === t) return;
                    let n = i !== void 0 ? i : this.q[e].length;
                    this.q[e][n] = t;
                }
                _d() {
                    let { onlyCountries: t, excludeCountries: e } = this.d;
                    if (t.length) {
                        let i = t.map((n) => n.toLowerCase());
                        this.p = C.filter((n) => i.indexOf(n.iso2) > -1);
                    } else if (e.length) {
                        let i = e.map((n) => n.toLowerCase());
                        this.p = C.filter((n) => i.indexOf(n.iso2) === -1);
                    } else this.p = C;
                }
                _d0() {
                    for (let t = 0; t < this.p.length; t++) {
                        let e = this.p[t].iso2.toLowerCase();
                        this.d.i18n.hasOwnProperty(e) && (this.p[t].name = this.d.i18n[e]);
                    }
                }
                _d2() {
                    (this.dialCodes = {}), (this.dialCodeMaxLen = 0), (this.q = {});
                    for (let t = 0; t < this.p.length; t++) {
                        let e = this.p[t];
                        this.dialCodes[e.dialCode] || (this.dialCodes[e.dialCode] = !0), this._c(e.iso2, e.dialCode, e.priority);
                    }
                    for (let t = 0; t < this.p.length; t++) {
                        let e = this.p[t];
                        if (e.areaCodes) {
                            let i = this.q[e.dialCode][0];
                            for (let n = 0; n < e.areaCodes.length; n++) {
                                let s = e.areaCodes[n];
                                for (let r = 1; r < s.length; r++) {
                                    let d = e.dialCode + s.substr(0, r);
                                    this._c(i, d), this._c(e.iso2, d);
                                }
                                this._c(e.iso2, e.dialCode + s);
                            }
                        }
                    }
                }
                _e() {
                    this.preferredCountries = [];
                    for (let t = 0; t < this.d.preferredCountries.length; t++) {
                        let e = this.d.preferredCountries[t].toLowerCase(),
                            i = this._y(e, !0);
                        i && this.preferredCountries.push(i);
                    }
                }
                _f() {
                    this.a.classList.add("iti__tel-input"), !this.a.hasAttribute("autocomplete") && !(this.a.form && this.a.form.hasAttribute("autocomplete")) && this.a.setAttribute("autocomplete", "off");
                    let { allowDropdown: t, showSelectedDialCode: e, showFlags: i, containerClass: n, hiddenInput: s, dropdownContainer: r, fixDropdownWidth: d, useFullscreenPopup: l, countrySearch: a, i18n: p } = this.d,
                        c = "iti";
                    t && (c += " iti--allow-dropdown"), e && (c += " iti--show-selected-dial-code"), i && (c += " iti--show-flags"), n && (c += ` ${n}`), l || (c += " iti--inline-dropdown");
                    let u = h("div", { class: c });
                    if (
                        (this.a.parentNode?.insertBefore(u, this.a),
                        (i || e) &&
                            ((this.k = h("div", { class: "iti__country-container" }, u)),
                            (this.selectedCountry = h(
                                "button",
                                {
                                    type: "button",
                                    class: "iti__selected-country",
                                    ...(t && {
                                        "aria-expanded": "false",
                                        "aria-label": this.d.i18n.selectedCountryAriaLabel || "Selected country",
                                        "aria-haspopup": a ? "true" : "listbox",
                                        "aria-controls": a ? `iti-${this.id}__dropdown-content` : `iti-${this.id}__country-listbox`,
                                        ...(a ? { role: "combobox" } : {}),
                                    }),
                                },
                                this.k
                            )),
                            (this.l = h("div", null, this.selectedCountry)),
                            (this.selectedCountryA11yText = h("span", { class: "iti__a11y-text" }, this.l))),
                        u.appendChild(this.a),
                        this.selectedCountry && this.a.disabled && this.selectedCountry.setAttribute("aria-disabled", "true"),
                        e && (this.t = h("div", { class: "iti__selected-dial-code" }, this.selectedCountry)),
                        t)
                    ) {
                        this.a.disabled || this.selectedCountry.setAttribute("tabindex", "0"), (this.u = h("div", { class: "iti__arrow", "aria-hidden": "true" }, this.selectedCountry));
                        let m = d ? "" : "iti--flexible-dropdown-width";
                        if (
                            ((this.dropdownContent = h("div", { id: `iti-${this.id}__dropdown-content`, class: `iti__dropdown-content iti__hide ${m}` })),
                            a &&
                                ((this.searchInput = h(
                                    "input",
                                    {
                                        type: "text",
                                        class: "iti__search-input",
                                        placeholder: p.searchPlaceholder || "Search",
                                        role: "combobox",
                                        "aria-expanded": "true",
                                        "aria-label": p.searchPlaceholder || "Search",
                                        "aria-controls": `iti-${this.id}__country-listbox`,
                                        "aria-autocomplete": "list",
                                        autocomplete: "off",
                                    },
                                    this.dropdownContent
                                )),
                                (this.searchResultsA11yText = h("span", { class: "iti__a11y-text" }, this.dropdownContent))),
                            (this.countryList = h("ul", { class: "iti__country-list", id: `iti-${this.id}__country-listbox`, role: "listbox", "aria-label": p.countryListAriaLabel || "List of countries" }, this.dropdownContent)),
                            this.preferredCountries.length && !a && (this._g(this.preferredCountries, "iti__preferred", !0), h("li", { class: "iti__divider", "aria-hidden": "true" }, this.countryList)),
                            this._g(this.p, "iti__standard"),
                            a && this._p4(),
                            r)
                        ) {
                            let g = "iti iti--container";
                            l ? (g += " iti--fullscreen-popup") : (g += " iti--inline-dropdown"), a && (g += " iti--country-search"), (this.dropdown = h("div", { class: g })), this.dropdown.appendChild(this.dropdownContent);
                        } else this.k.appendChild(this.dropdownContent);
                    }
                    if (s) {
                        let m = this.a.getAttribute("name") || "",
                            g = s(m);
                        g.phone && ((this.hiddenInput = h("input", { type: "hidden", name: g.phone })), u.appendChild(this.hiddenInput)),
                            g.country && ((this.hiddenInputCountry = h("input", { type: "hidden", name: g.country })), u.appendChild(this.hiddenInputCountry));
                    }
                }
                _g(t, e, i) {
                    for (let n = 0; n < t.length; n++) {
                        let s = t[n],
                            r = i ? "-preferred" : "",
                            d = h(
                                "li",
                                { id: `iti-${this.id}__item-${s.iso2}${r}`, class: `iti__country ${e}`, tabindex: "-1", role: "option", "data-dial-code": s.dialCode, "data-country-code": s.iso2, "aria-selected": "false" },
                                this.countryList
                            );
                        s.nodeById[this.id] = d;
                        let l = "";
                        /* HYASEIN */
                        this.d.showFlags && (l += `<div class='iti__flag-box'><div class='iti__flag iti__${s.iso2}'></div></div>`),
                        /* HYASEIN: REMOVE COUNTRY CODE */
                        (l += `<span class='iti__country-name'>${s.name}</span>`),
                        (l += `<span class='iti__dial-code'>+${s.dialCode}</span>`),
                        d.insertAdjacentHTML("beforeend", l);
                    }
                }
                _h(t = !1) {
                    let e = this.a.getAttribute("value"),
                        i = this.a.value,
                        s = e && e.charAt(0) === "+" && (!i || i.charAt(0) !== "+") ? e : i,
                        r = this._5(s),
                        d = L(s),
                        { initialCountry: l } = this.d;
                    if (r && !d) this._v(s);
                    else if (l !== "auto" || t) {
                        let a = l ? l.toLowerCase() : "";
                        a && this._y(a, !0) ? this._z(a) : r && d ? this._z("us") : this._z();
                    }
                    s && this._u(s);
                }
                _i() {
                    this._j(), this.d.allowDropdown && this._i2(), (this.hiddenInput || this.hiddenInputCountry) && this.a.form && this._i0();
                }
                _i0() {
                    (this._a14 = () => {
                        this.hiddenInput && (this.hiddenInput.value = this.getNumber()), this.hiddenInputCountry && (this.hiddenInputCountry.value = this.getSelectedCountryData().iso2 || "");
                    }),
                        this.a.form?.addEventListener("submit", this._a14);
                }
                _i2() {
                    this._a9 = (e) => {
                        this.dropdownContent.classList.contains("iti__hide") ? this.a.focus() : e.preventDefault();
                    };
                    let t = this.a.closest("label");
                    t && t.addEventListener("click", this._a9),
                        (this._a10 = () => {
                            this.dropdownContent.classList.contains("iti__hide") && !this.a.disabled && !this.a.readOnly && this._n();
                        }),
                        this.selectedCountry.addEventListener("click", this._a10),
                        (this._a11 = (e) => {
                            this.dropdownContent.classList.contains("iti__hide") && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key) && (e.preventDefault(), e.stopPropagation(), this._n()), e.key === "Tab" && this._2();
                        }),
                        this.k.addEventListener("keydown", this._a11);
                }
                _i3() {
                    this.d.utilsScript && !window.intlTelInputUtils
                        ? window.intlTelInputGlobals.documentReady()
                            ? window.intlTelInputGlobals.loadUtils(this.d.utilsScript)
                            : window.addEventListener("load", () => {
                                  window.intlTelInputGlobals.loadUtils(this.d.utilsScript);
                              })
                        : this.i0(),
                        this.d.initialCountry === "auto" && !this.s.iso2 ? this._i4() : this.h();
                }
                _i4() {
                    window.intlTelInputGlobals.autoCountry
                        ? this.handleAutoCountry()
                        : window.intlTelInputGlobals.startedLoadingAutoCountry ||
                          ((window.intlTelInputGlobals.startedLoadingAutoCountry = !0),
                          typeof this.d.geoIpLookup == "function" &&
                              this.d.geoIpLookup(
                                  (t = "") => {
                                      let e = t.toLowerCase();
                                      e && this._y(e, !0) ? ((window.intlTelInputGlobals.autoCountry = e), setTimeout(() => y("handleAutoCountry"))) : (this._h(!0), y("rejectAutoCountryPromise"));
                                  },
                                  () => {
                                      this._h(!0), y("rejectAutoCountryPromise");
                                  }
                              ));
                }
                _j() {
                    let { strictMode: t, formatAsYouType: e } = this.d,
                        i = !1;
                    (this._a12 = (n) => {
                        this._v(this.a.value) && this._8();
                        let s = n && n.data && /[^+0-9]/.test(n.data),
                            r = n && n.inputType === "insertFromPaste" && this.a.value;
                        if ((s || (r && !t) ? (i = !0) : /[^+0-9]/.test(this.a.value) || (i = !1), e && !i)) {
                            let d = this.a.selectionStart || 0,
                                a = this.a.value.substring(0, d).replace(/[^+0-9]/g, "").length,
                                p = n && n.inputType === "deleteContentForward",
                                c = this._9(),
                                u = U(a, c, d, p);
                            (this.a.value = c), this.a.setSelectionRange(u, u);
                        }
                    }),
                        this.a.addEventListener("input", this._a12),
                        t &&
                            ((this._handleKeydownEvent = (n) => {
                                if (n.key.length === 1 && !n.altKey && !n.ctrlKey && !n.metaKey) {
                                    let s = this.a.selectionStart === 0 && n.key === "+",
                                        r = /^[0-9]$/.test(n.key),
                                        d = s || r,
                                        l = this._6(),
                                        a = window.intlTelInputUtils.getCoreNumber(l, this.s.iso2),
                                        p = this.maxCoreNumberLength && a.length >= this.maxCoreNumberLength;
                                    (!d || p) && n.preventDefault();
                                }
                            }),
                            this.a.addEventListener("keydown", this._handleKeydownEvent));
                }
                _j2(t) {
                    let e = parseInt(this.a.getAttribute("maxlength") || "", 10);
                    return e && t.length > e ? t.substr(0, e) : t;
                }
                _trigger(t) {
                    let e = new Event(t, { bubbles: !0, cancelable: !0 });
                    this.a.dispatchEvent(e);
                }
                _n() {
                    let { fixDropdownWidth: t, countrySearch: e } = this.d;
                    if ((t && (this.dropdownContent.style.width = `${this.a.offsetWidth}px`), this.dropdownContent.classList.remove("iti__hide"), this.selectedCountry.setAttribute("aria-expanded", "true"), this._o(), this.b && !e))
                        this._x(this.b, !1), this._3(this.b, !0);
                    else {
                        let i = this.countryList.firstElementChild;
                        i && (this._x(i, !1), (this.countryList.scrollTop = 0)), e && this.searchInput.focus();
                    }
                    this._p(), this.u.classList.add("iti__arrow--up"), this._trigger("open:countrydropdown");
                }
                _o() {
                    if ((this.d.dropdownContainer && this.d.dropdownContainer.appendChild(this.dropdown), !this.d.useFullscreenPopup)) {
                        let t = this.a.getBoundingClientRect(),
                            e = document.documentElement.scrollTop,
                            i = t.top + e,
                            n = this.dropdownContent.offsetHeight,
                            s = i + this.a.offsetHeight + n < e + window.innerHeight,
                            r = i - n > e,
                            d = !this.d.countrySearch && !s && r;
                        if ((P(this.dropdownContent, "iti__dropdown-content--dropup", d), this.d.dropdownContainer)) {
                            let l = d ? 0 : this.a.offsetHeight;
                            (this.dropdown.style.top = `${i + l}px`), (this.dropdown.style.left = `${t.left + document.body.scrollLeft}px`), (this._a4 = () => this._2()), window.addEventListener("scroll", this._a4);
                        }
                    }
                }
                _p() {
                    (this._a0 = (n) => {
                        let s = n.target?.closest(".iti__country");
                        s && this._x(s, !1);
                    }),
                        this.countryList.addEventListener("mouseover", this._a0),
                        (this._a1 = (n) => {
                            let s = n.target?.closest(".iti__country");
                            s && this._1(s);
                        }),
                        this.countryList.addEventListener("click", this._a1);
                    let t = !0;
                    (this._a2 = () => {
                        t || this._2(), (t = !1);
                    }),
                        document.documentElement.addEventListener("click", this._a2);
                    let e = "",
                        i = null;
                    if (
                        ((this._a3 = (n) => {
                            ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(n.key) &&
                                (n.preventDefault(), n.stopPropagation(), n.key === "ArrowUp" || n.key === "ArrowDown" ? this._q(n.key) : n.key === "Enter" ? this._r() : n.key === "Escape" && this._2()),
                                !this.d.countrySearch &&
                                    /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(n.key) &&
                                    (n.stopPropagation(),
                                    i && clearTimeout(i),
                                    (e += n.key.toLowerCase()),
                                    this._s(e),
                                    (i = setTimeout(() => {
                                        e = "";
                                    }, 1e3)));
                        }),
                        document.addEventListener("keydown", this._a3),
                        this.d.countrySearch)
                    ) {
                        let n = () => {
                                let r = this.searchInput.value.trim();
                                r ? this._p3(r) : this._p3("", !0);
                            },
                            s = null;
                        (this._a7 = () => {
                            s && clearTimeout(s),
                                (s = setTimeout(() => {
                                    n(), (s = null);
                                }, 100));
                        }),
                            this.searchInput.addEventListener("input", this._a7),
                            this.searchInput.addEventListener("click", (r) => r.stopPropagation());
                    }
                }
                _p3(t, e = !1) {
                    let i = !0;
                    this.countryList.innerHTML = "";
                    let n = _(t);
                    for (let s = 0; s < this.p.length; s++) {
                        let r = this.p[s],
                            d = _(r.name),
                            l = `+${r.dialCode}`;
                        if (e || d.includes(n) || l.includes(n) || r.iso2.includes(n)) {
                            let a = r.nodeById[this.id];
                            a && this.countryList.appendChild(a), i && (this._x(a, !1), (i = !1));
                        }
                    }
                    (this.countryList.scrollTop = 0), this._p4();
                }
                _p4() {
                    let { i18n: t } = this.d,
                        e = this.countryList.childElementCount,
                        i;
                    e === 0
                        ? (i = t.zeroSearchResults || "No results found")
                        : e === 1
                        ? (i = t.oneSearchResult || "1 result found")
                        : (i = t.multipleSearchResults ? t.multipleSearchResults.replace("${count}", e.toString()) : `${e} results found`),
                        (this.searchResultsA11yText.textContent = i);
                }
                _q(t) {
                    let e = t === "ArrowUp" ? this.c?.previousElementSibling : this.c?.nextElementSibling;
                    if (
                        (e
                            ? e.classList.contains("iti__divider") && (e = t === "ArrowUp" ? e.previousElementSibling : e.nextElementSibling)
                            : this.countryList.childElementCount > 1 && (e = t === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild),
                        e)
                    ) {
                        this._3(e, !1);
                        let i = !this.d.countrySearch;
                        this._x(e, i);
                    }
                }
                _r() {
                    this.c && this._1(this.c);
                }
                _s(t) {
                    for (let e = 0; e < this.p.length; e++) {
                        let i = this.p[e];
                        if (i.name.substr(0, t.length).toLowerCase() === t) {
                            let s = i.nodeById[this.id];
                            this._x(s, !1), this._3(s, !0);
                            break;
                        }
                    }
                }
                _u(t) {
                    let e = t;
                    if (this.d.formatOnDisplay && window.intlTelInputUtils && this.s) {
                        let i = this.d.nationalMode || (e.charAt(0) !== "+" && !this.d.showSelectedDialCode),
                            { NATIONAL: n, INTERNATIONAL: s } = window.intlTelInputUtils.numberFormat,
                            r = i ? n : s;
                        e = window.intlTelInputUtils.formatNumber(e, this.s.iso2, r);
                    }
                    (e = this._7(e)), (this.a.value = e);
                }
                _v(t) {
                    let e = t.indexOf("+"),
                        i = e ? t.substring(e) : t,
                        n = this.s.dialCode;
                    i && n === "1" && i.charAt(0) !== "+" && (i.charAt(0) !== "1" && (i = `1${i}`), (i = `+${i}`)), this.d.showSelectedDialCode && n && i.charAt(0) !== "+" && (i = `+${n}${i}`);
                    let r = this._5(i, !0),
                        d = f(i),
                        l = null;
                    if (r) {
                        let a = this.q[f(r)],
                            p = a.indexOf(this.s.iso2) !== -1 && d.length <= r.length - 1;
                        if (!(n === "1" && L(d)) && !p) {
                            for (let u = 0; u < a.length; u++)
                                if (a[u]) {
                                    l = a[u];
                                    break;
                                }
                        }
                    } else i.charAt(0) === "+" && d.length ? (l = "") : (!i || i === "+") && !this.s.iso2 && (l = this.j);
                    return l !== null ? this._z(l) : !1;
                }
                _x(t, e) {
                    let i = this.c;
                    i && (i.classList.remove("iti__highlight"), i.setAttribute("aria-selected", "false")),
                        (this.c = t),
                        this.c.classList.add("iti__highlight"),
                        this.c.setAttribute("aria-selected", "true"),
                        this.selectedCountry.setAttribute("aria-activedescendant", t.getAttribute("id") || ""),
                        this.d.countrySearch && this.searchInput.setAttribute("aria-activedescendant", t.getAttribute("id") || ""),
                        e && this.c.focus();
                }
                _y(t, e) {
                    for (let i = 0; i < this.p.length; i++) if (this.p[i].iso2 === t) return this.p[i];
                    if (e) return null;
                    throw new Error(`No country data for '${t}'`);
                }
                _z(t) {
                    let { allowDropdown: e, showSelectedDialCode: i, showFlags: n, countrySearch: s, i18n: r } = this.d,
                        d = this.s.iso2 ? this.s : {};
                    if (((this.s = t ? this._y(t, !1) || {} : {}), this.s.iso2 && (this.j = this.s.iso2), this.l)) {
                        let l = "",
                            a = "";
                        t ? n && ((l = `iti__flag iti__${t}`), (a = `${this.s.name} +${this.s.dialCode}`)) : ((l = "iti__flag iti__globe"), (a = r.noCountrySelected || "No country selected")),
                            (this.l.className = l),
                            (this.selectedCountryA11yText.textContent = a);
                    }
                    if ((this._z3(t, i), i)) {
                        let l = this.s.dialCode ? `+${this.s.dialCode}` : "";
                        this.t.innerHTML = l;
                        let a = this.selectedCountry.offsetWidth || this._z2();
                        this.isRTL ? (this.a.style.paddingRight = `${a + 6}px`) : (this.a.style.paddingLeft = `${a + 6}px`);
                    }
                    if ((this._0(), this._updateMaxLength(), e && !s)) {
                        let l = this.b;
                        if ((l && (l.classList.remove("iti__active"), l.setAttribute("aria-selected", "false")), t)) {
                            let a = this.countryList.querySelector(`#iti-${this.id}__item-${t}-preferred`) || this.countryList.querySelector(`#iti-${this.id}__item-${t}`);
                            a && (a.setAttribute("aria-selected", "true"), a.classList.add("iti__active"), (this.b = a));
                        }
                    }
                    return d.iso2 !== t;
                }
                _updateMaxLength() {
                    if (this.d.strictMode && window.intlTelInputUtils)
                        if (this.s.iso2) {
                            let t = window.intlTelInputUtils.numberType[this.d.placeholderNumberType],
                                e = window.intlTelInputUtils.getExampleNumber(this.s.iso2, !1, t, !0),
                                i = e;
                            for (; window.intlTelInputUtils.isPossibleNumber(e, this.s.iso2); ) (i = e), (e += "0");
                            let n = window.intlTelInputUtils.getCoreNumber(i, this.s.iso2);
                            this.maxCoreNumberLength = n.length;
                        } else this.maxCoreNumberLength = null;
                }
                _z3(t = null, e) {
                    if (!this.selectedCountry) return;
                    let i;
                    t && !e ? (i = `${this.s.name}: +${this.s.dialCode}`) : t ? (i = this.s.name) : (i = "Unknown"), this.selectedCountry.setAttribute("title", i);
                }
                _z2() {
                    if (this.a.parentNode) {
                        let t = this.a.parentNode.cloneNode(!1);
                        (t.style.visibility = "hidden"), document.body.appendChild(t);
                        let e = this.k.cloneNode();
                        t.appendChild(e);
                        let i = this.selectedCountry.cloneNode(!0);
                        e.appendChild(i);
                        let n = i.offsetWidth;
                        return document.body.removeChild(t), n;
                    }
                    return 0;
                }
                _0() {
                    let { autoPlaceholder: t, placeholderNumberType: e, nationalMode: i, customPlaceholder: n } = this.d,
                        s = t === "aggressive" || (!this.e && t === "polite");
                    if (window.intlTelInputUtils && s) {
                        let r = window.intlTelInputUtils.numberType[e],
                            d = this.s.iso2 ? window.intlTelInputUtils.getExampleNumber(this.s.iso2, i, r) : "";
                        (d = this._7(d)), typeof n == "function" && (d = n(d, this.s)), this.a.setAttribute("placeholder", d);
                    }
                }
                _1(t) {
                    let e = this._z(t.getAttribute("data-country-code"));
                    this._2(), this._4(t.getAttribute("data-dial-code")), this.a.focus(), e && this._8();
                }
                _2() {
                    this.dropdownContent.classList.add("iti__hide"),
                        this.selectedCountry.setAttribute("aria-expanded", "false"),
                        this.selectedCountry.removeAttribute("aria-activedescendant"),
                        this.c && this.c.setAttribute("aria-selected", "false"),
                        this.d.countrySearch && this.searchInput.removeAttribute("aria-activedescendant"),
                        this.u.classList.remove("iti__arrow--up"),
                        document.removeEventListener("keydown", this._a3),
                        this.d.countrySearch && this.searchInput.removeEventListener("input", this._a7),
                        document.documentElement.removeEventListener("click", this._a2),
                        this.countryList.removeEventListener("mouseover", this._a0),
                        this.countryList.removeEventListener("click", this._a1),
                        this.d.dropdownContainer && (this.d.useFullscreenPopup || window.removeEventListener("scroll", this._a4), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)),
                        this._trigger("close:countrydropdown");
                }
                _3(t, e) {
                    let i = this.countryList,
                        n = document.documentElement.scrollTop,
                        s = i.offsetHeight,
                        r = i.getBoundingClientRect().top + n,
                        d = r + s,
                        l = t.offsetHeight,
                        a = t.getBoundingClientRect().top + n,
                        p = a + l,
                        c = a - r + i.scrollTop,
                        u = s / 2 - l / 2;
                    if (a < r) e && (c -= u), (i.scrollTop = c);
                    else if (p > d) {
                        e && (c += u);
                        let m = s - l;
                        i.scrollTop = c - m;
                    }
                }
                _4(t) {
                    let e = this.a.value,
                        i = `+${t}`,
                        n;
                    if (e.charAt(0) === "+") {
                        let s = this._5(e);
                        s ? (n = e.replace(s, i)) : (n = i), (this.a.value = n);
                    }
                }
                _5(t, e) {
                    let i = "";
                    if (t.charAt(0) === "+") {
                        let n = "";
                        for (let s = 0; s < t.length; s++) {
                            let r = t.charAt(s);
                            if (!isNaN(parseInt(r, 10))) {
                                if (((n += r), e)) this.q[n] && (i = t.substr(0, s + 1));
                                else if (this.dialCodes[n]) {
                                    i = t.substr(0, s + 1);
                                    break;
                                }
                                if (n.length === this.dialCodeMaxLen) break;
                            }
                        }
                    }
                    return i;
                }
                _6() {
                    let t = this.a.value.trim(),
                        { dialCode: e } = this.s,
                        i,
                        n = f(t);
                    return this.d.showSelectedDialCode && !this.d.nationalMode && t.charAt(0) !== "+" && e && n ? (i = `+${e}`) : (i = ""), i + t;
                }
                _7(t) {
                    let e = t;
                    if (this.d.showSelectedDialCode) {
                        let i = this._5(e);
                        if (i) {
                            i = `+${this.s.dialCode}`;
                            let n = e[i.length] === " " || e[i.length] === "-" ? i.length + 1 : i.length;
                            e = e.substr(n);
                        }
                    }
                    return this._j2(e);
                }
                _8() {
                    this._trigger("countrychange");
                }
                _9() {
                    let t = this._6(),
                        e = window.intlTelInputUtils ? window.intlTelInputUtils.formatNumberAsYouType(t, this.s.iso2) : t,
                        { dialCode: i } = this.s;
                    return this.d.showSelectedDialCode && !this.d.nationalMode && this.a.value.charAt(0) !== "+" && e.includes(`+${i}`) ? (e.split(`+${i}`)[1] || "").trim() : e;
                }
                handleAutoCountry() {
                    this.d.initialCountry === "auto" && window.intlTelInputGlobals.autoCountry && ((this.j = window.intlTelInputGlobals.autoCountry), this.a.value || this.setCountry(this.j), this.h());
                }
                handleUtils() {
                    window.intlTelInputUtils && (this.a.value && this._u(this.a.value), this.s.iso2 && (this._0(), this._updateMaxLength())), this.i0();
                }
                destroy() {
                    if (this.d.allowDropdown) {
                        this._2(), this.selectedCountry.removeEventListener("click", this._a10), this.k.removeEventListener("keydown", this._a11);
                        let i = this.a.closest("label");
                        i && i.removeEventListener("click", this._a9);
                    }
                    let { form: t } = this.a;
                    this._a14 && t && t.removeEventListener("submit", this._a14),
                        this.a.removeEventListener("input", this._a12),
                        this._handleKeydownEvent && this.a.removeEventListener("keydown", this._handleKeydownEvent),
                        this.a.removeAttribute("data-intl-tel-input-id");
                    let e = this.a.parentNode;
                    e?.parentNode?.insertBefore(this.a, e), e?.parentNode?.removeChild(e), delete window.intlTelInputGlobals.instances[this.id];
                }
                getExtension() {
                    return window.intlTelInputUtils ? window.intlTelInputUtils.getExtension(this._6(), this.s.iso2) : "";
                }
                getNumber(t) {
                    if (window.intlTelInputUtils) {
                        let { iso2: e } = this.s;
                        return window.intlTelInputUtils.formatNumber(this._6(), e, t);
                    }
                    return "";
                }
                getNumberType() {
                    return window.intlTelInputUtils ? window.intlTelInputUtils.getNumberType(this._6(), this.s.iso2) : -99;
                }
                getSelectedCountryData() {
                    return this.s;
                }
                getValidationError() {
                    if (window.intlTelInputUtils) {
                        let { iso2: t } = this.s;
                        return window.intlTelInputUtils.getValidationError(this._6(), t);
                    }
                    return -99;
                }
                isValidNumber(t = !0) {
                    let e = this._6();
                    return /\p{L}/u.test(e) ? !1 : window.intlTelInputUtils ? window.intlTelInputUtils.isPossibleNumber(e, this.s.iso2, t) : null;
                }
                isValidNumberPrecise() {
                    let t = this._6();
                    return /\p{L}/u.test(t) ? !1 : window.intlTelInputUtils ? window.intlTelInputUtils.isValidNumber(t, this.s.iso2) : null;
                }
                setCountry(t) {
                    let e = t.toLowerCase();
                    this.s.iso2 !== e && (this._z(e), this._4(this.s.dialCode), this._8());
                }
                setNumber(t) {
                    let e = this._v(t);
                    this._u(t), e && this._8();
                }
                setPlaceholderNumberType(t) {
                    (this.d.placeholderNumberType = t), this._0();
                }
            },
            F = (o, t, e) => {
                let i = document.createElement("script");
                (i.onload = () => {
                    y("handleUtils"), t && t();
                }),
                    (i.onerror = () => {
                        y("rejectUtilsScriptPromise"), e && e();
                    }),
                    (i.className = "iti-load-utils"),
                    (i.async = !0),
                    (i.src = o),
                    document.body.appendChild(i);
            },
            O = (o) => (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript ? ((window.intlTelInputGlobals.startedLoadingUtilsScript = !0), new Promise((t, e) => F(o, t, e))) : null);
        if (typeof window == "object") {
            let o = {
                defaults: T,
                documentReady: () => document.readyState === "complete",
                getCountryData: () => C,
                getInstance: (t) => {
                    let e = t.getAttribute("data-intl-tel-input-id");
                    return e ? o.instances[e] : null;
                },
                instances: {},
                loadUtils: O,
                version: "21.0.5",
            };
            window.intlTelInputGlobals = o;
        }
        var R = (o, t) => {
                let e = new b(o, t);
                return e._init(), o.setAttribute("data-intl-tel-input-id", e.id.toString()), (window.intlTelInputGlobals.instances[e.id] = e), e;
            },
            B = R;
        return M(z);
    })();

    // UMD
    return factoryOutput.default;
});