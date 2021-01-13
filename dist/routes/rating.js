"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rating_1 = __importDefault(require("../controllers/rating"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(auth_1.default);
router.get('/', rating_1.default.getAll);
router.get('/:id', rating_1.default.getSingle);
router.post('/', rating_1.default.post);
router.put('/:id', rating_1.default.put);
router.delete('/:id', rating_1.default._delete);
exports.default = router;
//# sourceMappingURL=rating.js.map