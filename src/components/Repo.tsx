import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import { components } from "@octokit/openapi-types/types";

type RepoProps = {
    data: components["schemas"]["repo-search-result-item"],
}

export default function Repo({ data }: RepoProps) {
    const linkRef = useRef<HTMLAnchorElement|null>(null);
    const handleParentClick = () => {
        linkRef.current?.click();  
    };
    return (
        <Card className='repo' style={{ marginBottom: '10px' }} onClick={handleParentClick} title="Open in new tab">
            <Card.Body style={{ padding: '7.5px' }}>
                <a href={data.html_url} target='_blank' rel='noreferrer' className='repo-clickable' ref={linkRef}>
                    <b>{data.name}</b><br />
                    <p className='text-muted' style={{ fontSize: '12px' }}>{data.description}</p>
                    <div className='text-muted' style={{ position: 'absolute', right: '7.5px', bottom: '5px', fontSize: '12px' }}>
                        {data.stargazers_count} <i className="fa-solid fa-star fa-xs" />
                    </div>
                </a>
            </Card.Body>
        </Card>
    )
}