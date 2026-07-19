"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VerificationEmail;
const React = require("react");
function VerificationEmail({ url }) {
    return (React.createElement("div", null,
        React.createElement("h1", null, "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C!"),
        React.createElement("p", null, "\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0432\u0441\u0435\u043C \u043D\u0435\u043C\u043D\u043E\u0433\u043E, \u0412\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0441\u0432\u043E\u044E \u044D\u043B. \u043F\u043E\u0447\u0442\u0443."),
        React.createElement("a", { href: url }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C Email"),
        React.createElement("p", null, "\u0438\u043B\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432 \u0432\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440"),
        React.createElement("a", { href: url, target: "_blank", style: {
                color: '#A981DC'
            } }, url)));
}
//# sourceMappingURL=confirmation.email.js.map