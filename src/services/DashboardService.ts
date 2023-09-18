import AddOnCount from "../models/addonModel";
import NetworkService from "./NetworkService";

const URL = "/api/internal/dashboard";

class DashboardService {
  getPbxCount = async () => {
    return NetworkService.sendGet(URL + "/pbx").then((pbxCount) =>
      pbxCount.json()
    );
  };

  getLoginStatistics = async () => {
    return NetworkService.sendGet(URL + "/login-statistics").then(
      (statistics) => statistics.json()
    );
  };

  getAddonCount = async (rsfKeys: string[]): Promise<AddOnCount> => {
    const queryParams = "?rsf=" + rsfKeys.join(",");
    return NetworkService.sendGet(URL + "/add-ons" + queryParams).then(
      (addons) => addons.json()
    );
  };

  getLoggedInSession = async () => {
    return NetworkService.sendGet("/api/internal/session").then((session) =>
      session.json()
    );
  };

  getBranding = async () => {
    return NetworkService.sendGet("/api/internal/v2/branding").then(
      (branding) => branding.json()
    );
  };
}

export default new DashboardService();
