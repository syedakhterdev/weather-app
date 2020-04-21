import React, {useState} from "react";

const Search = (props) => {
    const [location, setLocation] = useState('');
    const handleSubmit = () => {
        props.handleUpdateLocation(location);
        setLocation('');
    }
    return (
    <div className="searchContainre">
        <input type="text" className="searchField" placeholder="Enter City Name" value={location}
        onChange={e => setLocation(e.target.value)} />
        <button className="searchBtn" onClick={handleSubmit}>Search</button>
    </div>
    );
}

export default Search;