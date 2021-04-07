(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+NYR":
/*!************************************************!*\
  !*** ./src/app/services/navigation.service.ts ***!
  \************************************************/
/*! exports provided: NavigationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return NavigationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");







class NavigationService {
    constructor(router, location) {
        this.router = router;
        this.location = location;
        this.subscriptionToRoute = this.subscribeToRouteChanges();
        this.currentRoute = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
    }
    subscribeToRouteChanges() {
        return this.router.events
            .pipe(this.filterRouteFromNavigationEvent())
            .subscribe((route) => this.updateCurrentRoute(route));
    }
    filterRouteFromNavigationEvent() {
        return function (source) {
            return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((event) => event.url), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((url) => url.split('/')[1]));
        };
    }
    updateCurrentRoute(route) {
        return this.currentRoute.next(route);
    }
    getCurrentRouteObservable() {
        return this.currentRoute.asObservable();
    }
    ngOnDestroy() {
        this.unsubscribeFromObservables();
    }
    unsubscribeFromObservables() {
        if (this.subscriptionToRoute) {
            this.subscriptionToRoute.unsubscribe();
        }
    }
}
NavigationService.ɵfac = function NavigationService_Factory(t) { return new (t || NavigationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"])); };
NavigationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NavigationService, factory: NavigationService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavigationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"] }]; }, null); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jacob-ian/dev/PortfolioWeb/src/main.ts */"zUnb");


/***/ }),

/***/ "1a9O":
/*!***********************************************!*\
  !*** ./src/app/services/education/subject.ts ***!
  \***********************************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return Subject; });
/* harmony import */ var _database_database_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object */ "kW+F");
/* harmony import */ var _education_exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./education-exception */ "MJoW");


class Subject extends _database_database_object__WEBPACK_IMPORTED_MODULE_0__["DatabaseObject"] {
    constructor(database, document) {
        super(database);
        if (document) {
            this.id = document.id;
            this.name = document.name;
            this.handbookUrl = document.handbookUrl;
        }
    }
    getId() {
        if (!this.id) {
            throw new _education_exception__WEBPACK_IMPORTED_MODULE_1__["EducationException"]('invalid-input', 'The "id" variable is undefined.');
        }
        return this.id;
    }
    getName() {
        if (!this.name) {
            throw new _education_exception__WEBPACK_IMPORTED_MODULE_1__["EducationException"]('invalid-input', 'The "name" variable is undefined.');
        }
        return this.name;
    }
    getUrl() {
        if (!this.handbookUrl) {
            throw new _education_exception__WEBPACK_IMPORTED_MODULE_1__["EducationException"]('invalid-input', 'The "handbookUrl" variable is undefined.');
        }
        return this.handbookUrl;
    }
}


/***/ }),

/***/ "2hHv":
/*!****************************************************************************************!*\
  !*** ./src/app/core/multi-select/multi-select-option/multi-select-option.component.ts ***!
  \****************************************************************************************/
/*! exports provided: MultiSelectOptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectOptionComponent", function() { return MultiSelectOptionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/exception */ "A4p0");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");




class MultiSelectOptionComponent {
    constructor() {
        this.selectEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.checked = false;
    }
    ngOnInit() { }
    getOption() {
        if (!this.option) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'invalid-input', 'The "option" attribute is required.');
        }
        return this.option;
    }
    isChecked() {
        return this.checked;
    }
    onClick() {
        this.toggleCheck();
        this.emitValue();
    }
    toggleCheck() {
        this.checked = !this.checked;
    }
    emitValue() {
        let emitMessage = this.createEmitMessage();
        this.selectEvent.emit(emitMessage);
    }
    createEmitMessage() {
        let instruction = this.checked ? '+' : '-';
        return `${instruction}${this.option}`;
    }
    /**
     * TESTING ONLY
     */
    setOption(option) {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'internal', 'Cannot set option using testing method.');
        }
        this.option = option;
    }
}
MultiSelectOptionComponent.ɵfac = function MultiSelectOptionComponent_Factory(t) { return new (t || MultiSelectOptionComponent)(); };
MultiSelectOptionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MultiSelectOptionComponent, selectors: [["app-multi-select-option"]], inputs: { option: "option" }, outputs: { selectEvent: "selectEvent" }, decls: 7, vars: 3, consts: [[1, "multi-select", 3, "click"], ["viewBox", " 0 0 24 24", "xmlns", "http://www.w3.org/2000/svg", 1, "multi-select"], ["id", "check_box_black_24dp 1"], ["id", "box", "d", "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"], ["id", "check", "d", "M16.58 7.58L17.99 9L9.99 17L5.99 13.01L7.41 11.6L9.99 14.17L16.58 7.58Z"], [1, "content", "multi-select"]], template: function MultiSelectOptionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MultiSelectOptionComponent_Template_button_click_0_listener() { return ctx.onClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "g", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("checked", ctx.isChecked());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getOption());
    } }, styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n\nbutton[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 15px;\n  font-size: 0.9rem;\n  transition: all ease-in-out 200ms;\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  background: transparent;\n  color: var(--font-color-default);\n  border: none;\n  outline: none;\n  text-transform: capitalize;\n}\n\nbutton[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  flex: 1;\n  white-space: nowrap;\n  text-align: left;\n}\n\nbutton[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex: none;\n  margin-right: 10px;\n  width: 24px;\n  height: 24px;\n}\n\nbutton[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: var(--font-color-default);\n}\n\nbutton[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   #check[_ngcontent-%COMP%] {\n  display: none;\n}\n\nbutton[_ngcontent-%COMP%]   .checked[_ngcontent-%COMP%]   #check[_ngcontent-%COMP%] {\n  display: block;\n}\n\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.2);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LW9wdGlvbi9tdWx0aS1zZWxlY3Qtb3B0aW9uLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLGdDQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwQkFBQTtBQUVGOztBQUFFO0VBQ0UsT0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFFSjs7QUFBRTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBRUo7O0FBREk7RUFDRSwrQkFBQTtBQUdOOztBQURJO0VBQ0UsYUFBQTtBQUdOOztBQUNJO0VBQ0UsY0FBQTtBQUNOOztBQUVBO0VBQ0UsMENBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvcmUvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC1vcHRpb24vbXVsdGktc2VsZWN0LW9wdGlvbi5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IHJvd1xuICBcbmJ1dHRvblxuICBmbGV4OiAxXG4gIHBhZGRpbmc6IDEycHggMTVweFxuICBmb250LXNpemU6IDAuOXJlbVxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMjAwbXNcbiAgY3Vyc29yOiBwb2ludGVyXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IHJvd1xuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudFxuICBjb2xvcjogdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuICBib3JkZXI6IG5vbmVcbiAgb3V0bGluZTogbm9uZVxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZVxuXG4gIC5jb250ZW50XG4gICAgZmxleDogMVxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXBcbiAgICB0ZXh0LWFsaWduOiBsZWZ0XG5cbiAgc3ZnXG4gICAgZmxleDogbm9uZVxuICAgIG1hcmdpbi1yaWdodDogMTBweFxuICAgIHdpZHRoOiAyNHB4XG4gICAgaGVpZ2h0OiAyNHB4XG4gICAgcGF0aFxuICAgICAgZmlsbDogdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuXG4gICAgI2NoZWNrXG4gICAgICBkaXNwbGF5OiBub25lXG5cbiAgLmNoZWNrZWRcblxuICAgICNjaGVja1xuICAgICAgZGlzcGxheTogYmxvY2tcbiAgICAgIFxuXG5idXR0b246aG92ZXJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjIpXG5cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MultiSelectOptionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-multi-select-option',
                templateUrl: './multi-select-option.component.html',
                styleUrls: ['./multi-select-option.component.sass'],
            }]
    }], function () { return []; }, { option: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['option']
        }], selectEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "3Wri":
/*!*****************************************************************!*\
  !*** ./src/app/home/display-button/display-button.component.ts ***!
  \*****************************************************************/
/*! exports provided: DisplayButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayButtonComponent", function() { return DisplayButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");



const _c0 = ["*"];
class DisplayButtonComponent {
    constructor() { }
    ngOnInit() { }
    getRouterLink() {
        return this.routerLink;
    }
    setRouterLink(link) {
        this.routerLink = link;
    }
}
DisplayButtonComponent.ɵfac = function DisplayButtonComponent_Factory(t) { return new (t || DisplayButtonComponent)(); };
DisplayButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DisplayButtonComponent, selectors: [["app-display-button"]], inputs: { routerLink: "routerLink" }, ngContentSelectors: _c0, decls: 2, vars: 1, consts: [[3, "routerLink"]], template: function DisplayButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", ctx.getRouterLink());
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  border: solid 1px var(--font-color-default);\n  border-radius: 1000px;\n  transition: var(--default-transition);\n  margin-bottom: 70px;\n}\n\n[_nghost-%COMP%]:hover {\n  filter: brightness(0.8);\n}\n\na[_ngcontent-%COMP%] {\n  color: var(--font-color-default) !important;\n  padding: 15px;\n  font-size: 0.9rem;\n  font-weight: 300;\n}\n\na[_ngcontent-%COMP%]:hover {\n  filter: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9kaXNwbGF5LWJ1dHRvbi9kaXNwbGF5LWJ1dHRvbi5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSwyQ0FBQTtFQUNBLHFCQUFBO0VBQ0EscUNBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUNBO0VBQ0UsdUJBQUE7QUFFRjs7QUFBQTtFQUNFLDJDQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFHRjs7QUFEQTtFQUNFLHVCQUFBO0FBSUYiLCJmaWxlIjoic3JjL2FwcC9ob21lL2Rpc3BsYXktYnV0dG9uL2Rpc3BsYXktYnV0dG9uLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3RcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbiAgYm9yZGVyOiBzb2xpZCAxcHggdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuICBib3JkZXItcmFkaXVzOiAxMDAwcHhcbiAgdHJhbnNpdGlvbjogdmFyKC0tZGVmYXVsdC10cmFuc2l0aW9uKVxuICBtYXJnaW4tYm90dG9tOiA3MHB4XG4gIFxuOmhvc3Q6aG92ZXJcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDAuOClcblxuYVxuICBjb2xvcjogdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KSAhaW1wb3J0YW50XG4gIHBhZGRpbmc6IDE1cHhcbiAgZm9udC1zaXplOiAwLjlyZW1cbiAgZm9udC13ZWlnaHQ6IDMwMFxuXG5hOmhvdmVyXG4gIGZpbHRlcjogbm9uZSAhaW1wb3J0YW50Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DisplayButtonComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-display-button',
                templateUrl: './display-button.component.html',
                styleUrls: ['./display-button.component.sass'],
            }]
    }], function () { return []; }, { routerLink: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['routerLink']
        }] }); })();


/***/ }),

/***/ "3fdq":
/*!**********************************************!*\
  !*** ./src/app/services/projects/project.ts ***!
  \**********************************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
/* harmony import */ var _database_database_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object */ "kW+F");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "YMqD");
/* harmony import */ var _project_exception__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-exception */ "tzTb");



class Project extends _database_database_object__WEBPACK_IMPORTED_MODULE_0__["DatabaseObject"] {
    constructor(database, document) {
        super(database);
        if (this.documentIsValid) {
            this.id = document.id;
            this.name = document.name;
            this.description = document.description;
            this.technologies = document.technologies;
            this.links = document.links;
            this.dateStart = document.dateStart;
            this.status = document.status;
            this.dateEnd = document.dateEnd;
            this.iconUrl = document.iconUrl;
            return;
        }
        throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', `The project document is invalid:\n${JSON.stringify(document)}.`);
    }
    documentIsValid(document) {
        if (!document) {
            return false;
        }
        return !!(document.id &&
            document.name &&
            document.description &&
            document.technologies.length > 0 &&
            document.links.length > 0 &&
            document.dateStart &&
            document.status);
    }
    getId() {
        if (!this.id) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project ID is undefined');
        }
        return this.id;
    }
    getName() {
        if (!this.name) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project name is undefined');
        }
        return this.name;
    }
    getDescription() {
        if (!this.description) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project description is undefined');
        }
        return this.description;
    }
    getTechnologies() {
        if (!this.technologies) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project description is undefined');
        }
        return this.technologies;
    }
    getLinks() {
        if (!this.links) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'There are no project links defined.');
        }
        return this.links;
    }
    getDateStart() {
        if (!this.dateStart) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project starting date is undefined');
        }
        return _utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].formatTimeMsToMMMYYYY(this.dateStart);
    }
    getDateStartMs() {
        if (!this.dateStart) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project starting date is undefined');
        }
        return this.dateStart;
    }
    getStatus() {
        if (!this.status) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_2__["ProjectException"]('invalid-input', 'The Project status is undefined');
        }
        return this.status;
    }
    getDateEnd() {
        if (!this.dateEnd) {
            return null;
        }
        return _utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].formatTimeMsToMMMYYYY(this.dateEnd);
    }
    getDateEndMs() {
        if (!this.dateEnd) {
            return null;
        }
        return this.dateEnd;
    }
    getIconUrl() {
        if (!this.iconUrl) {
            return null;
        }
        return this.iconUrl;
    }
    usesTechnologies(technologies) {
        if (this.canCompareTechnologies(technologies)) {
            return this.areTechnologiesUsed(technologies);
        }
        return false;
    }
    canCompareTechnologies(query) {
        return this.hasTechnologies() && this.techQueryNotEmpty(query);
    }
    hasTechnologies() {
        return this.technologies && this.technologies.length > 0;
    }
    techQueryNotEmpty(technologies) {
        return technologies.length > 0;
    }
    areTechnologiesUsed(technologies) {
        const itemCount = technologies.length;
        let usedTechnologies = 0;
        let item = 0;
        let compare = true;
        while (compare && item < itemCount) {
            let technology = technologies[item];
            if (this.notUsed(technology)) {
                return false;
            }
            usedTechnologies++;
            item++;
        }
        let allAreUsed = usedTechnologies === item;
        return allAreUsed;
    }
    notUsed(technology) {
        return !this.technologies.includes(technology);
    }
}


/***/ }),

/***/ "3l51":
/*!***************************************************!*\
  !*** ./src/app/services/meta/metadata.service.ts ***!
  \***************************************************/
/*! exports provided: MetadataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetadataService", function() { return MetadataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _meta_tag_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meta-tag-factory */ "IMCB");
/* harmony import */ var _open_graph_tag_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./open-graph-tag-factory */ "h8tz");
/* harmony import */ var _route_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./route-data.service */ "Lk+c");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");







class MetadataService {
    constructor(routeData, title, meta) {
        this.routeData = routeData;
        this.title = title;
        this.meta = meta;
        this.defaultTitle = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].websiteName;
        this.currentPageTags = [];
        this.currentRouteData = null;
        this.subscriptionToRouteData = this.subscribeToRouteData();
    }
    subscribeToRouteData() {
        let routeData$ = this.routeData.getRouteDataObservable();
        return routeData$.subscribe((data) => this.updatePageMetaData(data));
    }
    updatePageMetaData(data) {
        this.currentRouteData = data;
        this.deleteCurrentMetaTags();
        this.updatePageTitle();
        this.updateMetaTags();
        this.updateOpenGraphTags();
    }
    deleteCurrentMetaTags() {
        this.currentPageTags.forEach((pageTag) => this.deleteTag(pageTag));
    }
    deleteTag(pageTag) {
        let tagSelector = pageTag.getSelector();
        this.meta.removeTag(tagSelector);
    }
    updatePageTitle() {
        var _a;
        let title = (_a = this.currentRouteData) === null || _a === void 0 ? void 0 : _a.title;
        if (!title) {
            title = this.defaultTitle;
        }
        this.setPageTitle(title);
    }
    setPageTitle(title) {
        return this.title.setTitle(title);
    }
    updateMetaTags() {
        var _a;
        let metaData = (_a = this.currentRouteData) === null || _a === void 0 ? void 0 : _a.meta;
        if (metaData) {
            this.setPageTags(PageTagType.Meta, metaData);
        }
    }
    updateOpenGraphTags() {
        var _a;
        let openGraphData = (_a = this.currentRouteData) === null || _a === void 0 ? void 0 : _a.og;
        if (openGraphData) {
            this.setPageTags(PageTagType.OpenGraph, openGraphData);
        }
    }
    setPageTags(type, tags) {
        this.selectPageTagFactory(type);
        tags.forEach((tag) => {
            let { name, content } = tag;
            let pageTag = this.pageTagFactory.createTag(name, content);
            this.addTagToPage(pageTag);
        });
    }
    selectPageTagFactory(type) {
        if (this.isMetaTagType(type)) {
            this.pageTagFactory = new _meta_tag_factory__WEBPACK_IMPORTED_MODULE_2__["MetaTagFactory"]();
        }
        else if (this.isOpenGraphTagType(type)) {
            this.pageTagFactory = new _open_graph_tag_factory__WEBPACK_IMPORTED_MODULE_3__["OpenGraphTagFactory"]();
        }
    }
    isMetaTagType(type) {
        return type === PageTagType.Meta;
    }
    isOpenGraphTagType(type) {
        return type === PageTagType.OpenGraph;
    }
    addTagToPage(pageTag) {
        let tagMetaDefinition = pageTag.getMetaDefinition();
        if (this.tagExists(pageTag)) {
            this.meta.updateTag(tagMetaDefinition);
        }
        else {
            this.meta.addTag(tagMetaDefinition);
        }
        return this.saveTagToList(pageTag);
    }
    tagExists(pageTag) {
        let selector = pageTag.getSelector();
        return !!this.meta.getTag(selector);
    }
    saveTagToList(pageTag) {
        this.currentPageTags.push(pageTag);
    }
    setPageMetaData(data) {
        return this.routeData.setRouteData(data);
    }
    getPageMetaData() {
        return this.routeData.getRouteData();
    }
    ngOnDestroy() {
        this.unsubscribeFromObservables();
    }
    unsubscribeFromObservables() {
        if (this.subscriptionToRouteData) {
            this.subscriptionToRouteData.unsubscribe();
        }
    }
}
MetadataService.ɵfac = function MetadataService_Factory(t) { return new (t || MetadataService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_route_data_service__WEBPACK_IMPORTED_MODULE_4__["RouteDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Meta"])); };
MetadataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MetadataService, factory: MetadataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MetadataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _route_data_service__WEBPACK_IMPORTED_MODULE_4__["RouteDataService"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Title"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["Meta"] }]; }, null); })();
var PageTagType;
(function (PageTagType) {
    PageTagType["Meta"] = "meta";
    PageTagType["OpenGraph"] = "open";
})(PageTagType || (PageTagType = {}));


/***/ }),

