"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
/**
 * subfolder: is the folders that will created, inside a main folder that its path will be provided in config.path
 * Notice: subSize in configuration are proximately after a violate it will stop add files. So, the proximation depends on last file size added into each subfolder.
 */
var KB = 1024;
var MB = 1024 * KB;
var GB = 1024 * MB;
//!RUN TYPESCRIPT FILE BEFORE JAVASCRIPT FILE i.e
//!   tsc index.ts
//!after that:
//!   node index.js
var config = {
    path: "C:\\Users\\Ahmed\\Desktop\\Tests Folder\\test",
    subFiles: 4,
    subSize: 1.5 * GB,
    orderBy: 'random'
};
//Do NOT Touch Below
var fileSystem = require("fs");
var fs = fileSystem.promises;
function main() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var info, dir, dir_1, dir_1_1, f, e_1_1, filesNameArr, allFiles, remainFiles, subFolderPath, i, j, j;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    info = {
                        totalFiles: 0,
                        totalFolders: 0,
                        mainFolderName: config.path.substring(config.path.lastIndexOf('\\') + 1)
                    };
                    checkValidConfig();
                    if (!config.path) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs.opendir(config.path)];
                case 1:
                    dir = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 13]);
                    dir_1 = __asyncValues(dir);
                    _b.label = 3;
                case 3: return [4 /*yield*/, dir_1.next()];
                case 4:
                    if (!(dir_1_1 = _b.sent(), !dir_1_1.done)) return [3 /*break*/, 6];
                    f = dir_1_1.value;
                    if (f.isDirectory())
                        throw new Error("There is a Directory named: ".concat(f.name, ". In the path provided! ").concat(config.path));
                    info.totalFiles++;
                    _b.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(dir_1_1 && !dir_1_1.done && (_a = dir_1["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(dir_1)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    if (info.totalFiles == 0 || info.totalFiles <= config.subFiles)
                        throw new Error("Total files found '".concat(info.totalFiles, "' ").concat(info.totalFiles == 0 ? '' : '. But, you make ' + config.subFiles + ' files limit for each subFolder!'));
                    return [4 /*yield*/, fs.readdir(config.path)];
                case 14:
                    filesNameArr = _b.sent();
                    if (config.orderBy == 'random')
                        filesNameArr.sort(random).sort(random).sort(random).sort(random).sort(random).sort(random); //wast of power OR very random? :)
                    else if (config.orderBy == 'name')
                        filesNameArr.sort(AlphaIntSort);
                    else if (config.orderBy == 'name desc')
                        filesNameArr.sort(AlphaIntSort).reverse();
                    return [4 /*yield*/, Promise.all(filesNameArr.map(function (f) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = { name: f };
                                        return [4 /*yield*/, fs.stat(config.path + '\\' + f)];
                                    case 1: return [2 /*return*/, (_a.size = (_b.sent()).size, _a)];
                                }
                            });
                        }); }))];
                case 15:
                    allFiles = _b.sent();
                    console.table(allFiles);
                    remainFiles = info.totalFiles;
                    i = 0;
                    _b.label = 16;
                case 16:
                    if (!(remainFiles > 0)) return [3 /*break*/, 23];
                    subFolderPath = "".concat(config.path, "\\").concat(info.mainFolderName, " ").concat(++info.totalFolders, " of"); //we don't know how many folders will created so we leave after '...of' blank. Then will rename it.
                    return [4 /*yield*/, fs.mkdir(subFolderPath)];
                case 17:
                    _b.sent();
                    j = 0;
                    _b.label = 18;
                case 18: return [4 /*yield*/, isSubRemind(j, subFolderPath, remainFiles)];
                case 19:
                    if (!_b.sent()) return [3 /*break*/, 22];
                    return [4 /*yield*/, fs.rename(config.path + '\\' + allFiles[i].name, subFolderPath + '\\' + allFiles[i].name)];
                case 20:
                    _b.sent();
                    _b.label = 21;
                case 21:
                    i++, j++, remainFiles--;
                    return [3 /*break*/, 18];
                case 22: return [3 /*break*/, 16];
                case 23:
                    j = 1;
                    _b.label = 24;
                case 24:
                    if (!(j <= info.totalFolders)) return [3 /*break*/, 27];
                    return [4 /*yield*/, fs.rename("".concat(config.path, "\\").concat(info.mainFolderName, " ").concat(j, " of"), "".concat(config.path, "\\").concat(info.mainFolderName, " ").concat(j, " of ").concat(info.totalFolders))];
                case 25:
                    _b.sent();
                    _b.label = 26;
                case 26:
                    j++;
                    return [3 /*break*/, 24];
                case 27:
                    print(info);
                    return [2 /*return*/];
            }
        });
    });
}
function print(info) {
    console.table({
        'In Folder': '.../' + info.mainFolderName,
        'Founded Files': info.totalFiles,
        'Made Folders': info.totalFolders
    });
}
/**
 * @param  {number} filesInSub
 * @param  {string} subFolderPath
 * @param  {number} remainFiles
 * @returns {boolean} true if subfolder not filled or any config options have not violated. false otherwise.
 */
