import React, { useEffect, useState } from 'react';
import './navigation.css';

export const Navigation = () => {
    const [searchInput, setSearchInput] = useState('')
    return (
        <ul>
            <li><a className="active" href="/dashboard">概览</a></li>
            <li><a href="/monitor">监控</a></li>
            <input id='search-button' type='submit' value='搜索' />
            <input id='search-input' type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
        </ul>
    );
}