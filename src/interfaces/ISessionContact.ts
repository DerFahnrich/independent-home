export default interface ISessionContact {
    chatUserKey: string;
    extension: IExtension;
}

interface IExtension {
    contact: IContact;
    key: string;
}

interface IContact {
    firstName: string;
    lastName: string;
}
