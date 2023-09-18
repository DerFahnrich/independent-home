import NetworkService from "./networkService";

const URL = "/api/internal/flow";

class FlowService {
    getPbxLicense = async () => {
        return NetworkService.sendGet(URL + '/pbx/license').then(license => license.json());
    }
}

export default new FlowService();