/***/ "40ud":
/*!**************************************************************!*\
  !*** ./src/app/services/database/database-object-factory.ts ***!
  \**************************************************************/
/*! exports provided: DatabaseObjectFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseObjectFactory", function() { return DatabaseObjectFactory; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../exception */ "A4p0");


const EMPTY_ARRAY = [];
class DatabaseObjectFactory {
    constructor(database) {
        this.database = database;
    }
    createFromCollection(collection) {
        return this.convertDocsToDatabaseObjects(collection);
    }
    convertDocsToDatabaseObjects(documents) {
        try {
            return documents.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((docs) => this.mapDocsToDatabaseObjects(docs)));
        }
        catch (error) {
            throw new _exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('DB', 'internal', 'Could not create an observable from the collection', error);
        }
    }
    mapDocsToDatabaseObjects(docs) {
        if (this.docsExist(docs)) {
            return docs.map((doc) => this.createDatabaseObject(doc));
        }
        return EMPTY_ARRAY;
    }
    docsExist(docs) {
        return docs.length > 0;
    }
}


/***/ }),

/***/ "84zG":
/*!******************************************!*\
  !*** ./src/app/about/about.component.ts ***!
  \******************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _services_education_education_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/education/education.service */ "E0xr");
/* harmony import */ var _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../window/flex-container/flex-container.component */ "k71K");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _window_social_links_social_links_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../window/social-links/social-links.component */ "AUGU");
/* harmony import */ var _qualification_qualification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./qualification/qualification.component */ "jPiE");








function AboutComponent_ng_container_19_div_1_app_qualification_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-qualification", 13);
} if (rf & 2) {
    const qualification_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("qualification", qualification_r4);
} }
function AboutComponent_ng_container_19_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Education");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AboutComponent_ng_container_19_div_1_app_qualification_6_Template, 1, 1, "app-qualification", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const qualifications_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", qualifications_r1);
} }
function AboutComponent_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AboutComponent_ng_container_19_div_1_Template, 7, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const qualifications_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", qualifications_r1.length > 0);
} }
class AboutComponent {
    constructor(educationService) {
        this.educationService = educationService;
    }
    ngOnInit() { }
    getQualifications() {
        if (!this.qualifications) {
            this.qualifications = this.educationService.getQualifications();
            this.sortQualificationsByEndDate();
        }
        return this.qualifications;
    }
    sortQualificationsByEndDate() {
        this.qualifications = this.qualifications.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((array) => this.sortByEndDate(array)));
    }
    sortByEndDate(array) {
        return array.sort((a, b) => b.getDateEndMilliseconds() - a.getDateEndMilliseconds());
    }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) { return new (t || AboutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_education_education_service__WEBPACK_IMPORTED_MODULE_2__["EducationService"])); };
AboutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AboutComponent, selectors: [["app-about"]], decls: 26, vars: 3, consts: [["itemscope", "", "itemtype", "https://schema.org/Person"], [1, "row"], [1, "item", "larger"], ["itemprop", "name", 1, "hide"], ["itemprop", "disambiguatingDescription"], ["itemprop", "description"], [1, "item"], ["src", "assets/res/profile.jpeg", "alt", "Jacob Ian Matthews", "itemprop", "image", 1, "profile-image"], [4, "ngIf"], ["class", "row", 4, "ngIf"], [1, "education-container"], [1, "education-timeline"], [3, "qualification", 4, "ngFor", "ngForOf"], [3, "qualification"]], template: function AboutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "About Me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-flex-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Who am I?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Jacob Ian Matthews");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "I am a ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "professional software developer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " who loves making web applications! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "I like to bring business ideas to life and I plan on starting my own Software-as-a-service company in the Financial Technology (FinTech) industry. I am also a multi-instrumentalist musician, an avid investor and reader, a follower of Stoicism, and a coffee enthusiast! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, AboutComponent_ng_container_19_Template, 2, 1, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](20, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Follow Me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "app-social-links");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](20, 1, ctx.getQualifications()));
    } }, directives: [_window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_3__["FlexContainerComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _window_social_links_social_links_component__WEBPACK_IMPORTED_MODULE_5__["SocialLinksComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _qualification_qualification_component__WEBPACK_IMPORTED_MODULE_6__["QualificationComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.row[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: flex-start;\n  margin-bottom: 15px;\n}\n\n.item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.item[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n}\n\n.profile-image[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  border: var(--font-color-default) 10px solid;\n}\n\n.larger[_ngcontent-%COMP%] {\n  flex: 2;\n  margin-right: 50px;\n}\n\n.hide[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.education-container[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 20px 0;\n}\n\n.education-container[_ngcontent-%COMP%]   .education-timeline[_ngcontent-%COMP%] {\n  height: 100%;\n  position: absolute;\n  z-index: -10;\n  width: 2px;\n  background-color: var(--font-color-subtitle);\n  border-radius: 100px;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n@media screen and (max-width: 650px) {\n  .row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    margin-bottom: 20px;\n  }\n  .row[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%] {\n    margin-right: 0;\n  }\n  .row[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7QUFFRjs7QUFBQTtFQUNFLGtCQUFBO0FBR0Y7O0FBREE7RUFDRSxlQUFBO0FBSUY7O0FBRkE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsNENBQUE7QUFLRjs7QUFIQTtFQUNFLE9BQUE7RUFDQSxrQkFBQTtBQU1GOztBQUpBO0VBQ0UsYUFBQTtBQU9GOztBQUxBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBUUY7O0FBTkU7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLDRDQUFBO0VBQ0Esb0JBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0FBUUo7O0FBTkE7RUFDRTtJQUNFLHNCQUFBO0lBQ0EsbUJBQUE7RUFTRjtFQVBFO0lBQ0UsZUFBQTtFQVNKO0VBUEU7SUFDRSxnQkFBQTtFQVNKO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hYm91dC9hYm91dC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGZsZXg6IDFcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uXG4gIFxuLnJvd1xuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydFxuICBtYXJnaW4tYm90dG9tOiAxNXB4XG5cbi5pdGVtXG4gIHRleHQtYWxpZ246IGNlbnRlclxuXG4uaXRlbTpsYXN0LWNoaWxkXG4gIG1hcmdpbi1yaWdodDogMFxuXG4ucHJvZmlsZS1pbWFnZVxuICB3aWR0aDogMjAwcHhcbiAgaGVpZ2h0OiAyMDBweFxuICBib3JkZXItcmFkaXVzOiA1MCVcbiAgYm9yZGVyOiB2YXIoLS1mb250LWNvbG9yLWRlZmF1bHQpIDEwcHggc29saWRcblxuLmxhcmdlclxuICBmbGV4OiAyXG4gIG1hcmdpbi1yaWdodDogNTBweFxuXG4uaGlkZVxuICBkaXNwbGF5OiBub25lXG5cbi5lZHVjYXRpb24tY29udGFpbmVyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZVxuICBwYWRkaW5nOiAyMHB4IDBcblxuICAuZWR1Y2F0aW9uLXRpbWVsaW5lXG4gICAgaGVpZ2h0OiAxMDAlXG4gICAgcG9zaXRpb246IGFic29sdXRlXG4gICAgei1pbmRleDogLTEwXG4gICAgd2lkdGg6IDJweFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZvbnQtY29sb3Itc3VidGl0bGUpXG4gICAgYm9yZGVyLXJhZGl1czogMTAwcHhcbiAgICB0b3A6IDBcbiAgICBsZWZ0OiA1MCVcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSlcblxuQG1lZGlhIHNjcmVlbiBhbmQgKCBtYXgtd2lkdGg6IDY1MHB4IClcbiAgLnJvd1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4XG4gIFxuICAgIC5pdGVtXG4gICAgICBtYXJnaW4tcmlnaHQ6IDBcblxuICAgIC5pdGVtOmxhc3QtY2hpbGRcbiAgICAgIG1hcmdpbi1ib3R0b206IDBcblxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AboutComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-about',
                templateUrl: './about.component.html',
                styleUrls: ['./about.component.sass'],
            }]
    }], function () { return [{ type: _services_education_education_service__WEBPACK_IMPORTED_MODULE_2__["EducationService"] }]; }, null); })();


/***/ }),

/***/ "9vUh":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _display_button_display_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display-button/display-button.component */ "3Wri");




class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 15, vars: 0, consts: [[1, "row", "larger"], [1, "item", "larger", "top-room"], [1, "first", "display"], ["routerLink", "/about", "routerLinkActive", "true"], [1, "third", "accent"], ["routerLink", "/projects", "routerLinkActive", "true"], [1, "item"], ["src", "assets/res/home-anim.gif"], [1, "row"], ["routerLink", "/projects"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Jacob");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "is creating");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "web applications.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "app-display-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "See what I've made");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkActive"], _display_button_display_button_component__WEBPACK_IMPORTED_MODULE_2__["DisplayButtonComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-primary);\n  font-size: 1.2rem;\n}\n\n.row[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.item[_ngcontent-%COMP%] {\n  flex: 1;\n  flex-direction: row;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 200px;\n  filter: brightness(10);\n}\n\n.larger[_ngcontent-%COMP%] {\n  flex: 2;\n}\n\n.top-room[_ngcontent-%COMP%] {\n  margin-top: 50px;\n}\n\n.display[_ngcontent-%COMP%] {\n  font-family: var(--font-family-display);\n  font-size: 3rem;\n}\n\n.bg-secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n\n.bg-tertiary[_ngcontent-%COMP%] {\n  background-color: var(--color-tertiary);\n}\n\n.accent[_ngcontent-%COMP%] {\n  color: var(--font-color-accent);\n}\n\n.first[_ngcontent-%COMP%] {\n  margin-bottom: 150px;\n  margin-left: 20px;\n}\n\n.first[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--font-color-default);\n  font-weight: 300;\n}\n\n.third[_ngcontent-%COMP%] {\n  margin-top: 60px;\n  margin-right: 20px;\n}\n\n.third[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-weight: 300;\n}\n\n.small-font[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n\n@media screen and (max-width: 750px) {\n  .row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .item[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .top-room[_ngcontent-%COMP%] {\n    margin-top: 30px;\n  }\n\n  .larger[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .first[_ngcontent-%COMP%] {\n    margin-left: 0;\n    margin-bottom: 65px;\n  }\n\n  .third[_ngcontent-%COMP%] {\n    margin-right: 0;\n    margin-top: 25px;\n    font-size: 1.4rem;\n  }\n}\n\n@media screen and (max-width: 250px) {\n  [_nghost-%COMP%] {\n    font-size: 1rem;\n  }\n\n  .display[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n\n  .third[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNDQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFDQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBRUY7O0FBQUE7RUFDRSxPQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUdGOztBQURFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBR0o7O0FBREE7RUFDRSxPQUFBO0FBSUY7O0FBRkE7RUFDRSxnQkFBQTtBQUtGOztBQUhBO0VBQ0UsdUNBQUE7RUFDQSxlQUFBO0FBTUY7O0FBSkE7RUFDRSx3Q0FBQTtBQU9GOztBQUxBO0VBQ0UsdUNBQUE7QUFRRjs7QUFOQTtFQUNFLCtCQUFBO0FBU0Y7O0FBUEE7RUFDRSxvQkFBQTtFQUNBLGlCQUFBO0FBVUY7O0FBUkU7RUFDRSxnQ0FBQTtFQUNBLGdCQUFBO0FBVUo7O0FBUkE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FBV0Y7O0FBVEU7RUFDRSxnQkFBQTtBQVdKOztBQVRBO0VBQ0UsaUJBQUE7QUFZRjs7QUFWQTtFQUNFO0lBQ0Usc0JBQUE7RUFhRjs7RUFYQTtJQUNFLHNCQUFBO0VBY0Y7O0VBWkE7SUFDRSxnQkFBQTtFQWVGOztFQWJBO0lBQ0UsT0FBQTtFQWdCRjs7RUFkQTtJQUNFLGNBQUE7SUFDQSxtQkFBQTtFQWlCRjs7RUFmQTtJQUNFLGVBQUE7SUFDQSxnQkFBQTtJQUNBLGlCQUFBO0VBa0JGO0FBQ0Y7O0FBakJBO0VBQ0U7SUFDRSxlQUFBO0VBbUJGOztFQWpCQTtJQUNFLGlCQUFBO0VBb0JGOztFQWxCQTtJQUNFLGlCQUFBO0VBcUJGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdFxuICBmbGV4OiAxXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KVxuICBmb250LXNpemU6IDEuMnJlbVxuXG4ucm93IFxuICBmbGV4OiAxXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IHJvd1xuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyXG4gIFxuLml0ZW1cbiAgZmxleDogMVxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGRpc3BsYXk6IGZsZXhcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuXG4gIGltZ1xuICAgIGhlaWdodDogMjAwcHhcbiAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMTApXG5cbi5sYXJnZXJcbiAgZmxleDogMiBcblxuLnRvcC1yb29tXG4gIG1hcmdpbi10b3A6IDUwcHhcblxuLmRpc3BsYXlcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LWRpc3BsYXkpXG4gIGZvbnQtc2l6ZTogM3JlbVxuXG4uYmctc2Vjb25kYXJ5XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXNlY29uZGFyeSlcblxuLmJnLXRlcnRpYXJ5XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXRlcnRpYXJ5KVxuXG4uYWNjZW50XG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yLWFjY2VudClcbiAgXG4uZmlyc3RcbiAgbWFyZ2luLWJvdHRvbTogMTUwcHhcbiAgbWFyZ2luLWxlZnQ6IDIwcHhcbiAgXG4gIGFcbiAgICBjb2xvcjogdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuICAgIGZvbnQtd2VpZ2h0OiAzMDBcblxuLnRoaXJkXG4gIG1hcmdpbi10b3A6IDYwcHhcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4XG5cbiAgYVxuICAgIGZvbnQtd2VpZ2h0OiAzMDBcblxuLnNtYWxsLWZvbnRcbiAgZm9udC1zaXplOiAwLjlyZW1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKCBtYXgtd2lkdGg6IDc1MHB4IClcbiAgLnJvd1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cblxuICAuaXRlbVxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cblxuICAudG9wLXJvb21cbiAgICBtYXJnaW4tdG9wOiAzMHB4XG5cbiAgLmxhcmdlclxuICAgIGZsZXg6IDFcblxuICAuZmlyc3RcbiAgICBtYXJnaW4tbGVmdDogMFxuICAgIG1hcmdpbi1ib3R0b206IDY1cHhcblxuICAudGhpcmRcbiAgICBtYXJnaW4tcmlnaHQ6IDBcbiAgICBtYXJnaW4tdG9wOiAyNXB4XG4gICAgZm9udC1zaXplOiAxLjRyZW1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKCBtYXgtd2lkdGg6IDI1MHB4IClcbiAgOmhvc3RcbiAgICBmb250LXNpemU6IDFyZW1cblxuICAuZGlzcGxheVxuICAgIGZvbnQtc2l6ZTogMi41cmVtXG4gIFxuICAudGhpcmRcbiAgICBmb250LXNpemU6IDEuMnJlbSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.sass']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "A4p0":
/*!***************************************!*\
  !*** ./src/app/services/exception.ts ***!
  \***************************************/
/*! exports provided: Exception */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exception", function() { return Exception; });
class Exception {
    constructor(errorId, objOrError, message, context) {
        this.id = errorId;
        this.message = '';
        if (context) {
            this.context = context;
        }
        if (this.isError(objOrError)) {
            this.error = objOrError;
            this.message = message;
            return;
        }
        if (objOrError.message) {
            this.message = objOrError.message;
        }
        if (objOrError.error) {
            this.error = objOrError.error;
            return;
        }
        this.error = 'unknown';
    }
    isError(error) {
        return typeof error === 'string';
    }
    getMessage() {
        return `${this.id} | ${this.error}: ${this.message}`;
    }
}


/***/ }),

/***/ "AUGU":
/*!***************************************************************!*\
  !*** ./src/app/window/social-links/social-links.component.ts ***!
  \***************************************************************/
