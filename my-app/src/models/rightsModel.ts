export default interface UserRight {
    key: string;
    userRights: Array<Right>
}
interface Right{
    active: boolean;
    editable: boolean;
    global : boolean;
    group: string;
    key: string;
    name: string;
}
