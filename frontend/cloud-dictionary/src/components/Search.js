import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                'https://<api-id>.execute-api.<region>.amazonaws.com/prod/terms',
                { params: { query } }
            );
            setResults(response.data);
        } catch (error) {
            console.error('Error searching terms:', error);
        }
    };
    
    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cloud terms..."
                className="border p-2 rounded w-full"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Search
            </button>
            <ul className="mt-4">
                {results.map((item) => (
                    <li key={item.term} className="border-b py-2">
                        <strong>{item.term}</strong>: {item.definition}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;