/*! exports provided: SocialLinksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialLinksComponent", function() { return SocialLinksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");


class SocialLinksComponent {
    constructor() { }
    ngOnInit() {
    }
}
SocialLinksComponent.ɵfac = function SocialLinksComponent_Factory(t) { return new (t || SocialLinksComponent)(); };
SocialLinksComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SocialLinksComponent, selectors: [["app-social-links"]], decls: 6, vars: 0, consts: [["href", "https://github.com/jacob-ian", "target", "_blank", 1, "social-link"], ["src", "assets/res/socials/github-64x64.png", "alt", "GitHub"], ["href", "https://instagram.com/jacobianmatthews", "target", "_blank", 1, "social-link"], ["src", "assets/res/socials/instagram-48x48.png", "alt", "Instagram"], ["href", "https://twitter.com/jacobian_", "target", "_blank", 1, "social-link"], ["src", "assets/res/socials/twitter-64.png", "alt", "Twitter"]], template: function SocialLinksComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  margin-top: 25px;\n}\n\n.social-link[_ngcontent-%COMP%] {\n  display: flex;\n  margin-left: 15px;\n}\n\n.social-link[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 36px;\n  width: auto;\n}\n\n.social-link[_ngcontent-%COMP%]:first-child {\n  margin-left: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L3NvY2lhbC1saW5rcy9zb2NpYWwtbGlua3MuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtBQUVGOztBQUFFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFFSjs7QUFDQTtFQUNFLGNBQUE7QUFFRiIsImZpbGUiOiJzcmMvYXBwL3dpbmRvdy9zb2NpYWwtbGlua3Mvc29jaWFsLWxpbmtzLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3RcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbiAgbWFyZ2luLXRvcDogMjVweFxuXG4uc29jaWFsLWxpbmtcbiAgZGlzcGxheTogZmxleFxuICBtYXJnaW4tbGVmdDogMTVweFxuXG4gIGltZ1xuICAgIGhlaWdodDogMzZweFxuICAgIHdpZHRoOiBhdXRvXG5cblxuLnNvY2lhbC1saW5rOmZpcnN0LWNoaWxkXG4gIG1hcmdpbi1sZWZ0OiAwXG5cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SocialLinksComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-social-links',
                templateUrl: './social-links.component.html',
                styleUrls: ['./social-links.component.sass']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    websiteName: 'Jacob Ian Matthews',
    firebase: {
        apiKey: 'AIzaSyAk0KMrouGcn7C89Xw7BNIVWzLzufxRxzY',
        authDomain: 'jacobianmatthews-portfolio.firebaseapp.com',
        databaseURL: 'https://jacobianmatthews-portfolio.firebaseio.com',
        projectId: 'jacobianmatthews-portfolio',
        storageBucket: 'jacobianmatthews-portfolio.appspot.com',
        messagingSenderId: '1059888186279',
        appId: '1:1059888186279:web:c78555ee8c3875b3c66c82',
        measurementId: 'G-8WN7W0MXYX',
    },
    useEmulators: true,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Bxe8":
/*!*******************************************************!*\
  !*** ./src/app/services/education/subject-factory.ts ***!
  \*******************************************************/
/*! exports provided: SubjectFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectFactory", function() { return SubjectFactory; });
/* harmony import */ var _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object-factory */ "40ud");
/* harmony import */ var _subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subject */ "1a9O");


class SubjectFactory extends _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__["DatabaseObjectFactory"] {
    constructor(database) {
        super(database);
    }
    createDatabaseObject(doc) {
        return new _subject__WEBPACK_IMPORTED_MODULE_1__["Subject"](this.database, doc);
    }
}


/***/ }),

/***/ "DgBv":
/*!*************************************************************!*\
  !*** ./src/app/services/education/qualification-factory.ts ***!
  \*************************************************************/
/*! exports provided: QualificationFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualificationFactory", function() { return QualificationFactory; });
/* harmony import */ var _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object-factory */ "40ud");
/* harmony import */ var _qualification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qualification */ "FmpP");


class QualificationFactory extends _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__["DatabaseObjectFactory"] {
    constructor(database) {
        super(database);
    }
    createDatabaseObject(doc) {
        return new _qualification__WEBPACK_IMPORTED_MODULE_1__["Qualification"](this.database, doc);
    }
}


/***/ }),

/***/ "E0xr":
/*!*********************************************************!*\
  !*** ./src/app/services/education/education.service.ts ***!
  \*********************************************************/
/*! exports provided: EducationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EducationService", function() { return EducationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_education_qualification_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/education/qualification-factory */ "DgBv");
/* harmony import */ var _database_database_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../database/database.service */ "aX8X");




class EducationService {
    constructor(database) {
        this.database = database;
        this.qualificationFactory = new src_app_services_education_qualification_factory__WEBPACK_IMPORTED_MODULE_1__["QualificationFactory"](this.database);
    }
    getQualifications() {
        let collection = this.database.getCollection('qualifications');
        return this.qualificationFactory.createFromCollection(collection);
    }
}
EducationService.ɵfac = function EducationService_Factory(t) { return new (t || EducationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_database_database_service__WEBPACK_IMPORTED_MODULE_2__["DatabaseService"])); };
EducationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: EducationService, factory: EducationService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EducationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _database_database_service__WEBPACK_IMPORTED_MODULE_2__["DatabaseService"] }]; }, null); })();


/***/ }),

/***/ "EKn2":
/*!********************************************!*\
  !*** ./src/app/window/window.component.ts ***!
  \********************************************/
/*! exports provided: WindowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowComponent", function() { return WindowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");


const _c0 = ["*"];
class WindowComponent {
    constructor() { }
    ngOnInit() {
    }
}
WindowComponent.ɵfac = function WindowComponent_Factory(t) { return new (t || WindowComponent)(); };
WindowComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WindowComponent, selectors: [["app-window"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function WindowComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    } }, styles: ["[_nghost-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L3dpbmRvdy5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC93aW5kb3cvd2luZG93LmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3RcbiAgbWluLWhlaWdodDogMTAwJVxuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WindowComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-window',
                templateUrl: './window.component.html',
                styleUrls: ['./window.component.sass']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "FmpP":
/*!*****************************************************!*\
  !*** ./src/app/services/education/qualification.ts ***!
  \*****************************************************/
/*! exports provided: Qualification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Qualification", function() { return Qualification; });
/* harmony import */ var _education_exception__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./education-exception */ "MJoW");
/* harmony import */ var src_app_services_database_database_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/database/database-object */ "kW+F");
/* harmony import */ var _subject_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subject-factory */ "Bxe8");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "YMqD");




class Qualification extends src_app_services_database_database_object__WEBPACK_IMPORTED_MODULE_1__["DatabaseObject"] {
    constructor(database, idOrDocument) {
        super(database);
        this.name = null;
        this.description = null;
        this.dateStart = null;
        this.dateEnd = null;
        this.handbookUrl = null;
        this.institution = null;
        this.credentialCategory = null;
        this.educationLevel = null;
        if (!idOrDocument) {
            this.id = this.createId();
            return;
        }
        if (this.inputIsId(idOrDocument)) {
            this.id = idOrDocument;
            return;
        }
        if (this.inputIsQualificationDoc(idOrDocument)) {
            this.id = idOrDocument.id;
            this.name = idOrDocument.name;
            this.description = idOrDocument.description;
            this.dateStart = idOrDocument.dateStart;
            this.dateEnd = idOrDocument.dateEnd;
            this.handbookUrl = idOrDocument.handbookUrl;
            this.institution = idOrDocument.institution;
            this.credentialCategory = idOrDocument.credentialCategory;
            this.educationLevel = idOrDocument.educationLevel;
            this.validateData();
            return;
        }
    }
    inputIsId(input) {
        return typeof input === 'string';
    }
    inputIsQualificationDoc(input) {
        return !!(input.id &&
            input.name &&
            input.description &&
            input.dateStart &&
            input.dateEnd &&
            input.handbookUrl &&
            input.institution);
    }
    validateData() {
        if (this.dateStart > this.dateEnd) {
            throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', 'Qualification starting date cannot be later than ending date.');
        }
    }
    getName() {
        if (this.name) {
            return this.name;
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification name isn't defined.");
    }
    getDescription() {
        if (this.description) {
            return this.description;
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification description isn't defined.");
    }
    getId() {
        if (this.id) {
            return this.id;
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification ID isn't defined.");
    }
    getDateStart() {
        if (this.dateStart) {
            return _utils__WEBPACK_IMPORTED_MODULE_3__["Utils"].formatTimeMsToMMMYYYY(this.dateStart);
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification starting date isn't defined.");
    }
    getDateEnd() {
        if (this.dateEnd) {
            if (this.endDateIsInFuture()) {
                return 'now';
            }
            else {
                return _utils__WEBPACK_IMPORTED_MODULE_3__["Utils"].formatTimeMsToMMMYYYY(this.dateEnd);
            }
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification end date isn't defined.");
    }
    getDateEndMilliseconds() {
        if (this.dateEnd) {
            return this.dateEnd;
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification end date isn't defined.");
    }
    endDateIsInFuture() {
        return this.dateEnd > Date.now();
    }
    getUrl() {
        if (this.handbookUrl) {
            return this.handbookUrl;
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification URL isn't defined.");
    }
    getInstitution() {
        if (this.institution) {
            return this.institution;
        }
        throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', "Qualification institution isn't defined.");
    }
    getSubjects() {
        this.subcollectionFactory = new _subject_factory__WEBPACK_IMPORTED_MODULE_2__["SubjectFactory"](this.database);
        let path = this.createSubjectsPath();
        return this.getSubcollection(path);
    }
    createSubjectsPath() {
        return `qualifications/${this.getId()}/subjects`;
    }
    getCredentialCateogry() {
        if (!this.credentialCategory) {
            throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', 'The Qualification Credential Category is undefined');
        }
        return this.credentialCategory;
    }
    getEducationLevel() {
        if (!this.educationLevel) {
            throw new _education_exception__WEBPACK_IMPORTED_MODULE_0__["EducationException"]('invalid-input', 'The Qualification education level is undefined.');
        }
        return this.educationLevel;
    }
}


/***/ }),

/***/ "IMCB":
/*!***************************************************!*\
  !*** ./src/app/services/meta/meta-tag-factory.ts ***!
  \***************************************************/
/*! exports provided: MetaTagFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaTagFactory", function() { return MetaTagFactory; });
/* harmony import */ var _meta_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./meta-tag */ "r/ZF");

class MetaTagFactory {
    createTag(name, content) {
        return new _meta_tag__WEBPACK_IMPORTED_MODULE_0__["MetaTag"](name, content);
    }
}


/***/ }),

/***/ "J7nD":
/*!**********************************************************************!*\
  !*** ./src/app/window/navigation-bar/nav-item/nav-item.component.ts ***!
  \**********************************************************************/
/*! exports provided: NavItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavItemComponent", function() { return NavItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/navigation.service */ "+NYR");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "SVse");





function NavItemComponent_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 2);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.getIconUrl(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
const _c0 = ["*"];
class NavItemComponent {
    constructor(navigationService) {
        this.navigationService = navigationService;
        this.subscriptionToCurrentRoute = this.subscribeToCurrentRoute();
    }
    subscribeToCurrentRoute() {
        return this.navigationService
            .getCurrentRouteObservable()
            .subscribe((route) => this.updateActiveRoute(route));
    }
    updateActiveRoute(route) {
        this.activeRoute = route;
    }
    ngOnInit() { }
    isRouteActive() {
        return this.route === this.activeRoute;
    }
    isUpdateable() {
        if (!this.updateWhenActive) {
            return true;
        }
        return this.updateWhenActive === 'true' ? true : false;
    }
    setUpdateable(boolean) {
        this.updateWhenActive = boolean;
    }
    isButtonActive() {
        if (this.isUpdateable()) {
            return this.isRouteActive();
        }
        return false;
    }
    isRouterLinkActive() {
        if (!this.routerLinkActive) {
            return 'true';
        }
        return this.routerLinkActive === 'true' ? 'true' : 'false';
    }
    getRoute() {
        return this.route;
    }
    setRoute(route) {
        this.route = route;
    }
    getIconUrl() {
        return this.iconUrl ? this.iconUrl : '';
    }
    ngOnDestroy() {
        this.unsubscribeFromObservables();
    }
    unsubscribeFromObservables() {
        if (this.subscriptionToCurrentRoute) {
            this.subscriptionToCurrentRoute.unsubscribe();
        }
    }
}
NavItemComponent.ɵfac = function NavItemComponent_Factory(t) { return new (t || NavItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_1__["NavigationService"])); };
NavItemComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavItemComponent, selectors: [["app-nav-item"]], inputs: { route: "route", iconUrl: ["icon", "iconUrl"], updateWhenActive: "updateWhenActive", routerLinkActive: "routerLinkActive" }, ngContentSelectors: _c0, decls: 4, vars: 7, consts: [[1, "nav-item", 3, "routerLink", "routerLinkActive"], [3, "src", 4, "ngIf"], [3, "src"]], template: function NavItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NavItemComponent_img_2_Template, 1, 1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("justify-content", ctx.getIconUrl() ? "flex-start" : "center");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("activated", ctx.isButtonActive());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/" + ctx.getRoute())("routerLinkActive", ctx.isRouterLinkActive());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.getIconUrl() !== "");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["[_nghost-%COMP%] {\n  flex-grow: 1;\n  flex-basis: 90px;\n  min-height: 50px;\n  min-width: 90px;\n  max-width: 200px;\n  padding: 15px 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\nli[_ngcontent-%COMP%] {\n  list-style: none;\n  text-transform: lowercase;\n  font-size: 0.9rem;\n}\n\nli[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  color: var(--font-color-default);\n  transition: var(--default-transition);\n  font-weight: 300;\n  -webkit-tap-highlight-color: transparent;\n}\n\nli[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 40px;\n}\n\nli[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--font-color-accent);\n}\n\nli[_ngcontent-%COMP%]   .activated[_ngcontent-%COMP%] {\n  color: var(--font-color-accent);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L25hdmlnYXRpb24tYmFyL25hdi1pdGVtL25hdi1pdGVtLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFDQTtFQUNFLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtBQUVGOztBQUFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxxQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esd0NBQUE7QUFFSjs7QUFBSTtFQUNFLFlBQUE7QUFFTjs7QUFBRTtFQUNFLCtCQUFBO0FBRUo7O0FBQUU7RUFDRSwrQkFBQTtBQUVKIiwiZmlsZSI6InNyYy9hcHAvd2luZG93L25hdmlnYXRpb24tYmFyL25hdi1pdGVtL25hdi1pdGVtLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3RcbiAgZmxleC1ncm93OiAxXG4gIGZsZXgtYmFzaXM6IDkwcHhcbiAgbWluLWhlaWdodDogNTBweFxuICBtaW4td2lkdGg6IDkwcHhcbiAgbWF4LXdpZHRoOiAyMDBweFxuICBwYWRkaW5nOiAxNXB4IDAgXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuICBcbmxpXG4gIGxpc3Qtc3R5bGU6IG5vbmVcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZVxuICBmb250LXNpemU6IDAuOXJlbVxuXG4gIGFcbiAgICBkaXNwbGF5OiBmbGV4XG4gICAgZmxleC1kaXJlY3Rpb246IHJvd1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZVxuICAgIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yLWRlZmF1bHQpXG4gICAgdHJhbnNpdGlvbjogdmFyKC0tZGVmYXVsdC10cmFuc2l0aW9uKVxuICAgIGZvbnQtd2VpZ2h0OiAzMDBcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50XG5cbiAgICBpbWdcbiAgICAgIGhlaWdodDogNDBweFxuXG4gIGE6aG92ZXJcbiAgICBjb2xvcjogdmFyKC0tZm9udC1jb2xvci1hY2NlbnQpXG5cbiAgLmFjdGl2YXRlZFxuICAgIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yLWFjY2VudCkiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavItemComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-nav-item',
                templateUrl: './nav-item.component.html',
                styleUrls: ['./nav-item.component.sass'],
            }]
    }], function () { return [{ type: src_app_services_navigation_service__WEBPACK_IMPORTED_MODULE_1__["NavigationService"] }]; }, { route: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['route']
        }], iconUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['icon']
        }], updateWhenActive: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['updateWhenActive']
        }], routerLinkActive: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['routerLinkActive']
        }] }); })();


/***/ }),

/***/ "JrO6":
/*!*********************************************************!*\
  !*** ./src/app/services/projects/technology-factory.ts ***!
  \*********************************************************/
/*! exports provided: TechnologyFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TechnologyFactory", function() { return TechnologyFactory; });
/* harmony import */ var _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object-factory */ "40ud");
/* harmony import */ var _technology__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./technology */ "rOEK");


class TechnologyFactory extends _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__["DatabaseObjectFactory"] {
    constructor(database) {
        super(database);
    }
    createDatabaseObject(doc) {
        return new _technology__WEBPACK_IMPORTED_MODULE_1__["Technology"](this.database, doc);
    }
}


/***/ }),

/***/ "Lk+c":
/*!*****************************************************!*\
  !*** ./src/app/services/meta/route-data.service.ts ***!
  \*****************************************************/
