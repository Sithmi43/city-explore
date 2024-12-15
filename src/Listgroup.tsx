import React, { useState, useEffect } from 'react';
interface City {
    id: number;
    name: string;
    description: string;
}
const ListGroup: React.FC = () => {
    const defaultCities: City[] = [
        { id: 1, name: 'Colombo', description: 'The bustling commercial capital of Sri Lanka.' },
        { id: 2, name: 'Kandy', description: 'Home to the sacred Temple of the Tooth and lush hills.' },
        { id: 3, name: 'Galle', description: 'A historic coastal city with a famous Dutch Fort.' },
        { id: 4, name: 'Jaffna', description: 'A vibrant cultural hub in the northern part of the island.' },
    ];
    const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    const initialCities = savedCities.length > 0 ? savedCities : defaultCities;
    const [cities, setCities] = useState<City[]>(initialCities);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCityName, setNewCityName] = useState('');
    const [newCityDescription, setNewCityDescription] = useState('');
    const [error, setError] = useState('');
    // Persist cities to localStorage whenever the list updates
    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(cities));
    }, [cities]);
    // Filter cities based on the search query
    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Handle adding a new city
    const handleAddCity = () => {
        if (!newCityName.trim() || !newCityDescription.trim()) {
            setError('Both city name and description are required.');
            return;
        }
        // Clear error message if inputs are valid
        setError('');
        const newCity: City = {
            id: cities.length > 0 ? Math.max(...cities.map((city) => city.id)) + 1 : 1,
            name: newCityName.trim(),
            description: newCityDescription.trim(),
        };
        setCities([...cities, newCity]);
        setNewCityName('');
        setNewCityDescription('');
    };
    // Handle resetting the city list
    const handleReset = () => {
        setCities(defaultCities);
        setSearchQuery('');
        setNewCityName('');
        setNewCityDescription('');
        setError('');
    };
    return (
        <div>
            <h1>City Explorer</h1>
            {/* Search Input */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a city"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {/* City List */}
            <h3>Available Cities</h3>
            <ul className="list-group mb-4">
                {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                        <li key={city.id} className="list-group-item">
                            <strong>{city.name}</strong>
                            <br />
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-muted">No cities found</li>
                )}
            </ul>
            {/* Add a New City Form */}
            <h3>Add a New City</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="City Name"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="City Description"
                    value={newCityDescription}
                    onChange={(e) => setNewCityDescription(e.target.value)}
                />
                <button className="btn btn-success me-2" onClick={handleAddCity}>
                    Add City
                </button>
                <button className="btn btn-danger" onClick={handleReset}>
                    Reset
                </button>
            </div>
            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};
export default ListGroup;
