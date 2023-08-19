import React from 'react';

type NotificationProps = {
    children?: any;
    visible?: boolean;
}

export default function Notification({ children, visible = true }: NotificationProps) 
{
    return (
        <div className={visible ? 'notification visible' : 'notification'}>
            {children}
        </div>
    )
}