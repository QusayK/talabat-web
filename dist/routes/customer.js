"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../controllers/customer"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', customer_1.default.getAll);
router.get('/:id', customer_1.default.getSingle);
router.post('/', customer_1.default.post);
router.put('/:id', customer_1.default.put);
router.delete('/:id', customer_1.default._delete);
exports.default = router;
//# sourceMappingURL=customer.js.map