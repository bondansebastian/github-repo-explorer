import React from 'react';

type LoadingProps = {
    visible: boolean;
}

export default function Loading({ visible = true }: LoadingProps) {
    if (!visible) return null;
    return (
        <i className="fa-solid fa-circle-notch fa-spin" />
    )
}