import { createContext } from "react";

type DisplayMessageSignature = {
    (message: string): void
}

type NotificationContextType = {
    displayMessage: DisplayMessageSignature
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export default NotificationContext;