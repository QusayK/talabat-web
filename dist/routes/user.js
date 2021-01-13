"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../controllers/user"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(auth_1.default);
router.get('/', user_1.default.getAll);
router.get('/:id', user_1.default.getSingle);
router.put('/:id', user_1.default.put);
router.delete('/:id', user_1.default._delete);
exports.default = router;
//# sourceMappingURL=user.js.map