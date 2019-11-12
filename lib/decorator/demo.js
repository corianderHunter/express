"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var control_1 = require("./control");
var httpVerbs_1 = require("./httpVerbs");
var module_1 = require("./module");
var routeParams_1 = require("./routeParams");
var inject_1 = require("./inject");
var createApplication_1 = require("./createApplication");
var AppControl = /** @class */ (function () {
    function AppControl(a, b) {
        console.log(a, b);
    }
    AppControl.prototype.entry1 = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(req, res, next);
                return [2 /*return*/];
            });
        });
    };
    AppControl.prototype.entry2 = function (a, b, c) {
        return new Date();
    };
    __decorate([
        httpVerbs_1.Get('/entry1'),
        __param(0, routeParams_1.Req), __param(1, routeParams_1.Res), __param(2, routeParams_1.Next),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], AppControl.prototype, "entry1", null);
    __decorate([
        httpVerbs_1.Put('/entry2/:id'),
        __param(0, routeParams_1.Query('id')), __param(1, routeParams_1.Param()), __param(2, routeParams_1.Body),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], AppControl.prototype, "entry2", null);
    AppControl = __decorate([
        control_1.Control('/test'),
        __metadata("design:paramtypes", [Object, Object])
    ], AppControl);
    return AppControl;
}());
var DemoControl = /** @class */ (function () {
    function DemoControl(aService, bService) {
        this.aService = aService;
        this.bService = bService;
        this.serivce = 'service';
    }
    DemoControl.prototype.entry1 = function (res, req, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(this);
                console.log(req, res, next);
                return [2 /*return*/];
            });
        });
    };
    DemoControl.prototype.entry2 = function (a, b, c) {
        console.log(this);
        console.log(a, b, c);
        console.log(this.aService);
        this.aService.app();
        return new Date();
    };
    __decorate([
        inject_1.Inject('Base'),
        __metadata("design:type", Object)
    ], DemoControl.prototype, "test", void 0);
    __decorate([
        httpVerbs_1.Get('/entry1'),
        __param(0, routeParams_1.Res), __param(1, routeParams_1.Req), __param(2, routeParams_1.Next),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], DemoControl.prototype, "entry1", null);
    __decorate([
        httpVerbs_1.Post('/demo/:id/:idx'),
        __param(0, routeParams_1.Query()), __param(1, routeParams_1.Param()), __param(2, routeParams_1.Body),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Date)
    ], DemoControl.prototype, "entry2", null);
    DemoControl = __decorate([
        control_1.Control('/demo'),
        __metadata("design:paramtypes", [Object, Object])
    ], DemoControl);
    return DemoControl;
}());
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.app = function () {
        this.target.base();
        console.log('app');
    };
    __decorate([
        inject_1.Inject('Base'),
        __metadata("design:type", Object)
    ], AppService.prototype, "target", void 0);
    return AppService;
}());
var BaseService = /** @class */ (function () {
    function BaseService() {
        this.target = 'base-service';
    }
    BaseService.prototype.base = function () {
        console.log('base');
    };
    BaseService = __decorate([
        inject_1.Injectable('Base')
    ], BaseService);
    return BaseService;
}());
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        module_1.default({
            controls: [AppControl, DemoControl],
            services: [AppService, BaseService]
        })
    ], AppModule);
    return AppModule;
}());
var app = createApplication_1.createApplication([AppModule]);
app.listen(3000);
console.log('Express started on port 3000');
