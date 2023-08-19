import React from 'react';
import { Card } from 'react-bootstrap';
import { components } from "@octokit/openapi-types/types";

type RepoProps = {
    data: components["schemas"]["repo-search-result-item"],
}

export default function Repo({ data }: RepoProps)
{
    return (
        <Card style={{ marginBottom: '10px' }}>
            <Card.Body style={{ padding: '7.5px' }}>
                <b>{data.name}</b><br/>
                <p className='text-muted' style={{ fontSize: '12px' }}>{data.description}</p>
                <div className='text-muted' style={{ position: 'absolute', right: '7.5px', bottom: '5px', fontSize: '12px' }}>
                    {data.stargazers_count} <i className="fa-solid fa-star fa-xs" />
                </div>
            </Card.Body>
        </Card>
    )
}