/*! exports provided: RouteDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteDataService", function() { return RouteDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");






class RouteDataService {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.routeDataObservable = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.subscriptionToRouterEvents = this.subscribeToNavigationEndEvents();
    }
    subscribeToNavigationEndEvents() {
        return this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]))
            .subscribe(() => {
            this.updateRouteData();
        });
    }
    updateRouteData() {
        var _a;
        let snapshotData = (_a = this.route.snapshot.firstChild) === null || _a === void 0 ? void 0 : _a.data;
        if (snapshotData) {
            let routeData = {
                title: snapshotData.title,
                meta: snapshotData.meta,
                og: snapshotData.og,
            };
            return this.setRouteData(routeData);
        }
    }
    setRouteData(data) {
        return this.routeDataObservable.next(data);
    }
    getRouteData() {
        return this.routeDataObservable.value;
    }
    getRouteDataObservable() {
        return this.routeDataObservable.asObservable();
    }
    ngOnDestroy() {
        this.unsubscribeFromObservables();
    }
    unsubscribeFromObservables() {
        if (this.subscriptionToRouterEvents) {
            this.subscriptionToRouterEvents.unsubscribe();
        }
    }
}
RouteDataService.ɵfac = function RouteDataService_Factory(t) { return new (t || RouteDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
RouteDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RouteDataService, factory: RouteDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RouteDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "M4De":
/*!***************************************************!*\
  !*** ./src/app/window/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");



class FooterComponent {
    constructor() { }
    ngOnInit() { }
    getYear() {
        return new Date().getFullYear();
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 6, vars: 1, consts: [[1, "copyright"], [1, "links"], [1, "link"], ["routerLink", "/privacy"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Privacy Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Copyright \u00A9 ", ctx.getYear(), " Jacob Ian Matthews\n");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-secondary);\n  padding: 25px 0;\n  text-align: center;\n  font-size: 0.7rem;\n}\n\n.links[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.links[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  margin-left: 20px;\n}\n\n.links[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:first-child {\n  margin-left: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx3Q0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFDRTtFQUNFLGlCQUFBO0FBQ0o7O0FBQ0U7RUFDRSxjQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC93aW5kb3cvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1zZWNvbmRhcnkpXG4gIHBhZGRpbmc6IDI1cHggMFxuICB0ZXh0LWFsaWduOiBjZW50ZXJcbiAgZm9udC1zaXplOiAwLjdyZW1cblxuXG4ubGlua3NcbiAgbWFyZ2luLXRvcDogMTVweFxuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiByb3dcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuXG4gIC5saW5rXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHhcblxuICAubGluazpmaXJzdC1jaGlsZFxuICAgIG1hcmdpbi1sZWZ0OiAwIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.sass'],
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "MJoW":
/*!***********************************************************!*\
  !*** ./src/app/services/education/education-exception.ts ***!
  \***********************************************************/
/*! exports provided: EducationException */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EducationException", function() { return EducationException; });
class EducationException {
    constructor(error, message, context) {
        if (this.errorObjectProvided(error)) {
            this.errorCode = error.errorCode;
            this.errorMessage = error.message;
        }
        else {
            this.errorCode = error;
            this.errorMessage = message;
            this.context = context;
        }
    }
    errorObjectProvided(error) {
        if (typeof error === 'string') {
            return false;
        }
        else if (error) {
            return true;
        }
        else {
            return false;
        }
    }
    getMessage() {
        return this.errorMessage;
    }
    getErrorCode() {
        return this.errorCode;
    }
}


/***/ }),

/***/ "Mb37":
/*!********************************************!*\
  !*** ./src/app/services/logger.service.ts ***!
  \********************************************/
/*! exports provided: LoggerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggerService", function() { return LoggerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exception */ "A4p0");



class LoggerService {
    constructor() { }
    error(exception) {
        let message;
        if (this.isException(exception)) {
            message = exception.getMessage();
        }
        else {
            message = exception.message;
        }
        console.error(message);
    }
    isException(exception) {
        return exception instanceof _exception__WEBPACK_IMPORTED_MODULE_1__["Exception"];
    }
}
LoggerService.ɵfac = function LoggerService_Factory(t) { return new (t || LoggerService)(); };
LoggerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoggerService, factory: LoggerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoggerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "NtGG":
/*!*************************************************************!*\
  !*** ./src/app/window/content-box/content-box.component.ts ***!
  \*************************************************************/
/*! exports provided: ContentBoxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBoxComponent", function() { return ContentBoxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");


const _c0 = ["*"];
class ContentBoxComponent {
    constructor() { }
    ngOnInit() {
    }
}
ContentBoxComponent.ɵfac = function ContentBoxComponent_Factory(t) { return new (t || ContentBoxComponent)(); };
ContentBoxComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContentBoxComponent, selectors: [["app-content-box"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function ContentBoxComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    } }, styles: ["[_nghost-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L2NvbnRlbnQtYm94L2NvbnRlbnQtYm94LmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvd2luZG93L2NvbnRlbnQtYm94L2NvbnRlbnQtYm94LmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3RcbiAgZmxleC1ncm93OiAxXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContentBoxComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-content-box',
                templateUrl: './content-box.component.html',
                styleUrls: ['./content-box.component.sass']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _services_meta_metadata_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/meta/metadata.service */ "3l51");
/* harmony import */ var _window_window_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./window/window.component */ "EKn2");
/* harmony import */ var _window_navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./window/navigation-bar/navigation-bar.component */ "x5pN");
/* harmony import */ var _window_navigation_bar_nav_item_nav_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./window/navigation-bar/nav-item/nav-item.component */ "J7nD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _window_content_box_content_box_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./window/content-box/content-box.component */ "NtGG");
/* harmony import */ var _window_footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./window/footer/footer.component */ "M4De");









class AppComponent {
    constructor(metaDataService) {
        this.metaDataService = metaDataService;
        this.title = 'Jacob Ian Matthews';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_meta_metadata_service__WEBPACK_IMPORTED_MODULE_1__["MetadataService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 13, vars: 0, consts: [["icon", "assets/icons/icon-512x512.png", "updateWhenActive", "false", "route", "", 1, "app-title"], ["updateWhenActive", "false", "routerLinkActive", "false", 1, "spacer"], ["route", ""], ["route", "about"], ["route", "projects"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-window");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "app-navigation-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-nav-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-nav-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "app-nav-item", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "app-nav-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "app-nav-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "app-content-box");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_window_window_component__WEBPACK_IMPORTED_MODULE_2__["WindowComponent"], _window_navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_3__["NavigationBarComponent"], _window_navigation_bar_nav_item_nav_item_component__WEBPACK_IMPORTED_MODULE_4__["NavItemComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkActive"], _window_content_box_content_box_component__WEBPACK_IMPORTED_MODULE_6__["ContentBoxComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"], _window_footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"]], styles: [".app-title[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  justify-self: flex-start;\n  margin-left: 25px;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex-grow: 2;\n  max-width: 100%;\n}\n\n@media screen and (max-width: 480px) {\n  .spacer[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n@media screen and (max-width: 380px) {\n  .app-title[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFDQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBRUY7O0FBQUE7RUFDRTtJQUNFLGFBQUE7RUFHRjtBQUNGOztBQUZBO0VBQ0U7SUFDRSxhQUFBO0VBSUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtdGl0bGUgXG4gIGZsZXgtZ3JvdzogMVxuICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnRcbiAgbWFyZ2luLWxlZnQ6IDI1cHhcblxuLnNwYWNlclxuICBmbGV4LWdyb3c6IDJcbiAgbWF4LXdpZHRoOiAxMDAlXG5cbkBtZWRpYSBzY3JlZW4gYW5kICggbWF4LXdpZHRoOiA0ODBweCApXG4gIC5zcGFjZXJcbiAgICBkaXNwbGF5OiBub25lXG5cbkBtZWRpYSBzY3JlZW4gYW5kICggbWF4LXdpZHRoOiAzODBweCApIFxuICAuYXBwLXRpdGxlXG4gICAgZGlzcGxheTogbm9uZVxuICAiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.sass'],
            }]
    }], function () { return [{ type: _services_meta_metadata_service__WEBPACK_IMPORTED_MODULE_1__["MetadataService"] }]; }, null); })();


/***/ }),

/***/ "TsVY":
/*!**********************************************!*\
  !*** ./src/app/privacy/privacy.component.ts ***!
  \**********************************************/
/*! exports provided: PrivacyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyComponent", function() { return PrivacyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../window/flex-container/flex-container.component */ "k71K");




class PrivacyComponent {
    constructor(location) {
        this.location = location;
    }
    ngOnInit() { }
    goBack(event) {
        event.preventDefault();
        this.location.back();
    }
}
PrivacyComponent.ɵfac = function PrivacyComponent_Factory(t) { return new (t || PrivacyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"])); };
PrivacyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PrivacyComponent, selectors: [["app-privacy"]], decls: 9, vars: 1, consts: [[3, "centered"], [1, "row"], [1, "go-back", 3, "click"]], template: function PrivacyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-flex-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Privacy Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "This website does not collect any personally identifiable data.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PrivacyComponent_Template_a_click_7_listener($event) { return ctx.goBack($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Click here to go back");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("centered", true);
    } }, directives: [_window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_2__["FlexContainerComponent"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n\n.row[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: center;\n}\n\n.go-back[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  font-size: 1.2rem;\n  font-weight: 700;\n  cursor: pointer;\n  text-align: center;\n}\n\n@media screen and (max-width: 650px) {\n  .row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJpdmFjeS9wcml2YWN5LmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLE9BQUE7RUFDQSxzQkFBQTtBQUNGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBRUY7O0FBQUE7RUFDRSxtQkFBQTtFQUNBLHVCQUFBO0FBR0Y7O0FBREE7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFJRjs7QUFGQTtFQUNFO0lBQ0Usc0JBQUE7RUFLRjtFQUhFO0lBQ0Usa0JBQUE7RUFLSjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvcHJpdmFjeS9wcml2YWN5LmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3RcbiAgZGlzcGxheTogZmxleFxuICBmbGV4OiAxXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cblxuaDFcbiAgbWFyZ2luLXRvcDogMFxuICBtYXJnaW4tYm90dG9tOiAxMHB4XG5cbi5yb3dcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuXG4uZ28tYmFja1xuICBtYXJnaW4tdG9wOiAxNXB4XG4gIGZvbnQtc2l6ZTogMS4ycmVtXG4gIGZvbnQtd2VpZ2h0OiA3MDBcbiAgY3Vyc29yOiBwb2ludGVyXG4gIHRleHQtYWxpZ246IGNlbnRlclxuXG5AbWVkaWEgc2NyZWVuIGFuZCAoIG1heC13aWR0aDogNjUwcHggKVxuICAucm93XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuXG4gICAgcFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrivacyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-privacy',
                templateUrl: './privacy.component.html',
                styleUrls: ['./privacy.component.sass'],
            }]
    }], function () { return [{ type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"] }]; }, null); })();


/***/ }),

/***/ "V5pB":
/*!*************************************************!*\
  !*** ./src/app/services/meta/open-graph-tag.ts ***!
  \*************************************************/
/*! exports provided: OpenGraphTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenGraphTag", function() { return OpenGraphTag; });
/* harmony import */ var _abstract_tag_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-tag-factory */ "cbnz");

class OpenGraphTag extends _abstract_tag_factory__WEBPACK_IMPORTED_MODULE_0__["PageTag"] {
    constructor(property, content) {
        super(`og:${property}`, content);
    }
    getMetaDefinition() {
        let definition = {
            property: this.name,
            content: this.content,
        };
        return definition;
    }
    getSelector() {
        return `property="${this.name}"`;
    }
}


/***/ }),

/***/ "YMqD":
/*!***********************************!*\
  !*** ./src/app/services/utils.ts ***!
  \***********************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exception */ "A4p0");

class Utils {
    static formatTimeMsToMMMYYYY(timeMilliseconds) {
        let date = new Date(timeMilliseconds);
        let month = Utils.getMonthLetters(date);
        let year = date.getFullYear();
        return `${month} ${year}`;
    }
    static getMonthLetters(date) {
        let number = date.getMonth();
        let month = Utils.convertMonthNumToLetters(number);
        return month;
    }
    static convertMonthNumToLetters(monthNumber) {
        if (monthNumber < 0 || monthNumber > 11) {
            throw new _exception__WEBPACK_IMPORTED_MODULE_0__["Exception"]('UTIL', 'invalid-input', 'Date month number out of range.');
        }
        return Utils.months[monthNumber];
    }
    static sortStringsAlphabetically(strings) {
        return strings.sort((a, b) => {
            return Utils.alphabet[a[0]] - Utils.alphabet[b[0]];
        });
    }
}
Utils.months = {
    0: 'jan',
    1: 'feb',
    2: 'mar',
    3: 'apr',
    4: 'may',
    5: 'jun',
    6: 'jul',
    7: 'aug',
    8: 'sep',
    9: 'oct',
    10: 'nov',
    11: 'dec',
};
Utils.alphabet = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
};


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "wD+u");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projects/projects.component */ "zUkc");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./about/about.component */ "84zG");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./not-found/not-found.component */ "nod/");
/* harmony import */ var _window_window_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./window/window.component */ "EKn2");
/* harmony import */ var _window_navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./window/navigation-bar/navigation-bar.component */ "x5pN");
/* harmony import */ var _window_navigation_bar_nav_item_nav_item_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./window/navigation-bar/nav-item/nav-item.component */ "J7nD");
/* harmony import */ var _window_content_box_content_box_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./window/content-box/content-box.component */ "NtGG");
/* harmony import */ var _window_footer_footer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./window/footer/footer.component */ "M4De");
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./privacy/privacy.component */ "TsVY");
/* harmony import */ var _home_display_button_display_button_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./home/display-button/display-button.component */ "3Wri");
/* harmony import */ var _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./window/flex-container/flex-container.component */ "k71K");
/* harmony import */ var _window_social_links_social_links_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./window/social-links/social-links.component */ "AUGU");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/fire */ "jmUF");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _about_qualification_qualification_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./about/qualification/qualification.component */ "jPiE");
/* harmony import */ var _projects_project_project_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./projects/project/project.component */ "u4ch");
/* harmony import */ var _projects_projects_filter_projects_filter_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./projects/projects-filter/projects-filter.component */ "uzJ2");
/* harmony import */ var _core_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./core/multi-select/multi-select.component */ "pPJV");
/* harmony import */ var _core_multi_select_multi_select_option_multi_select_option_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./core/multi-select/multi-select-option/multi-select-option.component */ "2hHv");
/* harmony import */ var _core_button_expand_button_expand_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./core/button-expand/button-expand.component */ "sd3N");































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Meta"],
        {
            provide: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["USE_EMULATOR"],
            useValue: src_environments_environment__WEBPACK_IMPORTED_MODULE_19__["environment"].useEmulators ? ['localhost', 8080] : undefined,
        },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserTransferStateModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_fire__WEBPACK_IMPORTED_MODULE_18__["AngularFireModule"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_19__["environment"].firebase),
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestoreModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
        _projects_projects_component__WEBPACK_IMPORTED_MODULE_6__["ProjectsComponent"],
        _about_about_component__WEBPACK_IMPORTED_MODULE_7__["AboutComponent"],
        _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__["NotFoundComponent"],
        _window_window_component__WEBPACK_IMPORTED_MODULE_9__["WindowComponent"],
        _window_navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_10__["NavigationBarComponent"],
        _window_navigation_bar_nav_item_nav_item_component__WEBPACK_IMPORTED_MODULE_11__["NavItemComponent"],
        _window_content_box_content_box_component__WEBPACK_IMPORTED_MODULE_12__["ContentBoxComponent"],
        _window_footer_footer_component__WEBPACK_IMPORTED_MODULE_13__["FooterComponent"],
        _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_14__["PrivacyComponent"],
        _home_display_button_display_button_component__WEBPACK_IMPORTED_MODULE_15__["DisplayButtonComponent"],
        _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_16__["FlexContainerComponent"],
        _window_social_links_social_links_component__WEBPACK_IMPORTED_MODULE_17__["SocialLinksComponent"],
        _about_qualification_qualification_component__WEBPACK_IMPORTED_MODULE_20__["QualificationComponent"],
        _projects_project_project_component__WEBPACK_IMPORTED_MODULE_21__["ProjectComponent"],
        _projects_projects_filter_projects_filter_component__WEBPACK_IMPORTED_MODULE_22__["ProjectsFilterComponent"],
        _core_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_23__["MultiSelectComponent"],
        _core_multi_select_multi_select_option_multi_select_option_component__WEBPACK_IMPORTED_MODULE_24__["MultiSelectOptionComponent"],
        _core_button_expand_button_expand_component__WEBPACK_IMPORTED_MODULE_25__["ButtonExpandComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserTransferStateModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_18__["AngularFireModule"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestoreModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                    _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
                    _projects_projects_component__WEBPACK_IMPORTED_MODULE_6__["ProjectsComponent"],
                    _about_about_component__WEBPACK_IMPORTED_MODULE_7__["AboutComponent"],
                    _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__["NotFoundComponent"],
                    _window_window_component__WEBPACK_IMPORTED_MODULE_9__["WindowComponent"],
                    _window_navigation_bar_navigation_bar_component__WEBPACK_IMPORTED_MODULE_10__["NavigationBarComponent"],
                    _window_navigation_bar_nav_item_nav_item_component__WEBPACK_IMPORTED_MODULE_11__["NavItemComponent"],
                    _window_content_box_content_box_component__WEBPACK_IMPORTED_MODULE_12__["ContentBoxComponent"],
                    _window_footer_footer_component__WEBPACK_IMPORTED_MODULE_13__["FooterComponent"],
                    _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_14__["PrivacyComponent"],
                    _home_display_button_display_button_component__WEBPACK_IMPORTED_MODULE_15__["DisplayButtonComponent"],
                    _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_16__["FlexContainerComponent"],
                    _window_social_links_social_links_component__WEBPACK_IMPORTED_MODULE_17__["SocialLinksComponent"],
                    _about_qualification_qualification_component__WEBPACK_IMPORTED_MODULE_20__["QualificationComponent"],
                    _projects_project_project_component__WEBPACK_IMPORTED_MODULE_21__["ProjectComponent"],
                    _projects_projects_filter_projects_filter_component__WEBPACK_IMPORTED_MODULE_22__["ProjectsFilterComponent"],
                    _core_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_23__["MultiSelectComponent"],
                    _core_multi_select_multi_select_option_multi_select_option_component__WEBPACK_IMPORTED_MODULE_24__["MultiSelectOptionComponent"],
                    _core_button_expand_button_expand_component__WEBPACK_IMPORTED_MODULE_25__["ButtonExpandComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserTransferStateModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_fire__WEBPACK_IMPORTED_MODULE_18__["AngularFireModule"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_19__["environment"].firebase),
                    _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestoreModule"],
                ],
                providers: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Meta"],
                    {
                        provide: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["USE_EMULATOR"],
                        useValue: src_environments_environment__WEBPACK_IMPORTED_MODULE_19__["environment"].useEmulators ? ['localhost', 8080] : undefined,
                    },
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "aX8X":
/*!*******************************************************!*\
  !*** ./src/app/services/database/database.service.ts ***!
  \*******************************************************/
/*! exports provided: DatabaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseService", function() { return DatabaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "wD+u");







class DatabaseService {
    constructor(transferState, afs) {
        this.transferState = transferState;
        this.afs = afs;
    }
    getCollection(path) {
        let key = this.createStateKey(path);
        if (this.collectionInState(key)) {
            return this.getCollectionFromState(key);
        }
        return this.getCollectionFromFirestore(path).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((docs) => this.saveToState(key, docs)));
    }
    createStateKey(path) {
        return Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["makeStateKey"])(path);
    }
    collectionInState(stateKey) {
        return this.transferState.hasKey(stateKey);
    }
    getCollectionFromState(stateKey) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.transferState.get(stateKey, null));
    }
    getCollectionFromFirestore(path) {
        return this.afs.collection(path).valueChanges();
    }
    saveToState(stateKey, docs) {
        this.transferState.set(stateKey, docs);
    }
    createId() {
        return this.afs.createId();
    }
}
DatabaseService.ɵfac = function DatabaseService_Factory(t) { return new (t || DatabaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["TransferState"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"])); };
DatabaseService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DatabaseService, factory: DatabaseService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DatabaseService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["TransferState"] }, { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] }]; }, null); })();


/***/ }),

