export default interface appStoreEntry {
    DTOSubtype: string;
    availableQueues : any;
    company: string;
    icon: string;
    images: Array<string>
    installationInstructions: string;
    instance: any;
    isBeta: boolean;
    key: string;
    longDescription: string;
    name: string;
    password: string;
    providerType: string;
    shortDescription: string;
    state: string;
    webServiceUsername: string;
}
