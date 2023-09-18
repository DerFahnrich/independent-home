import { NumberManagementMetaData } from "../models/numberManagementMetaDataModel";
import NetworkService from "./NetworkService";

const URL = "/api/internal/numbers";
class NumbersService {
  getDashboardMetaData = async (): Promise<NumberManagementMetaData> => {
    return NetworkService.sendGet(URL + "/dashboard-metadata").then(
      (numberManagementMetaData) => numberManagementMetaData.json()
    );
  };
}

export default new NumbersService();
