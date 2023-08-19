import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

type CollapsibleProps = {
    children: any,
    onOpen?: Function,
    style?: object,
    title: string,
}

export default function Collapsible({ children, onOpen = () => {}, style = {}, title }: CollapsibleProps) {
    const [open, setOpen] = useState(false);
    const icon = open ? 'up': 'down';
    const toggleState = () => {
        if (open) {
            setOpen(false);
            return;
        }
        setOpen(true);
        onOpen();
    };

    return (
        <Card className={open ? 'collapsible open' : 'collapsible'} style={style}>
            <Card.Header onClick={toggleState}>
                {title}
                <i className={`fa-solid fa-angle-${icon}`} style={{ float: 'right' }} />
            </Card.Header>
            <Card.Body>{children}</Card.Body>
        </Card>
    )
}