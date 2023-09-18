import NetworkService from "./NetworkService";

const URL = "/api/internal/licenses";

class LicenseService {
  getLicenses = async () => {
    return NetworkService.sendGet(URL).then((licenses) => licenses.json());
  };

  getLicensesSimple = async () => {
    return NetworkService.sendGet(URL + "/simple").then((licenses) =>
      licenses.json()
    );
  };

  getLicensesDescriptions = async () => {
    return NetworkService.sendGet(URL + "/descriptions").then((descriptions) =>
      descriptions.json()
    );
  };
}

export default new LicenseService();
