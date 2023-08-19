import React from 'react';
import { components } from "@octokit/openapi-types/types";
import Collapsible from './Collapsible';

type UserProps = {
    data: components["schemas"]["user-search-result-item"],
    style?: object,
}

export default function Help({ data, style = {} }: UserProps) 
{
    return (
        <Collapsible title={data.login} style={style}>
            
        </Collapsible>
    )
}