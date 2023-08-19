import React, { useContext, useState } from 'react';
import './App.scss';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Loading from './components/Loading';
import { components } from "@octokit/openapi-types/types";
import User from './components/User';
import octokit from './octokit';
import NotificationContext from './contexts/NotificationContext';

function App() {
    const { displayMessage } = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<components["schemas"]["user-search-result-item"][]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage('');
        setSearch(e.target.value);
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSearch();
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await octokit.rest.search.users({
                q: `${encodeURIComponent(search)} in:login type:user repos:>0`,
                per_page: 5,
            });
            setUsers(response.data.items);
            if (response.data.total_count === 0) {
                setMessage(`No result found for "${search}"`);
            }
        } catch (e:any) {
            displayMessage(e?.message || 'Unknown error occured');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container fluid>
            <Row style={{ justifyContent: 'center' }}>
                <Col xl={4} xxl={3}>

                    <Form.Group style={{ marginTop: '20px', marginBottom: '10px' }}>
                        <Form.Control data-testid='search-form' type="text" placeholder='Enter username' disabled={loading} value={search} onChange={handleChange} onKeyUp={handleKeyUp} />
                    </Form.Group>

                    <Button data-testid='search-button' style={{ width: '100%' }} disabled={loading} onClick={handleSearch}>
                        <Loading visible={loading} /> Search
                    </Button>

                    {
                        Boolean(message) && (
                            <p className='text-muted text-center' style={{ marginTop: '10px' }}>{message}</p>
                        )
                    }

                    {
                        users.map((user, index) => <User key={user.login} data={user} style={{ marginBottom: '10px', marginTop: '10px' }} />)
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default App;
