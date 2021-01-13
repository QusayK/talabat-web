"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../controllers/restaurant"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const adminAuth_1 = __importDefault(require("../middlewares/adminAuth"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const express_1 = __importDefault(require("express"));
const _upload = upload_1.default();
const router = express_1.default.Router();
router.use(auth_1.default);
router.get('/', restaurant_1.default.getAll);
router.get('/:id', restaurant_1.default.getSingle);
router.post('/', adminAuth_1.default, _upload.single('image'), restaurant_1.default.post);
router.put('/:id', adminAuth_1.default, _upload.single('image'), restaurant_1.default.put);
router.delete('/:id', adminAuth_1.default, restaurant_1.default._delete);
exports.default = router;
//# sourceMappingURL=restaurant.js.map