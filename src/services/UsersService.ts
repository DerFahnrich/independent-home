import Country from "../models/countryModel";
import AbbreviatedExtension from "../models/extensionModel";
import UserRight from "../models/rightsModel";
import NetworkService from "./NetworkService";

const URL = "/api/internal";

class UsersService {
  listAbbreviatedExtensions = async (): Promise<AbbreviatedExtension[]> => {
    return NetworkService.sendGet(URL + "/massedit/abbreviatedExtensions").then(
      (extensions) => extensions.json()
    );
  };
  listUserRights = async (
    extensions: number[],
    right: string[]
  ): Promise<UserRight[]> => {
    return NetworkService.sendGet(
      URL + "/v2/userrights?extensions=" + extensions + "&definitions=" + right
    ).then((rights) => rights.json());
  };
  listCountries = async (): Promise<Country[]> => {
    return NetworkService.sendGet(URL + "/countries").then((countries) =>
      countries.json()
    );
  };
}

export default new UsersService();
