import NetworkService from "./networkService";


class AppService {

    getAllAvailableApps = async () => {
        return NetworkService.sendGet("/api/internal/appstore").then(apps => apps.json());
    }

}
export default new AppService()
