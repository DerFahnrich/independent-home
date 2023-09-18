import NetworkService from "./networkService";

const URL = "/api/internal/terminal";

class TerminalService {
    getTerminals = async () => {
        return NetworkService.sendGet(URL).then(terminals => terminals.json());
    }
}

export default new TerminalService();
