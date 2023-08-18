import React from 'react';

type HelpProps = {
    children?: any
}

export default function Help({ children }: HelpProps) {
    return (
        <span className='text-muted'>{children}</span>
    )
}