function isSubRemind(filesInSub, subFolderPath, remainFiles) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var subSize, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (remainFiles <= 0)
                        return [2 /*return*/, resolve(false)];
                    if (config.subFiles != 0)
                        if (filesInSub >= config.subFiles)
                            return [2 /*return*/, resolve(false)];
                    if (!(config.subSize != 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, dirSize(subFolderPath)];
                case 1:
                    subSize = _a.sent();
                    if (subSize >= config.subSize)
                        return [2 /*return*/, resolve(false)];
                    _a.label = 2;
                case 2: return [2 /*return*/, resolve(true)];
                case 3:
                    e_2 = _a.sent();
                    throw new Error('Throws from isSubRemind() function' + e_2);
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
/**
 *
 * @param path path of the folder
 * @returns {Promise<number>} of total size of the folder.
 */
function dirSize(path) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var dir, size, i, _a, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fs.readdir(path)];
                case 1:
                    dir = _b.sent();
                    size = 0;
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < dir.length)) return [3 /*break*/, 5];
                    _a = size;
                    return [4 /*yield*/, fs.stat(path + '\\' + dir[i])];
                case 3:
                    size = _a + (_b.sent()).size;
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, resolve(size)];
                case 6:
                    e_3 = _b.sent();
                    throw new Error('Throws from dirSize() function' + e_3);
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
/**
 * used as parameter on build-in sort function for arrays
 */
function AlphaIntSort(a, b) {
    a = a.substring(0, a.lastIndexOf('.'));
    b = b.substring(0, b.lastIndexOf('.'));
    if (a.match(/(\d+)/g) && b.match(/(\d+)/g))
        if (a.substring(0, a.indexOf(a.match(/(\d+)/g)[0])) == b.substring(0, b.indexOf(b.match(/(\d+)/g)[0])))
            return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
    return a.toLowerCase() > b.toLowerCase() ? 1 : (a.toLowerCase() < b.toLowerCase()) ? -1 : 0;
}
/**
 * used as parameter on build-in sort function for arrays
 */
function random(a, b) {
    return 0.5 - Math.random();
}
/**
 * check if there is Invalid configuration entered!
 */
function checkValidConfig() {
    var e = 'Invalid Configuration!';
    if (config.subFiles < 0)
        throw new Error(e + ' subFiles should be 0 or bigger.');
    if (config.subSize < 0)
        throw new Error(e + ' subSize should be 0 or bigger.');
    if (config.subSize == 0 && config.subFiles == 0)
        throw new Error(e + ' There should be at least one limitation to stop adding files into subfolder. Found none.');
}
function test() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // if (a.match(/[0-9]/) && b.match(/[0-9]/))
            //    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
            // var arr=['ab','a','q','w','E','r','t','y','u','i','o','p','A','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','1','10','2','99','9','a9','a10',]
            console.log('main() executed');
            return [2 /*return*/];
        });
    });
}
/**
 * make two files as cache files 1-cacheTs.txt 2-cacheJs.txt
 * 1- will save typescript file txt 2- js
 * todo: to prevent saving all files as txt we can hash them to save just 256-bit if file change then hash will change. So, same functionality but less space
 * if all files not found return true and make those files by copy 1-index.ts and 2-index.js
 * if all files exist then:
 *    if cacheTs don't equal to index.ts and cacheJs equal to index.js then user doesn't compile TS return false;
 *    if cacheTs don't equal to index.ts and cacheJs don't equal to index.js then user compile TS save them and return true;
 *    To prevent malicious usage else return false with unknown error;
 * @returns {Boolean|string} string for message error boolean for true.
 */
var crypto = require("crypto");
function isTypescriptCompiled() {
    return __awaiter(this, void 0, void 0, function () {
        var indexTs, indexJs, cacheTs, cacheJs, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile('./index.ts', 'utf8')];
                case 1:
                    indexTs = _a.sent();
                    return [4 /*yield*/, fs.readFile('./index.js', 'utf8')];
                case 2:
                    indexJs = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, fs.readFile('./cacheTs.txt', 'utf8')];
                case 4:
                    cacheTs = _a.sent();
                    return [4 /*yield*/, fs.readFile('./cacheJs.txt', 'utf8')];
                case 5:
                    cacheJs = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_4 = _a.sent();
                    cacheTs = null;
                    cacheJs = null;
                    return [3 /*break*/, 7];
                case 7:
                    indexTs = crypto
                        .createHash('sha256')
                        .update(indexTs)
                        .digest("hex"); //'base64' | 'hex';
                    indexJs = crypto
                        .createHash('sha256')
                        .update(indexJs)
                        .digest("hex"); //'base64' | 'hex';
                    if (cacheJs === null && cacheTs === null)
                        return [2 /*return*/, true];
                    if (!(typeof cacheJs === 'string' && typeof cacheTs === 'string' &&
                        (cacheTs !== indexTs && cacheJs === indexJs))) return [3 /*break*/, 8];
                    return [2 /*return*/, false];
                case 8: return [4 /*yield*/, fs.writeFile('./cacheTs.txt', indexTs)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, fs.writeFile('./cacheJs.txt', indexJs)];
                case 10:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
/**
 * wrapper that execute main(), to get rid of try catch
 */
var wrapper = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var compiled, _a, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                console.time('process Time');
                return [4 /*yield*/, isTypescriptCompiled()];
            case 1:
                compiled = _b.sent();
                if (typeof compiled !== 'boolean' || compiled === false)
                    throw new Error("Compile TypeScript File Before Run JavaScript! ".concat(compiled || ''));
                if (!false) return [3 /*break*/, 3];
                return [4 /*yield*/, main()];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, test()];
            case 4:
                _a = _b.sent();
                _b.label = 5;
            case 5:
                _a;
                console.timeEnd('process Time');
                return [3 /*break*/, 7];
            case 6:
                e_5 = _b.sent();
                console.timeEnd('process Time');
                console.log(/*'wrapper catch',*/ e_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
wrapper();
