import React, { useState } from 'react';
import './App.scss';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Loading from './components/Loading';
import { components } from "@octokit/openapi-types/types";
import User from './components/User';
import octokit from './octokit';

function App() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<components["schemas"]["user-search-result-item"][]>([]);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSearch();
      };

    const handleSearch = async () => {
        setLoading(true);
        const response = await octokit.rest.search.users({
            q: `${encodeURIComponent(search)} in:name type:user`,
            per_page: 5,
        });
        setUsers(response.data.items);
        setLoading(false);
    }

    return (
        <Container fluid>
            <Row style={{ justifyContent: 'center' }}>
                <Col xl={4} xxl={3}>

                    <Form.Group style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <Form.Control data-testid='search-form' type="text" placeholder='Enter username' disabled={loading} value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleKeyUp} />
                    </Form.Group>

                    <Button data-testid='search-button' style={{ width: '100%' }} disabled={loading} onClick={handleSearch}>
                        <Loading visible={loading} /> Search
                    </Button>

                    {
                        users.map((user, index) => <User key={user.login} data={user} style={{ marginBottom: '10px', marginTop: '10px' }} />)
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default App;
