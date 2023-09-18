import FeatureProduct from "../models/featureModel";
import NetworkService from "./NetworkService";

const URL = "/api/internal/massedit";

class MassEditService {
  getFeatureProducts = async (): Promise<FeatureProduct[]> => {
    return NetworkService.sendGet(
      URL + "/featureproducts?extensionType=extensions"
    ).then((featureProducts) => featureProducts.json());
  };
}

export default new MassEditService();
