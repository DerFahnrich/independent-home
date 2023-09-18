import NetworkService from "./networkService";
import FeatureProduct from "@models/featureModel";

const URL = "/api/internal/massedit";

class MassEditService {
    getFeatureProducts = async (): Promise<FeatureProduct[]> => {
        return NetworkService.sendGet(URL + '/featureproducts?extensionType=extensions').then(featureProducts => featureProducts.json());
    }
}

export default new MassEditService();
