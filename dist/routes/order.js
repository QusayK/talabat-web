"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../controllers/order"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(auth_1.default);
router.get('/', order_1.default.getAll);
router.get('/:id', order_1.default.getSingle);
router.post('/', order_1.default.post);
router.put('/:id', order_1.default.put);
router.delete('/:id', order_1.default._delete);
router.delete('/customer/:customer_id', order_1.default.deleteCustomerOrders);
exports.default = router;
//# sourceMappingURL=order.js.map