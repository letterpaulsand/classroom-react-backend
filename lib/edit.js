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
import { join, resolve } from 'path';
import { Low, JSONFile } from 'lowdb';
import { v4 as uuidv4 } from 'uuid';
import empty from "is-empty";
import status from "./status.js";
function edit(data, time) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var file, adapter, db, typeAllData, myTypeProfileArray, myTypeProfile, myTypeProfileIndex;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!data.message || !data.name || !data.password) {
                        return [2 /*return*/, status(401, 'parameter uncompleted')];
                    }
                    file = join(resolve('.'), 'db.json');
                    adapter = new JSONFile(file);
                    db = new Low(adapter);
                    return [4 /*yield*/, db.read()];
                case 1:
                    _d.sent();
                    typeAllData = (_a = db.data) === null || _a === void 0 ? void 0 : _a.type;
                    myTypeProfileArray = typeAllData === null || typeAllData === void 0 ? void 0 : typeAllData.filter(function (item) { return item.name === data.name; });
                    if (empty(myTypeProfileArray) || myTypeProfileArray === undefined) {
                        // name repeat
                        return [2 /*return*/, status(404, 'user not found')];
                    }
                    myTypeProfile = myTypeProfileArray[0];
                    if (myTypeProfile.password !== data.password) {
                        return [2 /*return*/, status(403, 'password incorrect')];
                    }
                    myTypeProfileIndex = typeAllData === null || typeAllData === void 0 ? void 0 : typeAllData.indexOf(myTypeProfile);
                    if (empty(myTypeProfile.date) || myTypeProfile.date[myTypeProfile.date.length - 1] !== time.formatted) {
                        if (myTypeProfileIndex === undefined) {
                            return [2 /*return*/, status(500, 'server error')];
                        }
                        (_b = db.data) === null || _b === void 0 ? void 0 : _b.type[myTypeProfileIndex].date.unshift(time.formatted);
                    }
                    (_c = db.data) === null || _c === void 0 ? void 0 : _c.data.push({
                        email: myTypeProfile.email,
                        message: data.message,
                        name: data.name,
                        date: time.formatted,
                        uuid: uuidv4(),
                        status: true,
                        time: time.normalFormat
                    });
                    db.write();
                    return [2 /*return*/, status(200, 'success')];
            }
        });
    });
}
export default edit;
