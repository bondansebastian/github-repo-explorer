import React from 'react';

type LoadingProps = {
    text?: string|undefined;
    visible?: boolean;
}

export default function Loading({ text = undefined, visible = true }: LoadingProps) {
    if (!visible) return null;
    return (
        <span>
            <i className="fa-solid fa-circle-notch fa-spin" /> { text }
        </span>
    )
}