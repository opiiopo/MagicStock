import React, { useEffect, useState } from 'react';
import './search_bar.css';

export const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('')
    return (
        <div id={'search-container'}>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
            <input type='submit' value='提交' />
        </div>
    );
}