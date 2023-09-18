import INotification from "@interfaces/INotification";
import ICustomer from "@interfaces/ICustomer";

export default interface IDashboardSlice {
    notifications: INotification[]
    notificationsIsLoading: boolean;
    showNotifications: boolean;
    customer: ICustomer | null;
    customerIsLoading: boolean;
}
