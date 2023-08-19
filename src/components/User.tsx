import React, { useState } from 'react';
import { components } from "@octokit/openapi-types/types";
import Collapsible from './Collapsible';
import octokit from '../octokit';
import Loading from './Loading';
import { Button } from 'react-bootstrap';
import Repo from './Repo';

type UserProps = {
    data: components["schemas"]["user-search-result-item"],
    style?: object,
}

export default function Help({ data, style = {} }: UserProps) 
{
    const [ hasNext, setHasNext ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ repos, setRepos ] = useState<components["schemas"]["repo-search-result-item"][]>([]);

    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        const response = await octokit.rest.search.repos({
            q: `user:${data.login}`,
            per_page: 10,
            page,
        });
        const items = [
            ...repos,
            ...response.data.items
        ];
        if (items.length >= response.data.total_count) {
            setHasNext(false);
        }
        setRepos(items);
        setPage(page + 1);
        setLoading(false);
    }

    const handleOpen = () => {
        if (repos.length > 0) return;
        fetchData();
    }

    return (
        <Collapsible title={data.login} style={style} onOpen={handleOpen}>
            {
                repos.map((repo, index) => (
                    <Repo key={repo.id} data={repo} />
                ))
            }
            <div style={{ textAlign: 'center' }}>
                {
                    (!loading && hasNext) && (
                        <Button variant='link' onClick={fetchData} disabled={loading}>
                            See more <i className='fa-solid fa-angles-down fa-2xs' />
                        </Button>
                    )
                }
                <Loading text='Loading data' visible={loading} />
            </div>
        </Collapsible>
    )
}