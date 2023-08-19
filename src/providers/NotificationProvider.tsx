import React, { useState } from 'react';
import NotificationContext from '../contexts/NotificationContext';
import Notification from '../components/Notification';

type NotificationProviderProps = {
    children?: any
}

export default function NotificationProvider({ children }: NotificationProviderProps) 
{
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    const displayMessage = (message: string) => {
        setMessage(message);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            setMessage('');
        }, 3000);
    }

    return (
        <NotificationContext.Provider value={{ displayMessage }}>
            {children}
            <Notification visible={visible}>
                {message}
            </Notification>
        </NotificationContext.Provider>
    )
}