/***/ "cbnz":
/*!*******************************************************!*\
  !*** ./src/app/services/meta/abstract-tag-factory.ts ***!
  \*******************************************************/
/*! exports provided: PageTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageTag", function() { return PageTag; });
class PageTag {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
    getName() {
        return this.name;
    }
    getContent() {
        return this.content;
    }
    getMetaDefinition() {
        return null;
    }
    getSelector() {
        return null;
    }
}


/***/ }),

/***/ "g53c":
/*!******************************************************!*\
  !*** ./src/app/services/projects/project.service.ts ***!
  \******************************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _project_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-factory */ "wMmA");
/* harmony import */ var _technology_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./technology-factory */ "JrO6");
/* harmony import */ var _database_database_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../database/database.service */ "aX8X");
/* harmony import */ var _logger_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../logger.service */ "Mb37");







class ProjectService {
    constructor(database, logger) {
        this.database = database;
        this.logger = logger;
    }
    getProjects() {
        this.dbObjectFactory = new _project_factory__WEBPACK_IMPORTED_MODULE_2__["ProjectFactory"](this.database);
        let collection = this.database.getCollection('projects');
        return this.createProjectsFromCollection(collection);
    }
    createProjectsFromCollection(collection) {
        try {
            return this.dbObjectFactory.createFromCollection(collection);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getTechnologies() {
        this.dbObjectFactory = new _technology_factory__WEBPACK_IMPORTED_MODULE_3__["TechnologyFactory"](this.database);
        let collection = this.database.getCollection('technologies');
        return this.createTechnologiesFromCollection(collection);
    }
    createTechnologiesFromCollection(collection) {
        try {
            let technologies = this.dbObjectFactory.createFromCollection(collection);
            return this.convertTechnologyToString(technologies);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    convertTechnologyToString(technologies) {
        return technologies.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((technologies) => this.getNameFromTechnologies(technologies)));
    }
    getNameFromTechnologies(technologies) {
        return technologies.map((tech) => tech.getName());
    }
}
ProjectService.ɵfac = function ProjectService_Factory(t) { return new (t || ProjectService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_database_database_service__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_logger_service__WEBPACK_IMPORTED_MODULE_5__["LoggerService"])); };
ProjectService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ProjectService, factory: ProjectService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _database_database_service__WEBPACK_IMPORTED_MODULE_4__["DatabaseService"] }, { type: _logger_service__WEBPACK_IMPORTED_MODULE_5__["LoggerService"] }]; }, null); })();


/***/ }),

/***/ "h8tz":
/*!*********************************************************!*\
  !*** ./src/app/services/meta/open-graph-tag-factory.ts ***!
  \*********************************************************/
/*! exports provided: OpenGraphTagFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenGraphTagFactory", function() { return OpenGraphTagFactory; });
/* harmony import */ var _open_graph_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./open-graph-tag */ "V5pB");

class OpenGraphTagFactory {
    createTag(property, content) {
        return new _open_graph_tag__WEBPACK_IMPORTED_MODULE_0__["OpenGraphTag"](property, content);
    }
}


/***/ }),

/***/ "jPiE":
/*!****************************************************************!*\
  !*** ./src/app/about/qualification/qualification.component.ts ***!
  \****************************************************************/
/*! exports provided: QualificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualificationComponent", function() { return QualificationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_exception__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/exception */ "A4p0");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/logger.service */ "Mb37");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "SVse");







function QualificationComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const description_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](description_r1);
} }
class QualificationComponent {
    constructor(logger) {
        this.logger = logger;
    }
    ngOnInit() { }
    getName() {
        try {
            return this.qualification.getName();
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    getDescription() {
        try {
            return this.qualification.getDescription();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getUrl() {
        try {
            return this.qualification.getUrl();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getInstitution() {
        try {
            return this.qualification.getInstitution();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getImage() {
        try {
            let institution = this.getInstitution();
            return institution.imageUrl;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getInstitutionName() {
        try {
            let institution = this.getInstitution();
            return institution.name;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getInstitutionUrl() {
        try {
            let instution = this.getInstitution();
            return instution.url;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getInstitutionLocation() {
        try {
            let institution = this.getInstitution();
            return institution.location;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getInstitutionType() {
        try {
            let institution = this.getInstitution();
            let type = institution.type;
            if (!type) {
                return 'EducationalOrganization';
            }
            return type;
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    getDateStart() {
        try {
            return this.qualification.getDateStart();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getDateEnd() {
        try {
            return this.qualification.getDateEnd();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getSubjects() {
        try {
            return this.qualification.getSubjects();
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    hasSubjects() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                return (yield this.getSubjects().toPromise()).length > 0;
            }
            catch (error) {
                this.logger.error(error);
            }
        });
    }
    getCredentialCategory() {
        try {
            return this.qualification.getCredentialCateogry();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getEducationLevel() {
        try {
            return this.qualification.getEducationLevel();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    /**
     * TESTING ONLY
     */
    setQualification(qualification) {
        if (this.isProductionEnv()) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_2__["Exception"]('QUALCOMP', 'internal-error', 'This method should not be used in production.');
        }
        this.qualification = qualification;
    }
    isProductionEnv() {
        return src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production;
    }
}
QualificationComponent.ɵfac = function QualificationComponent_Factory(t) { return new (t || QualificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["LoggerService"])); };
QualificationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: QualificationComponent, selectors: [["app-qualification"]], inputs: { qualification: "qualification" }, decls: 24, vars: 18, consts: [[1, "date", "top"], [1, "qualification-container"], ["itemprop", "alumniOf", "itemscope", "", 1, "qualification-image"], ["itemprop", "name", 3, "content"], ["itemprop", "location", 3, "content"], ["target", "_blank", 3, "href"], ["itemprop", "logo", 3, "src", "alt"], ["itemprop", "url", 3, "content"], [1, "qualification-details"], [1, "institution"], ["target", "_blank", 1, "institution-name", 3, "href"], ["itemprop", "hasCredential", "itemscope", "", "itemtype", "https://schema.org/EducationalOccupationalCredential", 1, "qualification"], [1, "qualification-name"], ["itemprop", "name"], ["itemprop", "credentialCategory", 3, "content"], ["itemprop", "educationalLevel", 3, "content"], ["class", "qualification-description", 4, "ngIf"], [1, "date", "bottom"], [1, "qualification-description"], ["itemprop", "comment"]], template: function QualificationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "meta", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "meta", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "meta", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "meta", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "meta", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "meta", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, QualificationComponent_div_21_Template, 3, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.getDateEnd());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("itemtype", "https://schema.org/" + ctx.getInstitutionType());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", ctx.getInstitutionName());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", ctx.getInstitutionLocation());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx.getInstitutionUrl(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx.getImage(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", ctx.getInstitutionName());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", ctx.getInstitutionUrl());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx.getInstitutionUrl(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx.getInstitutionName(), ", ", ctx.getInstitutionLocation(), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx.getUrl(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.getName());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", ctx.getUrl());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", ctx.getCredentialCategory());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", ctx.getEducationLevel());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.getDescription());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.getDateStart());
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  z-index: 100;\n  margin-bottom: 30px;\n}\n\n[_nghost-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.date[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-size: 0.7rem;\n  color: var(--font-color-subtitle);\n  font-weight: 700;\n  background-color: var(--color-primary);\n  padding: 7px 0;\n  border-radius: 50%;\n}\n\n.qualification-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background: var(--color-secondary);\n  border-radius: 25px;\n  padding: 15px;\n  text-align: left;\n}\n\n.qualification-image[_ngcontent-%COMP%] {\n  flex: 0;\n  min-width: 80px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-right: 20px;\n}\n\n.qualification-image[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-content: center;\n  justify-content: center;\n}\n\n.qualification-image[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  flex: 0;\n  border-radius: 5px;\n  height: 80px;\n}\n\n.qualification-details[_ngcontent-%COMP%] {\n  flex: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n\n.qualification-details[_ngcontent-%COMP%]   .institution[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  font-size: 0.9rem;\n}\n\n.qualification-details[_ngcontent-%COMP%]   .institution[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--font-color-subtitle);\n  font-weight: 300;\n}\n\n.qualification-details[_ngcontent-%COMP%]   .qualification[_ngcontent-%COMP%]   .qualification-name[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin-bottom: 5px;\n}\n\n.qualification-details[_ngcontent-%COMP%]   .qualification[_ngcontent-%COMP%]   .qualification-description[_ngcontent-%COMP%] {\n  text-align: left;\n  color: var(--font-color-subtitle);\n  font-size: 0.9rem;\n}\n\n@media screen and (max-width: 480px) {\n  .qualification-details[_ngcontent-%COMP%]   .institution[_ngcontent-%COMP%] {\n    margin-bottom: 7px;\n  }\n  .qualification-details[_ngcontent-%COMP%]   .qualification[_ngcontent-%COMP%]   .qualification-name[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    margin-bottom: 7px;\n  }\n\n  .date[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWJvdXQvcXVhbGlmaWNhdGlvbi9xdWFsaWZpY2F0aW9uLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUNBO0VBQ0UsZ0JBQUE7QUFFRjs7QUFBQTtFQUNFLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0NBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFHRjs7QUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQUdGOztBQURBO0VBQ0UsT0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBSUY7O0FBRkU7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSx1QkFBQTtBQUlKOztBQUhJO0VBQ0UsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUtOOztBQUhBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMkJBQUE7QUFNRjs7QUFKRTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7QUFNSjs7QUFMSTtFQUNFLGlDQUFBO0VBQ0EsZ0JBQUE7QUFPTjs7QUFKSTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFNTjs7QUFKSTtFQUNFLGdCQUFBO0VBQ0EsaUNBQUE7RUFDQSxpQkFBQTtBQU1OOztBQUpBO0VBRUk7SUFDRSxrQkFBQTtFQU1KO0VBSEk7SUFDRSxlQUFBO0lBQ0Esa0JBQUE7RUFLTjs7RUFIQTtJQUNFLGlCQUFBO0VBTUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2Fib3V0L3F1YWxpZmljYXRpb24vcXVhbGlmaWNhdGlvbi5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydFxuICB6LWluZGV4OiAxMDBcbiAgbWFyZ2luLWJvdHRvbTogMzBweFxuXG46aG9zdDpsYXN0LWNoaWxkXG4gIG1hcmdpbi1ib3R0b206IDBcbiAgXG4uZGF0ZVxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlXG4gIGZvbnQtc2l6ZTogMC43cmVtXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yLXN1YnRpdGxlKVxuICBmb250LXdlaWdodDogNzAwXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpXG4gIHBhZGRpbmc6IDdweCAwXG4gIGJvcmRlci1yYWRpdXM6IDUwJVxuXG5cbi5xdWFsaWZpY2F0aW9uLWNvbnRhaW5lclxuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiByb3dcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1zZWNvbmRhcnkpXG4gIGJvcmRlci1yYWRpdXM6IDI1cHhcbiAgcGFkZGluZzogMTVweFxuICB0ZXh0LWFsaWduOiBsZWZ0XG5cbi5xdWFsaWZpY2F0aW9uLWltYWdlXG4gIGZsZXg6IDBcbiAgbWluLXdpZHRoOiA4MHB4XG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IHJvd1xuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIG1hcmdpbi1yaWdodDogMjBweFxuXG4gIGFcbiAgICBmbGV4OiAxXG4gICAgZGlzcGxheTogZmxleFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3dcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuICAgIGltZ1xuICAgICAgZmxleDogMFxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4XG4gICAgICBoZWlnaHQ6IDgwcHhcblxuLnF1YWxpZmljYXRpb24tZGV0YWlsc1xuICBmbGV4OiAyXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnRcbiAgXG4gIC5pbnN0aXR1dGlvblxuICAgIG1hcmdpbi1ib3R0b206IDVweFxuICAgIGZvbnQtc2l6ZTogMC45cmVtXG4gICAgYVxuICAgICAgY29sb3I6IHZhcigtLWZvbnQtY29sb3Itc3VidGl0bGUpXG4gICAgICBmb250LXdlaWdodDogMzAwXG5cbiAgLnF1YWxpZmljYXRpb25cbiAgICAucXVhbGlmaWNhdGlvbi1uYW1lXG4gICAgICBmb250LXNpemU6IDEuMnJlbVxuICAgICAgbWFyZ2luLWJvdHRvbTogNXB4XG5cbiAgICAucXVhbGlmaWNhdGlvbi1kZXNjcmlwdGlvblxuICAgICAgdGV4dC1hbGlnbjogbGVmdFxuICAgICAgY29sb3I6IHZhcigtLWZvbnQtY29sb3Itc3VidGl0bGUpXG4gICAgICBmb250LXNpemU6IDAuOXJlbVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAoIG1heC13aWR0aDogNDgwcHggKVxuICAucXVhbGlmaWNhdGlvbi1kZXRhaWxzXG4gICAgLmluc3RpdHV0aW9uXG4gICAgICBtYXJnaW4tYm90dG9tOiA3cHhcblxuICAgIC5xdWFsaWZpY2F0aW9uXG4gICAgICAucXVhbGlmaWNhdGlvbi1uYW1lXG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbVxuICAgICAgICBtYXJnaW4tYm90dG9tOiA3cHhcblxuICAuZGF0ZVxuICAgIGZvbnQtc2l6ZTogMC44cmVtIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](QualificationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-qualification',
                templateUrl: './qualification.component.html',
                styleUrls: ['./qualification.component.sass'],
            }]
    }], function () { return [{ type: src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_4__["LoggerService"] }]; }, { qualification: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"],
            args: ['qualification']
        }] }); })();


/***/ }),

/***/ "k71K":
/*!*******************************************************************!*\
  !*** ./src/app/window/flex-container/flex-container.component.ts ***!
  \*******************************************************************/
/*! exports provided: FlexContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlexContainerComponent", function() { return FlexContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");


const _c0 = ["*"];
class FlexContainerComponent {
    constructor() { }
    ngOnInit() {
        this.alignItems = this.getItemAlignment();
    }
    getItemAlignment() {
        return this.centered ? 'center' : 'auto';
    }
    ngOnChanges(changes) {
        if (changes.centered) {
            this.alignItems = this.getItemAlignment();
        }
    }
}
FlexContainerComponent.ɵfac = function FlexContainerComponent_Factory(t) { return new (t || FlexContainerComponent)(); };
FlexContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FlexContainerComponent, selectors: [["app-flex-container"]], hostVars: 2, hostBindings: function FlexContainerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("align-items", ctx.alignItems);
    } }, inputs: { centered: "centered" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], ngContentSelectors: _c0, decls: 4, vars: 0, consts: [[1, "space"], [1, "content"]], template: function FlexContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "main", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 0);
    } }, styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.space[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 3;\n  padding-bottom: 50px;\n}\n\n@media screen and (max-width: 1100px) {\n  .content[_ngcontent-%COMP%] {\n    flex: 4;\n  }\n}\n\n@media screen and (max-width: 880px) {\n  .space[_ngcontent-%COMP%] {\n    flex: 0;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    margin: 0 50px;\n  }\n}\n\n@media screen and (max-width: 430px) {\n  .content[_ngcontent-%COMP%] {\n    margin: 0 25px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L2ZsZXgtY29udGFpbmVyL2ZsZXgtY29udGFpbmVyLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxPQUFBO0FBRUY7O0FBQUE7RUFDRSxPQUFBO0VBQ0Esb0JBQUE7QUFHRjs7QUFEQTtFQUNFO0lBQ0UsT0FBQTtFQUlGO0FBQ0Y7O0FBSEE7RUFDRTtJQUNFLE9BQUE7RUFLRjs7RUFIQTtJQUNFLGNBQUE7RUFNRjtBQUNGOztBQUxBO0VBRUU7SUFDRSxjQUFBO0VBTUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3dpbmRvdy9mbGV4LWNvbnRhaW5lci9mbGV4LWNvbnRhaW5lci5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGZsZXg6IDFcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyXG5cbi5zcGFjZVxuICBmbGV4OiAxXG5cbi5jb250ZW50XG4gIGZsZXg6IDNcbiAgcGFkZGluZy1ib3R0b206IDUwcHhcblxuQG1lZGlhIHNjcmVlbiBhbmQgKCBtYXgtd2lkdGg6IDExMDBweCAgKVxuICAuY29udGVudFxuICAgIGZsZXg6IDRcbiAgXG5AbWVkaWEgc2NyZWVuIGFuZCAoIG1heC13aWR0aDogODgwcHggKVxuICAuc3BhY2VcbiAgICBmbGV4OiAwXG5cbiAgLmNvbnRlbnRcbiAgICBtYXJnaW46IDAgNTBweFxuXG5AbWVkaWEgc2NyZWVuIGFuZCAoIG1heC13aWR0aDogNDMwcHggKVxuXG4gIC5jb250ZW50XG4gICAgbWFyZ2luOiAwIDI1cHhcbiAgIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FlexContainerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-flex-container',
                templateUrl: './flex-container.component.html',
                styleUrls: ['./flex-container.component.sass'],
            }]
    }], function () { return []; }, { centered: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], alignItems: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
            args: ['style.align-items']
        }] }); })();


/***/ }),

/***/ "kW+F":
/*!******************************************************!*\
  !*** ./src/app/services/database/database-object.ts ***!
  \******************************************************/
/*! exports provided: DatabaseObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatabaseObject", function() { return DatabaseObject; });
class DatabaseObject {
    constructor(database) {
        this.database = database;
    }
    createId() {
        return this.database.createId();
    }
    getSubcollection(path) {
        let collection = this.database.getCollection(path);
        return this.subcollectionFactory.createFromCollection(collection);
    }
}


/***/ }),

/***/ "nod/":
/*!**************************************************!*\
  !*** ./src/app/not-found/not-found.component.ts ***!
  \**************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../window/flex-container/flex-container.component */ "k71K");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");






class NotFoundComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.badRequest = this.getBadRequestFromRoute();
    }
    getBadRequestFromRoute() {
        let routeSnapshot = this.route.url.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((segment) => segment.join('/')));
        return routeSnapshot;
    }
    getBadRequest() {
        return this.badRequest;
    }
}
NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) { return new (t || NotFoundComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"])); };
NotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NotFoundComponent, selectors: [["app-not-found"]], decls: 15, vars: 4, consts: [[3, "centered"], [1, "row"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"], [1, "url"], ["routerLink", "/", "routerLinkActive", "true", 1, "go-home"]], template: function NotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-flex-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Page Not Found");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "The requested page: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " could not be found.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Click here to go Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("centered", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("/", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](10, 2, ctx.getBadRequest()), "");
    } }, directives: [_window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_3__["FlexContainerComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n\n.row[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: center;\n}\n\n.row[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 48px;\n  width: 48px;\n  margin-right: 10px;\n}\n\n.row[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: var(--font-color-default);\n}\n\n.url[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n  padding: 5px 10px;\n  font-family: var(--font-family-mono);\n  margin: 0 5px;\n  border-radius: 5px;\n}\n\n.go-home[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  font-size: 1.2rem;\n  font-weight: 700;\n  text-align: center;\n}\n\n@media screen and (max-width: 650px) {\n  .row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUVGOztBQUFBO0VBQ0UsbUJBQUE7RUFDQSx1QkFBQTtBQUdGOztBQUZFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFHQSxrQkFBQTtBQUVKOztBQUpJO0VBQ0UsK0JBQUE7QUFNTjs7QUFIQTtFQUNFLHdDQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQ0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQU1GOztBQUpBO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFPRjs7QUFMQTtFQUNFO0lBQ0Usc0JBQUE7RUFRRjtFQU5FO0lBQ0Usa0JBQUE7RUFRSjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGZsZXg6IDFcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uXG5cbmgxXG4gIG1hcmdpbi10b3A6IDBcbiAgbWFyZ2luLWJvdHRvbTogMTBweFxuXG4ucm93XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbiAgc3ZnXG4gICAgaGVpZ2h0OiA0OHB4XG4gICAgd2lkdGg6IDQ4cHhcbiAgICBwYXRoXG4gICAgICBmaWxsOiB2YXIoLS1mb250LWNvbG9yLWRlZmF1bHQpXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4XG5cbi51cmxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itc2Vjb25kYXJ5KVxuICBwYWRkaW5nOiA1cHggMTBweFxuICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktbW9ubylcbiAgbWFyZ2luOiAwIDVweFxuICBib3JkZXItcmFkaXVzOiA1cHhcblxuLmdvLWhvbWVcbiAgbWFyZ2luLXRvcDogMTVweFxuICBmb250LXNpemU6IDEuMnJlbVxuICBmb250LXdlaWdodDogNzAwXG4gIHRleHQtYWxpZ246IGNlbnRlclxuXG5AbWVkaWEgc2NyZWVuIGFuZCAoIG1heC13aWR0aDogNjUwcHggKVxuICAucm93XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuXG4gICAgcFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotFoundComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-not-found',
                templateUrl: './not-found.component.html',
                styleUrls: ['./not-found.component.sass'],
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "pPJV":
/*!*************************************************************!*\
  !*** ./src/app/core/multi-select/multi-select.component.ts ***!
  \*************************************************************/
/*! exports provided: MultiSelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectComponent", function() { return MultiSelectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/exception */ "A4p0");
/* harmony import */ var src_app_services_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/utils */ "YMqD");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _multi_select_option_multi_select_option_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./multi-select-option/multi-select-option.component */ "2hHv");







function MultiSelectComponent_ng_container_5_app_multi_select_option_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-multi-select-option", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectEvent", function MultiSelectComponent_ng_container_5_app_multi_select_option_2_Template_app_multi_select_option_selectEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r4.onOptionSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("option", option_r3);
} }
function MultiSelectComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MultiSelectComponent_ng_container_5_app_multi_select_option_2_Template, 1, 1, "app-multi-select-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const options_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx_r0.isOptionsExtended ? "block" : "none");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", options_r1);
} }
class MultiSelectComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.isOptionsExtended = false;
        this.value = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.values = [];
    }
    closeOnBodyClick(event) {
        if (!this.isOptionsExtended) {
            return;
        }
        let target = event.target;
        this.closeIfClickOut(target);
    }
    closeIfClickOut(target) {
        if (this.targetIsntMultiSelect(target)) {
            this.toggleOptions();
        }
    }
    targetIsntMultiSelect(target) {
        return !this.elementRef.nativeElement.contains(target);
    }
    closeOnEscKey() {
        if (this.isOptionsExtended) {
            this.toggleOptions();
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.sortOptions();
        }
    }
    ngOnInit() {
        if (!this.options) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'invalid-input', 'The "options" attribute must be defined.');
        }
        this.sortOptions();
        this.emitValues();
    }
    sortOptions() {
        if (!this.sort) {
            return;
        }
        if (this.sort === 'alpha') {
            this.sortOptionsAlphabetically();
        }
    }
    sortOptionsAlphabetically() {
        this.options = src_app_services_utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].sortStringsAlphabetically(this.options);
    }
    emitValues() {
        this.value.emit(this.values);
    }
    getOptions() {
        if (!this.options) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'invalid-input', 'The "options" attribute must be defined.');
        }
        return this.options;
    }
    onOptionSelect(value) {
        let instruction = value[0];
        let option = value.slice(1);
        if (instruction === '+') {
            this.addValue(option);
        }
        else {
            this.removeValue(option);
        }
        this.emitValues();
    }
    addValue(value) {
        if (this.valueExists(value)) {
            return;
        }
        this.values.push(value);
    }
    removeValue(value) {
        if (this.valueExists(value)) {
            this.filterArray(value);
        }
    }
    valueExists(value) {
        return this.values.includes(value);
    }
    filterArray(value) {
        this.values = this.values.filter((val) => val !== value);
    }
    toggleOptions() {
        this.isOptionsExtended = !this.isOptionsExtended;
    }
    getPreviewMessage() {
        if (this.noValuesSelected()) {
            return this.getPlaceholderMessage();
        }
        return this.getSelectedPreview();
    }
    noValuesSelected() {
        return this.values.length === 0;
    }
    getPlaceholderMessage() {
        if (!this.hint) {
            return 'Select multiple...';
        }
        return this.hint;
    }
    getSelectedPreview() {
        this.sortValuesAlphabetically();
        let firstTwoValues = this.values.slice(0, 2);
        let preview = firstTwoValues.join(', ');
        if (this.previewNeedsEllipsis()) {
            preview += ',...';
        }
        return preview;
    }
    sortValuesAlphabetically() {
        this.values = src_app_services_utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].sortStringsAlphabetically(this.values);
    }
    previewNeedsEllipsis() {
        return this.values.length > 2;
    }
    /**
     * TESTING ONLY
     */
    setOptions(options) {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'internal', 'Cannot use testing only methods in production.');
        }
        this.options = options;
    }
    /**
     * TESTING ONLY
     */
    setHint(hint) {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'internal', 'Cannot use testing only methods in production.');
        }
        this.hint = hint;
    }
    /**
     * TESTING ONLY
     */
    setSorting(sorting) {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
            throw new src_app_services_exception__WEBPACK_IMPORTED_MODULE_1__["Exception"]('CORE', 'internal', 'Cannot use testing only methods in production.');
        }
        this.sort = sorting;
    }
}
MultiSelectComponent.ɵfac = function MultiSelectComponent_Factory(t) { return new (t || MultiSelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
MultiSelectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MultiSelectComponent, selectors: [["app-multi-select"]], hostBindings: function MultiSelectComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MultiSelectComponent_click_HostBindingHandler($event) { return ctx.closeOnBodyClick($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"])("keydown.escape", function MultiSelectComponent_keydown_escape_HostBindingHandler() { return ctx.closeOnEscKey(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
    } }, inputs: { options: "options", sort: "sort", hint: "hint" }, outputs: { value: "value" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 6, vars: 2, consts: [["aria-label", "select", 1, "multi-select", 3, "click"], [1, "selected-options"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24"], ["d", "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"], [4, "ngIf"], [1, "options", "multi-select"], [3, "option", "selectEvent", 4, "ngFor", "ngForOf"], [3, "option", "selectEvent"]], template: function MultiSelectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MultiSelectComponent_Template_button_click_0_listener() { return ctx.toggleOptions(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, MultiSelectComponent_ng_container_5_Template, 3, 3, "ng-container", 4);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getPreviewMessage());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.getOptions());
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _multi_select_option_multi_select_option_component__WEBPACK_IMPORTED_MODULE_5__["MultiSelectOptionComponent"]], styles: ["[_nghost-%COMP%] {\n  position: relative;\n}\n\nbutton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  background: transparent;\n  border-radius: 10px;\n  border: 1px solid var(--font-color-default);\n  padding: 5px 10px;\n  min-width: 175px;\n  cursor: pointer;\n  transition: all ease-in-out 200ms;\n}\n\nbutton[_ngcontent-%COMP%]   .selected-options[_ngcontent-%COMP%] {\n  text-transform: capitalize;\n  color: var(--font-color-default);\n  font-family: var(--font-family-default);\n  transition: all ease-in-out 200ms;\n}\n\nbutton[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 24px;\n  width: 24px;\n}\n\nbutton[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  transition: all ease-in-out 200ms;\n  fill: var(--font-color-default);\n}\n\nbutton[_ngcontent-%COMP%]:focus {\n  -webkit-tap-highlight-color: transparent;\n  outline: none;\n}\n\nbutton[_ngcontent-%COMP%]:hover {\n  border-color: var(--font-color-subtitle);\n}\n\nbutton[_ngcontent-%COMP%]:hover   .selected-options[_ngcontent-%COMP%] {\n  color: var(--font-color-subtitle);\n}\n\nbutton[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: var(--font-color-subtitle);\n}\n\n.options[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-tertiary);\n  border-radius: 20px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  max-height: 200px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7QUFDRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlDQUFBO0FBRUY7O0FBQUU7RUFDRSwwQkFBQTtFQUNBLGdDQUFBO0VBQ0EsdUNBQUE7RUFDQSxpQ0FBQTtBQUVKOztBQUFFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFFSjs7QUFBSTtFQUNFLGlDQUFBO0VBQ0EsK0JBQUE7QUFFTjs7QUFBQTtFQUNFLHdDQUFBO0VBQ0EsYUFBQTtBQUdGOztBQURBO0VBQ0Usd0NBQUE7QUFJRjs7QUFGRTtFQUNFLGlDQUFBO0FBSUo7O0FBREk7RUFDRSxnQ0FBQTtBQUdOOztBQUFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1Q0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBR0YiLCJmaWxlIjoic3JjL2FwcC9jb3JlL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdFxuICBwb3NpdGlvbjogcmVsYXRpdmVcbiAgXG5idXR0b25cbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlblxuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50XG4gIGJvcmRlci1yYWRpdXM6IDEwcHhcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuICBwYWRkaW5nOiA1cHggMTBweFxuICBtaW4td2lkdGg6IDE3NXB4XG4gIGN1cnNvcjogcG9pbnRlclxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMjAwbXNcblxuICAuc2VsZWN0ZWQtb3B0aW9uc1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplXG4gICAgY29sb3I6IHZhcigtLWZvbnQtY29sb3ItZGVmYXVsdClcbiAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktZGVmYXVsdClcbiAgICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMjAwbXNcblxuICBzdmdcbiAgICBoZWlnaHQ6IDI0cHhcbiAgICB3aWR0aDogMjRweFxuXG4gICAgcGF0aFxuICAgICAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDIwMG1zXG4gICAgICBmaWxsOiB2YXIoLS1mb250LWNvbG9yLWRlZmF1bHQpXG5cbmJ1dHRvbjpmb2N1c1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50XG4gIG91dGxpbmU6IG5vbmVcblxuYnV0dG9uOmhvdmVyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZm9udC1jb2xvci1zdWJ0aXRsZSlcblxuICAuc2VsZWN0ZWQtb3B0aW9uc1xuICAgIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yLXN1YnRpdGxlKVxuXG4gIHN2Z1xuICAgIHBhdGhcbiAgICAgIGZpbGw6IHZhcigtLWZvbnQtY29sb3Itc3VidGl0bGUpXG5cbiAgXG4ub3B0aW9uc1xuICBwb3NpdGlvbjogYWJzb2x1dGVcbiAgdG9wOiAwXG4gIGxlZnQ6IDBcbiAgei1pbmRleDogMTAwMFxuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItdGVydGlhcnkpXG4gIGJvcmRlci1yYWRpdXM6IDIwcHhcbiAgb3ZlcmZsb3cteDogaGlkZGVuXG4gIG92ZXJmbG93LXk6IHNjcm9sbFxuICBtYXgtaGVpZ2h0OiAyMDBweFxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MultiSelectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-multi-select',
                templateUrl: './multi-select.component.html',
                styleUrls: ['./multi-select.component.sass'],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['options']
        }], sort: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['sort']
        }], hint: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['hint']
        }], closeOnBodyClick: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:click', ['$event']]
        }], closeOnEscKey: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['document:keydown.escape']
        }] }); })();


/***/ }),

/***/ "r/ZF":
/*!*******************************************!*\
  !*** ./src/app/services/meta/meta-tag.ts ***!
  \*******************************************/
/*! exports provided: MetaTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaTag", function() { return MetaTag; });
/* harmony import */ var _abstract_tag_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-tag-factory */ "cbnz");

class MetaTag extends _abstract_tag_factory__WEBPACK_IMPORTED_MODULE_0__["PageTag"] {
    constructor(name, content) {
        super(name, content);
    }
    getMetaDefinition() {
        let definition = {
            name: this.name,
            content: this.content,
        };
        return definition;
    }
    getSelector() {
        return `name="${this.name}"`;
    }
}


/***/ }),

/***/ "rOEK":
/*!*************************************************!*\
  !*** ./src/app/services/projects/technology.ts ***!
  \*************************************************/
/*! exports provided: Technology */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Technology", function() { return Technology; });
/* harmony import */ var _database_database_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object */ "kW+F");
/* harmony import */ var _project_exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-exception */ "tzTb");


class Technology extends _database_database_object__WEBPACK_IMPORTED_MODULE_0__["DatabaseObject"] {
    constructor(database, document) {
        super(database);
        if (this.isDocument(document)) {
            this.id = document.id;
            this.name = document.name;
            return;
        }
        this.id = this.createId();
    }
    isDocument(doc) {
        if (!doc) {
            return false;
        }
        return !!(doc.id && doc.name);
    }
    getId() {
        if (!this.id) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_1__["ProjectException"]('invalid-input', 'Technology ID is undefined.');
        }
        return this.id;
    }
    getName() {
        if (!this.name) {
            throw new _project_exception__WEBPACK_IMPORTED_MODULE_1__["ProjectException"]('invalid-input', 'Technology name is undefined.');
        }
        return this.name;
    }
}


/***/ }),

/***/ "sd3N":
/*!***************************************************************!*\
  !*** ./src/app/core/button-expand/button-expand.component.ts ***!
  \***************************************************************/
