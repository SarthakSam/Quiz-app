import { createContext, useContext, useState } from "react";

import { INotification } from '../quiz.types';

const initialState = {
    notifications: [] as INotification[],
    showNotification: (param: INotification) => { },
    deleteNotification: (id: string) => {}
}

const NotificationsContext = createContext(initialState);

export function useNotifications() {
    return useContext(NotificationsContext);
}

export function NotificationsProvider({children}: { children: JSX.Element }) {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const showNotification = ({message, type, id = (new Date()).toISOString()}: INotification) => {
        setNotifications(notifications => [...notifications, {
            id,
            message,
            type
        }])
    }
    
    const deleteNotification = (id: string) => {
        setNotifications(notifications => notifications.filter( notification => id !== notification.id ));
    }

    return (
    <NotificationsContext.Provider value = {{ notifications, showNotification, deleteNotification }}>
        {children}
    </NotificationsContext.Provider>
    );
}