"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importStar(require("express"));
// Routes Imports
const auth_1 = __importDefault(require("./routes/auth"));
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const menu_1 = __importDefault(require("./routes/menu"));
const user_1 = __importDefault(require("./routes/user"));
const order_1 = __importDefault(require("./routes/order"));
const rating_1 = __importDefault(require("./routes/rating"));
const PORT = process.env.PORT || 3000;
const app = express_1.default();
app.use(cors_1.default({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "x-auth",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "http://localhost:4200",
}));
app.use(morgan_1.default('common', {
    stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, '../access.log'), { flags: 'a' })
}));
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/restaurant', restaurant_1.default);
app.use('/api/menu', menu_1.default);
app.use('/api/user', user_1.default);
app.use('/api/order', order_1.default);
app.use('/api/rating', rating_1.default);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
//# sourceMappingURL=server.js.map