/*! exports provided: ButtonExpandComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonExpandComponent", function() { return ButtonExpandComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");


class ButtonExpandComponent {
    constructor() {
        this.expand = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isExpanded = false;
    }
    ngOnInit() { }
    getLabel() {
        let showHide = this.isExpanded ? 'Hide' : 'Show';
        if (!this.label) {
            return `${showHide} More`;
        }
        return `${showHide} ${this.label}`;
    }
    setLabel(label) {
        this.label = label;
    }
    onClick() {
        this.isExpanded = !this.isExpanded;
        this.expand.emit(this.isExpanded);
    }
}
ButtonExpandComponent.ɵfac = function ButtonExpandComponent_Factory(t) { return new (t || ButtonExpandComponent)(); };
ButtonExpandComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ButtonExpandComponent, selectors: [["app-button-expand"]], inputs: { label: "label" }, outputs: { expand: "expand" }, decls: 6, vars: 3, consts: [[3, "click"], [1, "label"], [1, "icon"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24"], ["d", "M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"]], template: function ButtonExpandComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ButtonExpandComponent_Template_button_click_0_listener() { return ctx.onClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getLabel());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("rotated", ctx.isExpanded);
    } }, styles: ["button[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background: transparent;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  font: inherit;\n  transition: all ease-in-out 200ms;\n  padding: 0;\n  -webkit-tap-highlight-color: transparent;\n}\nbutton[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: var(--font-color-default);\n  margin-right: 5px;\n}\nbutton[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: all ease-in-out 200ms;\n  height: 24px;\n  width: 24px;\n}\nbutton[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: var(--font-color-default);\n}\nbutton[_ngcontent-%COMP%]:hover {\n  filter: brightness(0.8);\n}\n.rotated[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9idXR0b24tZXhwYW5kL2J1dHRvbi1leHBhbmQuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGlDQUFBO0VBQ0EsVUFBQTtFQUNBLHdDQUFBO0FBQ0Y7QUFDRTtFQUNFLGdDQUFBO0VBQ0EsaUJBQUE7QUFDSjtBQUVJO0VBQ0UsaUNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUFOO0FBQ007RUFDRSwrQkFBQTtBQUNSO0FBQ0E7RUFDRSx1QkFBQTtBQUVGO0FBQUE7RUFDRSx5QkFBQTtBQUdGIiwiZmlsZSI6InNyYy9hcHAvY29yZS9idXR0b24tZXhwYW5kL2J1dHRvbi1leHBhbmQuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b25cbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnRcbiAgYm9yZGVyOiBub25lXG4gIG91dGxpbmU6IG5vbmVcbiAgY3Vyc29yOiBwb2ludGVyXG4gIGZvbnQ6IGluaGVyaXRcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDIwMG1zXG4gIHBhZGRpbmc6IDBcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudFxuXG4gIC5sYWJlbFxuICAgIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yLWRlZmF1bHQpXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHhcblxuICAuaWNvblxuICAgIHN2Z1xuICAgICAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDIwMG1zXG4gICAgICBoZWlnaHQ6IDI0cHhcbiAgICAgIHdpZHRoOiAyNHB4XG4gICAgICBwYXRoXG4gICAgICAgIGZpbGw6IHZhcigtLWZvbnQtY29sb3ItZGVmYXVsdClcblxuYnV0dG9uOmhvdmVyXG4gIGZpbHRlcjogYnJpZ2h0bmVzcygwLjgpXG5cbi5yb3RhdGVkXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZykiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ButtonExpandComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-button-expand',
                templateUrl: './button-expand.component.html',
                styleUrls: ['./button-expand.component.sass'],
            }]
    }], function () { return []; }, { label: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['label']
        }], expand: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "tzTb":
/*!********************************************************!*\
  !*** ./src/app/services/projects/project-exception.ts ***!
  \********************************************************/
/*! exports provided: ProjectException */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectException", function() { return ProjectException; });
/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../exception */ "A4p0");

class ProjectException extends _exception__WEBPACK_IMPORTED_MODULE_0__["Exception"] {
    constructor(errorOrObj, message, context) {
        super('PROJ', errorOrObj, message, context);
    }
}


/***/ }),

/***/ "u4ch":
/*!*******************************************************!*\
  !*** ./src/app/projects/project/project.component.ts ***!
  \*******************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_projects_project_exception__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/projects/project-exception */ "tzTb");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/logger.service */ "Mb37");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _core_button_expand_button_expand_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/button-expand/button-expand.component */ "sd3N");







function ProjectComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.getIconUrl(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", ctx_r0.getName());
} }
function ProjectComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ProjectComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const technology_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", technology_r5, " ");
} }
function ProjectComponent_a_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const link_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", link_r6.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](link_r6.name);
} }
class ProjectComponent {
    constructor(logger) {
        this.logger = logger;
        this.isLinksExpanded = false;
    }
    ngOnInit() { }
    getName() {
        try {
            return this.project.getName();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getLinks() {
        try {
            return this.project.getLinks();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getDescription() {
        try {
            return this.project.getDescription();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getTechnologies() {
        try {
            return this.project.getTechnologies();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getIconUrl() {
        try {
            return this.project.getIconUrl();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    getStatus() {
        try {
            return this.project.getStatus();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    showLinks(show) {
        this.isLinksExpanded = show;
    }
    getDateStartMs() {
        try {
            return this.project.getDateStartMs();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    /**
     * TESTING ONLY
     */
    setProject(project) {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
            throw new src_app_services_projects_project_exception__WEBPACK_IMPORTED_MODULE_1__["ProjectException"]('internal', 'Cannot use testing methods in production.');
        }
        this.project = project;
    }
}
ProjectComponent.ɵfac = function ProjectComponent_Factory(t) { return new (t || ProjectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"])); };
ProjectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectComponent, selectors: [["app-project"]], inputs: { project: "project" }, decls: 24, vars: 12, consts: [["itempscope", "", "itemtype", "https://schema.org/SoftwareSourceCode", 1, "row"], ["itemprop", "creator", "content", "Jacob Ian Matthews"], ["itemprop", "dateCreated", 3, "content"], [1, "icon"], [4, "ngIf", "ngIfElse"], ["default", ""], [1, "details"], [1, "name-status"], ["itemprop", "name", 1, "name"], [1, "status"], ["viewBox", "0 0 24 24", "xmlns", "http://www.w3.org/2000/svg"], ["id", "check_circle_black_24dp 1"], ["id", "circle", "d", "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"], ["id", "check", "d", "M5.7 12.7L9.29 16.29C9.68 16.68 10.32 16.68 10.7 16.29L18.29 8.7C18.68 8.31 18.68 7.68 18.29 7.29C17.9 6.9 17.27 6.9 16.88 7.29L10 14.17L7.11 11.29C6.72 10.9 6.09 10.9 5.7 11.29C5.31 11.68 5.31 12.31 5.7 12.7Z"], ["itemprop", "abstract", 1, "description"], [1, "technologies"], ["class", "technology", 4, "ngFor", "ngForOf"], ["label", "Links", 3, "expand"], [1, "links"], ["class", "link", "target", "_blank", 3, "href", 4, "ngFor", "ngForOf"], ["itemprop", "image", 3, "src", "alt"], ["itemprop", "image", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24"], ["d", "M12.09 2.91C10.08.9 7.07.49 4.65 1.67L8.28 5.3c.39.39.39 1.02 0 1.41L6.69 8.3c-.39.4-1.02.4-1.41 0L1.65 4.67C.48 7.1.89 10.09 2.9 12.1c1.86 1.86 4.58 2.35 6.89 1.48l7.96 7.96c1.03 1.03 2.69 1.03 3.71 0 1.03-1.03 1.03-2.69 0-3.71L13.54 9.9c.92-2.34.44-5.1-1.45-6.99z"], [1, "technology"], ["target", "_blank", 1, "link", 3, "href"]], template: function ProjectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "meta", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "meta", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ProjectComponent_ng_container_4_Template, 2, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ProjectComponent_ng_template_5_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "svg", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "g", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "path", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, ProjectComponent_div_20_Template, 2, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "app-button-expand", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("expand", function ProjectComponent_Template_app_button_expand_expand_21_listener($event) { return ctx.showLinks($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, ProjectComponent_a_23_Template, 2, 2, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("content", ctx.getDateStartMs());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.getIconUrl() !== null)("ngIfElse", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getName());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.getStatus());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.getStatus(), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getDescription());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.getTechnologies());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx.isLinksExpanded ? "flex" : "none");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.getLinks());
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _core_button_expand_button_expand_component__WEBPACK_IMPORTED_MODULE_5__["ButtonExpandComponent"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  background: var(--color-secondary);\n  padding: 25px;\n  border-radius: 20px;\n  flex-direction: column;\n  margin-bottom: 15px;\n}\n\n[_nghost-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.row[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.icon[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  margin-right: 15px;\n}\n\n.icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 64px;\n  width: 64px;\n}\n\n.icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 64px;\n  width: 64px;\n}\n\n.icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: var(--font-color-default);\n}\n\n.details[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  display: flex;\n  flex-direction: column;\n  line-height: 150%;\n}\n\n.name-status[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.name[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  margin-right: 15px;\n}\n\n.status[_ngcontent-%COMP%] {\n  padding: 2px 6px;\n  align-self: flex-start;\n  display: flex;\n  justify-self: flex-start;\n  flex-direction: row;\n  align-items: center;\n  border-radius: 10px;\n}\n\n.status[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 16px;\n  margin-right: 2px;\n}\n\n.status[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   #circle[_ngcontent-%COMP%] {\n  fill: var(--font-color-default);\n}\n\n.status.finished[_ngcontent-%COMP%] {\n  background: #24e6245c;\n}\n\n.status.finished[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   #check[_ngcontent-%COMP%] {\n  fill: green;\n}\n\n.status.ongoing[_ngcontent-%COMP%] {\n  background-color: #e6d0248a;\n}\n\n.status.ongoing[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   #check[_ngcontent-%COMP%] {\n  fill: var(--font-color-default);\n}\n\n.description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--font-color-subtitle);\n  margin-bottom: 10px;\n}\n\n.technologies[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-content: flex-start;\n  margin-bottom: 5px;\n  flex-wrap: wrap;\n}\n\n.technologies[_ngcontent-%COMP%]   .technology[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  background: var(--color-tertiary);\n  padding: 5px;\n  margin-right: 7px;\n  text-transform: lowercase;\n  white-space: nowrap;\n  margin-bottom: 5px;\n}\n\n.technologies[_ngcontent-%COMP%]   .technology[_ngcontent-%COMP%]:last-child {\n  margin-right: 0;\n}\n\napp-button-expand[_ngcontent-%COMP%] {\n  align-self: flex-start;\n}\n\n.links[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-top: 5px;\n  border-radius: 10px;\n  background: var(--color-tertiary);\n  padding: 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n.links[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.links[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.links[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]::after {\n  content: \"\";\n  mask-image: url(\"/assets/res/hyperlink.svg\");\n  mask-size: 1em;\n  mask-position: center;\n  mask-repeat: no-repeat;\n  -webkit-mask-image: url(\"/assets/res/hyperlink.svg\");\n  -webkit-mask-size: 1em;\n  -webkit-mask-position: center;\n  -webkit-mask-repeat: no-repeat;\n  margin-left: 2px;\n  background-color: var(--font-color-accent);\n  padding-left: 1em;\n}\n\n@media screen and (max-width: 550px) {\n  .row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .icon[_ngcontent-%COMP%] {\n    margin-bottom: 10px;\n  }\n  .icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    height: 48px;\n    width: 48px;\n  }\n  .icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 48px;\n    width: 48px;\n  }\n\n  .name-status[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: normal;\n  }\n  .name-status[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n    margin-bottom: 5px;\n  }\n  .name-status[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n    margin-bottom: 10px;\n    align-self: auto;\n  }\n\n  .description[_ngcontent-%COMP%] {\n    line-height: 160%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvcHJvamVjdC9wcm9qZWN0LmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGtDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUNBO0VBQ0UsZ0JBQUE7QUFFRjs7QUFBQTtFQUNFLE9BQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFHRjs7QUFEQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7QUFJRjs7QUFIRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBS0o7O0FBSkU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQU1KOztBQUxJO0VBQ0UsK0JBQUE7QUFPTjs7QUFMQTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtBQVFGOztBQU5BO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtBQVNGOztBQVBBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBVUY7O0FBUkE7RUFDRSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBV0Y7O0FBVEU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FBV0o7O0FBVkk7RUFDRSwrQkFBQTtBQVlOOztBQVZBO0VBQ0UscUJBQUE7QUFhRjs7QUFWSTtFQUNFLFdBQUE7QUFZTjs7QUFWQTtFQUNFLDJCQUFBO0FBYUY7O0FBVkk7RUFDRSwrQkFBQTtBQVlOOztBQVZBO0VBQ0UsZUFBQTtFQUNBLGlDQUFBO0VBQ0EsbUJBQUE7QUFhRjs7QUFYQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFjRjs7QUFYRTtFQUNFLG1CQUFBO0VBQ0EsaUNBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFhSjs7QUFYRTtFQUNFLGVBQUE7QUFhSjs7QUFYQTtFQUNFLHNCQUFBO0FBY0Y7O0FBWkE7RUFDRSxPQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUNBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtBQWVGOztBQWJFO0VBQ0UsbUJBQUE7QUFlSjs7QUFiRTtFQUNFLGdCQUFBO0FBZUo7O0FBYkU7RUFDRSxXQUFBO0VBQ0EsNENBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLG9EQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQ0FBQTtFQUNBLGlCQUFBO0FBZUo7O0FBYkE7RUFDRTtJQUNFLHNCQUFBO0VBZ0JGOztFQWRBO0lBQ0UsbUJBQUE7RUFpQkY7RUFoQkU7SUFDRSxZQUFBO0lBQ0EsV0FBQTtFQWtCSjtFQWpCRTtJQUNFLFlBQUE7SUFDQSxXQUFBO0VBbUJKOztFQWpCQTtJQUNFLHNCQUFBO0lBQ0EsbUJBQUE7RUFvQkY7RUFsQkU7SUFDRSxrQkFBQTtFQW9CSjtFQWxCRTtJQUNFLG1CQUFBO0lBQ0EsZ0JBQUE7RUFvQko7O0VBbEJBO0lBQ0UsaUJBQUE7RUFxQkY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3QvcHJvamVjdC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGRpc3BsYXk6IGZsZXhcbiAgYmFja2dyb3VuZDogdmFyKC0tY29sb3Itc2Vjb25kYXJ5KVxuICBwYWRkaW5nOiAyNXB4XG4gIGJvcmRlci1yYWRpdXM6IDIwcHhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBtYXJnaW4tYm90dG9tOiAxNXB4XG5cbjpob3N0Omxhc3QtY2hpbGRcbiAgbWFyZ2luLWJvdHRvbTogMFxuXG4ucm93XG4gIGZsZXg6IDFcbiAgd2lkdGg6IDEwMCVcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogcm93XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXJcblxuLmljb25cbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydFxuICBtYXJnaW4tcmlnaHQ6IDE1cHhcbiAgaW1nIFxuICAgIGhlaWdodDogNjRweFxuICAgIHdpZHRoOiA2NHB4XG4gIHN2Z1xuICAgIGhlaWdodDogNjRweFxuICAgIHdpZHRoOiA2NHB4XG4gICAgcGF0aFxuICAgICAgZmlsbDogdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuXG4uZGV0YWlsc1xuICBmb250LXNpemU6IDFyZW1cbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uXG4gIGxpbmUtaGVpZ2h0OiAxNTAlXG5cbi5uYW1lLXN0YXR1c1xuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiByb3dcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnRcblxuLm5hbWVcbiAgZm9udC1zaXplOiAxLjJyZW1cbiAgZm9udC13ZWlnaHQ6IDYwMFxuICBtYXJnaW4tcmlnaHQ6IDE1cHhcblxuLnN0YXR1c1xuICBwYWRkaW5nOiAycHggNnB4XG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnRcbiAgZGlzcGxheTogZmxleFxuICBqdXN0aWZ5LXNlbGY6IGZsZXgtc3RhcnRcbiAgZmxleC1kaXJlY3Rpb246IHJvd1xuICBhbGlnbi1pdGVtczogY2VudGVyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHhcblxuICBzdmdcbiAgICBoZWlnaHQ6IDE2cHhcbiAgICB3aWR0aDogMTZweFxuICAgIG1hcmdpbi1yaWdodDogMnB4XG4gICAgI2NpcmNsZVxuICAgICAgZmlsbDogdmFyKC0tZm9udC1jb2xvci1kZWZhdWx0KVxuXG4uc3RhdHVzLmZpbmlzaGVkXG4gIGJhY2tncm91bmQ6ICMyNGU2MjQ1Y1xuICBcbiAgc3ZnXG4gICAgI2NoZWNrXG4gICAgICBmaWxsOiBncmVlblxuXG4uc3RhdHVzLm9uZ29pbmdcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZDAyNDhhXG5cbiAgc3ZnXG4gICAgI2NoZWNrXG4gICAgICBmaWxsOiB2YXIoLS1mb250LWNvbG9yLWRlZmF1bHQpXG5cbi5kZXNjcmlwdGlvblxuICBmb250LXNpemU6IDFyZW1cbiAgY29sb3I6IHZhcigtLWZvbnQtY29sb3Itc3VidGl0bGUpXG4gIG1hcmdpbi1ib3R0b206IDEwcHhcblxuLnRlY2hub2xvZ2llc1xuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiByb3dcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0XG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnRcbiAgbWFyZ2luLWJvdHRvbTogNXB4XG4gIGZsZXgtd3JhcDogd3JhcFxuXG5cbiAgLnRlY2hub2xvZ3lcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4XG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItdGVydGlhcnkpXG4gICAgcGFkZGluZzogNXB4XG4gICAgbWFyZ2luLXJpZ2h0OiA3cHhcbiAgICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcFxuICAgIG1hcmdpbi1ib3R0b206IDVweFxuXG4gIC50ZWNobm9sb2d5Omxhc3QtY2hpbGRcbiAgICBtYXJnaW4tcmlnaHQ6IDBcblxuYXBwLWJ1dHRvbi1leHBhbmRcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydFxuXG4ubGlua3NcbiAgZmxleDogMVxuICBtYXJnaW4tdG9wOiA1cHhcbiAgYm9yZGVyLXJhZGl1czogMTBweFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci10ZXJ0aWFyeSlcbiAgcGFkZGluZzogMTVweFxuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0XG5cbiAgLmxpbmtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4XG5cbiAgLmxpbms6bGFzdC1jaGlsZFxuICAgIG1hcmdpbi1ib3R0b206IDBcblxuICAubGluazo6YWZ0ZXJcbiAgICBjb250ZW50OiAnJ1xuICAgIG1hc2staW1hZ2U6ICB1cmwoJy9hc3NldHMvcmVzL2h5cGVybGluay5zdmcnKVxuICAgIG1hc2stc2l6ZTogMWVtXG4gICAgbWFzay1wb3NpdGlvbjogY2VudGVyXG4gICAgbWFzay1yZXBlYXQ6IG5vLXJlcGVhdFxuICAgIC13ZWJraXQtbWFzay1pbWFnZTogIHVybCgnL2Fzc2V0cy9yZXMvaHlwZXJsaW5rLnN2ZycpXG4gICAgLXdlYmtpdC1tYXNrLXNpemU6IDFlbVxuICAgIC13ZWJraXQtbWFzay1wb3NpdGlvbjogY2VudGVyXG4gICAgLXdlYmtpdC1tYXNrLXJlcGVhdDogbm8tcmVwZWF0XG4gICAgbWFyZ2luLWxlZnQ6IDJweFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZvbnQtY29sb3ItYWNjZW50KVxuICAgIHBhZGRpbmctbGVmdDogMWVtXG5cbkBtZWRpYSBzY3JlZW4gYW5kICggbWF4LXdpZHRoOiAgNTUwcHggKVxuICAucm93XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuXG4gIC5pY29uXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweFxuICAgIHN2Z1xuICAgICAgaGVpZ2h0OiA0OHB4XG4gICAgICB3aWR0aDogNDhweFxuICAgIGltZ1xuICAgICAgaGVpZ2h0OiA0OHB4XG4gICAgICB3aWR0aDogNDhweFxuXG4gIC5uYW1lLXN0YXR1c1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW5cbiAgICBhbGlnbi1pdGVtczogbm9ybWFsXG5cbiAgICAubmFtZVxuICAgICAgbWFyZ2luLWJvdHRvbTogNXB4XG5cbiAgICAuc3RhdHVzXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4XG4gICAgICBhbGlnbi1zZWxmOiBhdXRvXG4gIFxuICAuZGVzY3JpcHRpb25cbiAgICBsaW5lLWhlaWdodDogMTYwJSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-project',
                templateUrl: './project.component.html',
                styleUrls: ['./project.component.sass'],
            }]
    }], function () { return [{ type: src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_3__["LoggerService"] }]; }, { project: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['project']
        }] }); })();


/***/ }),

/***/ "uzJ2":
/*!***********************************************************************!*\
  !*** ./src/app/projects/projects-filter/projects-filter.component.ts ***!
  \***********************************************************************/
/*! exports provided: ProjectsFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsFilterComponent", function() { return ProjectsFilterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_projects_project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/projects/project.service */ "g53c");
/* harmony import */ var src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/logger.service */ "Mb37");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _core_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/multi-select/multi-select.component */ "pPJV");






function ProjectsFilterComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Filter:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-multi-select", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("value", function ProjectsFilterComponent_ng_container_0_Template_app_multi_select_value_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.onSelectChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const technologies_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", technologies_r1);
} }
class ProjectsFilterComponent {
    constructor(projectService, logger) {
        this.projectService = projectService;
        this.logger = logger;
        this.filterTo = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() { }
    getTechnologies() {
        if (!this.technologies) {
            this.fetchTechnologiesFromService();
        }
        return this.technologies;
    }
    fetchTechnologiesFromService() {
        try {
            this.technologies = this.projectService.getTechnologies();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    onSelectChange(value) {
        this.filterTo.emit(value);
    }
}
ProjectsFilterComponent.ɵfac = function ProjectsFilterComponent_Factory(t) { return new (t || ProjectsFilterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_projects_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_2__["LoggerService"])); };
ProjectsFilterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectsFilterComponent, selectors: [["app-projects-filter"]], outputs: { filterTo: "filterTo" }, decls: 2, vars: 3, consts: [[4, "ngIf"], [1, "filter-label"], ["sort", "alpha", "hint", "Technologies...", 3, "options", "value"]], template: function ProjectsFilterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ProjectsFilterComponent_ng_container_0_Template, 4, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.getTechnologies()));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _core_multi_select_multi_select_component__WEBPACK_IMPORTED_MODULE_4__["MultiSelectComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.filter-label[_ngcontent-%COMP%] {\n  margin-right: 20px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMtZmlsdGVyL3Byb2plY3RzLWZpbHRlci5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFFRiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3RzL3Byb2plY3RzLWZpbHRlci9wcm9qZWN0cy1maWx0ZXIuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdFxuICBkaXNwbGF5OiBmbGV4XG4gIGZsZXgtZGlyZWN0aW9uOiByb3dcbiAgYWxpZ24taXRlbXM6IGNlbnRlclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnRcblxuLmZpbHRlci1sYWJlbFxuICBtYXJnaW4tcmlnaHQ6IDIwcHhcbiAgZm9udC13ZWlnaHQ6IDYwMFxuXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectsFilterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-projects-filter',
                templateUrl: './projects-filter.component.html',
                styleUrls: ['./projects-filter.component.sass'],
            }]
    }], function () { return [{ type: src_app_services_projects_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"] }, { type: src_app_services_logger_service__WEBPACK_IMPORTED_MODULE_2__["LoggerService"] }]; }, { filterTo: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about/about.component */ "84zG");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projects/projects.component */ "zUkc");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./not-found/not-found.component */ "nod/");
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./privacy/privacy.component */ "TsVY");









const routes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"],
        data: {
            title: 'Home | Jacob Ian Matthews',
            meta: [
                {
                    name: 'description',
                    content: 'The home page of Jacob the software engineer!',
                },
            ],
            og: [
                {
                    name: 'image',
                    content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
                },
                {
                    name: 'type',
                    content: 'website',
                },
                {
                    name: 'url',
                    content: 'https://jacobianmatthews.com',
                },
                { name: 'title', content: 'Home | Jacob Ian Matthews' },
            ],
        },
    },
    {
        path: 'about',
        component: _about_about_component__WEBPACK_IMPORTED_MODULE_3__["AboutComponent"],
        data: {
            title: 'About Me | Jacob Ian Matthews',
            meta: [{ name: 'description', content: 'Who am I?' }],
            og: [
                {
                    name: 'image',
                    content: 'https://jacobianmatthews.com/assets/res/profile.jpeg',
                },
                {
                    name: 'type',
                    content: 'profile',
                },
                {
                    name: 'profile:first_name',
                    content: 'Jacob',
                },
                {
                    name: 'profile:last_name',
                    content: 'Matthews',
                },
                { name: 'profile:username', content: 'jacob-ian' },
                { name: 'profile:gender', content: 'male' },
                {
                    name: 'url',
                    content: 'https://jacobianmatthews.com/about',
                },
                { name: 'title', content: 'About Me | Jacob Ian Matthews' },
            ],
        },
    },
    {
        path: 'projects',
        component: _projects_projects_component__WEBPACK_IMPORTED_MODULE_4__["ProjectsComponent"],
        data: {
            title: 'Projects | Jacob Ian Matthews',
            meta: [{ name: 'description', content: 'What have I been up to?' }],
            og: [
                {
                    name: 'image',
                    content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
                },
                {
                    name: 'type',
                    content: 'website',
                },
                {
                    name: 'url',
                    content: 'https://jacobianmatthews.com/projects',
                },
                { name: 'title', content: 'Projects | Jacob Ian Matthews' },
            ],
        },
    },
    {
        path: 'privacy',
        component: _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_6__["PrivacyComponent"],
        data: {
            title: 'Privacy Policy | Jacob Ian Matthews',
            meta: [
                {
                    name: 'description',
                    content: 'The Privacy Policy for jacobianmatthews.com',
                },
            ],
            og: [
                {
                    name: 'image',
                    content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
                },
                {
                    name: 'type',
                    content: 'website',
                },
                {
                    name: 'url',
                    content: 'https://jacobianmatthews.com/privacy',
                },
                { name: 'title', content: 'Privacy Policy | Jacob Ian Matthews' },
            ],
        },
    },
    {
        path: '**',
        component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_5__["NotFoundComponent"],
        data: {
            title: 'Page Not Found | Jacob Ian Matthews',
            meta: [{ name: 'description', content: 'The page could not be found.' }],
            og: [
                {
                    name: 'image',
                    content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
                },
                {
                    name: 'type',
                    content: 'website',
                },
                {
                    name: 'url',
                    content: 'https://jacobianmatthews.com/404',
                },
                { name: 'title', content: 'Page Not Found | Jacob Ian Matthews' },
            ],
        },
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, {
                initialNavigation: 'enabled',
            }),
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, {
                        initialNavigation: 'enabled',
                    }),
                ],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "wMmA":
