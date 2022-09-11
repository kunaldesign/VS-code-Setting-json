"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PackageJsonController_1 = require("./controllers/PackageJsonController");
const ConfigController_1 = require("./controllers/ConfigController");
exports.default = (router) => {
    router.get("/package-json-files", [
        PackageJsonController_1.PackageJsonController,
        "getPackageJSONFiles",
    ]);
    router.post("/update-confirmation", [
        PackageJsonController_1.PackageJsonController,
        "showUpdateConfirmation",
    ]);
    // router.post("/depcheck", [PackageJsonController, "runDepCheck"]);
    router.post("/installed", [PackageJsonController_1.PackageJsonController, "getInstalledPackages"]);
    router.post("/install", [PackageJsonController_1.PackageJsonController, "installPackages"]);
    router.post("/remove", [PackageJsonController_1.PackageJsonController, "removePackage"]);
    router.post("/swap", [PackageJsonController_1.PackageJsonController, "swapPackageType"]);
    router.post("/change-version", [PackageJsonController_1.PackageJsonController, "changeVersion"]);
    router.post("/update", [PackageJsonController_1.PackageJsonController, "updatePackages"]);
    router.get("/config", [ConfigController_1.ConfigController, "getConfig"]);
};
//# sourceMappingURL=routes.js.map