/*!******************************************************!*\
  !*** ./src/app/services/projects/project-factory.ts ***!
  \******************************************************/
/*! exports provided: ProjectFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectFactory", function() { return ProjectFactory; });
/* harmony import */ var _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../database/database-object-factory */ "40ud");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "3fdq");


class ProjectFactory extends _database_database_object_factory__WEBPACK_IMPORTED_MODULE_0__["DatabaseObjectFactory"] {
    constructor(database) {
        super(database);
    }
    createDatabaseObject(document) {
        return new _project__WEBPACK_IMPORTED_MODULE_1__["Project"](this.database, document);
    }
}


/***/ }),

/***/ "x5pN":
/*!*******************************************************************!*\
  !*** ./src/app/window/navigation-bar/navigation-bar.component.ts ***!
  \*******************************************************************/
/*! exports provided: NavigationBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationBarComponent", function() { return NavigationBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");


const _c0 = ["*"];
class NavigationBarComponent {
    constructor() { }
    ngOnInit() {
    }
}
NavigationBarComponent.ɵfac = function NavigationBarComponent_Factory(t) { return new (t || NavigationBarComponent)(); };
NavigationBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavigationBarComponent, selectors: [["app-navigation-bar"]], ngContentSelectors: _c0, decls: 3, vars: 0, consts: [[1, "navigation-bar"]], template: function NavigationBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".navigation-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--color-primary);\n}\n.navigation-bar[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2luZG93L25hdmlnYXRpb24tYmFyL25hdmlnYXRpb24tYmFyLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLHNDQUFBO0FBQ0Y7QUFDRTtFQUNFLFNBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQUNKIiwiZmlsZSI6InNyYy9hcHAvd2luZG93L25hdmlnYXRpb24tYmFyL25hdmlnYXRpb24tYmFyLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdmlnYXRpb24tYmFyXG4gIHdpZHRoOiAxMDAlXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpXG4gIFxuICB1bFxuICAgIG1hcmdpbjogMFxuICAgIHBhZGRpbmc6IDBcbiAgICBkaXNwbGF5OiBmbGV4XG4gICAgZmxleC1kaXJlY3Rpb246IHJvd1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavigationBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navigation-bar',
                templateUrl: './navigation-bar.component.html',
                styleUrls: ['./navigation-bar.component.sass']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "zUkc":
/*!************************************************!*\
  !*** ./src/app/projects/projects.component.ts ***!
  \************************************************/
/*! exports provided: ProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function() { return ProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _services_projects_project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/projects/project.service */ "g53c");
/* harmony import */ var _window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../window/flex-container/flex-container.component */ "k71K");
/* harmony import */ var _projects_filter_projects_filter_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projects-filter/projects-filter.component */ "uzJ2");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./project/project.component */ "u4ch");








function ProjectsComponent_ng_container_5_div_1_app_project_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-project", 6);
} if (rf & 2) {
    const project_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("project", project_r4);
} }
function ProjectsComponent_ng_container_5_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProjectsComponent_ng_container_5_div_1_app_project_1_Template, 1, 1, "app-project", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const projects_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", projects_r1);
} }
function ProjectsComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProjectsComponent_ng_container_5_div_1_Template, 2, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const projects_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", projects_r1.length > 0);
} }
class ProjectsComponent {
    constructor(projectService) {
        this.projectService = projectService;
    }
    ngOnInit() {
        this.filter = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.projects = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.filteredProjects = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.startFilteringProjects();
    }
    /**
     * This method was used as a work around due to RXJS combineLatest
     * not working with Angular Universal and causing infinite page loading
     * with no component render. The error leads to a JavaScript heap error on the
     * Universal Express server.
     */
    startFilteringProjects() {
        this.projectSubscription = this.subscribeToProjects();
        this.filterSubscription = this.subscribeToFilter();
    }
    subscribeToProjects() {
        return this.getProjectsObservable().subscribe((projects) => {
            this.projects.next(projects);
            this.onObservableChange();
        });
    }
    getProjectsObservable() {
        return this.projectService.getProjects();
    }
    onObservableChange() {
        let filteredProjects = this.filterProjectsWithTechnologies();
        return this.filteredProjects.next(filteredProjects);
    }
    filterProjectsWithTechnologies() {
        let projects = this.projects.value;
        let technologies = this.filter.value;
        if (this.canFilterProjects()) {
            projects = this.filterProjects(projects, technologies);
        }
        let sortedFilteredProjects = this.sortProjectsByDate(projects);
        return sortedFilteredProjects;
    }
    canFilterProjects() {
        return this.hasProjects() && this.hasTechnologies();
    }
    hasProjects() {
        return this.projects.value.length > 0;
    }
    hasTechnologies() {
        return this.filter.value.length > 0;
    }
    filterProjects(projects, technologies) {
        return projects.filter((project) => project.usesTechnologies(technologies));
    }
    sortProjectsByDate(projects) {
        return projects.sort((a, b) => b.getDateStartMs() - a.getDateStartMs());
    }
    subscribeToFilter() {
        return this.getFilterObservable().subscribe(() => this.onObservableChange());
    }
    getFilterObservable() {
        return this.filter.asObservable();
    }
    getFilteredProjects() {
        return this.filteredProjects.asObservable();
    }
    onFilter(filter) {
        this.filter.next(filter);
    }
    ngOnDestroy() {
        this.unsubscribeFromObservables();
    }
    unsubscribeFromObservables() {
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        if (this.projectSubscription) {
            this.projectSubscription.unsubscribe();
        }
    }
}
ProjectsComponent.ɵfac = function ProjectsComponent_Factory(t) { return new (t || ProjectsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_projects_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"])); };
ProjectsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectsComponent, selectors: [["app-projects"]], decls: 7, vars: 3, consts: [[1, "projects-options"], [3, "filterTo"], [4, "ngIf"], ["class", "projects-container", 4, "ngIf"], [1, "projects-container"], [3, "project", 4, "ngFor", "ngForOf"], [3, "project"]], template: function ProjectsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-flex-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "app-projects-filter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("filterTo", function ProjectsComponent_Template_app_projects_filter_filterTo_4_listener($event) { return ctx.onFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ProjectsComponent_ng_container_5_Template, 2, 1, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 1, ctx.getFilteredProjects()));
    } }, directives: [_window_flex_container_flex_container_component__WEBPACK_IMPORTED_MODULE_3__["FlexContainerComponent"], _projects_filter_projects_filter_component__WEBPACK_IMPORTED_MODULE_4__["ProjectsFilterComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _project_project_component__WEBPACK_IMPORTED_MODULE_6__["ProjectComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.projects-options[_ngcontent-%COMP%] {\n  flex: 0;\n  margin-bottom: 15px;\n}\n\n.projects-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdHMvcHJvamVjdHMuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7QUFDRjs7QUFDQTtFQUNFLE9BQUE7RUFDQSxtQkFBQTtBQUVGOztBQUFBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0FBR0YiLCJmaWxlIjoic3JjL2FwcC9wcm9qZWN0cy9wcm9qZWN0cy5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0XG4gIGZsZXg6IDFcbiAgZGlzcGxheTogZmxleFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydFxuXG4ucHJvamVjdHMtb3B0aW9uc1xuICBmbGV4OiAwXG4gIG1hcmdpbi1ib3R0b206IDE1cHhcblxuLnByb2plY3RzLWNvbnRhaW5lclxuICBmbGV4OiAxXG4gIGRpc3BsYXk6IGZsZXhcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtblxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-projects',
                templateUrl: './projects.component.html',
                styleUrls: ['./projects.component.sass'],
            }]
    }], function () { return [{ type: _services_projects_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
document.addEventListener('DOMContentLoaded', () => {
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(err => console.error(err));
});


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map