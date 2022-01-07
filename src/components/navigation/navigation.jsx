import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    textChange
} from './navigationSlice';
import './navigation.css';

export const Navigation = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('')

    return (
        <ul>
            <li><a className='active' href="/dashboard" id='overview'>概览</a></li>
            <li><a href="/monitor" id='monitor'>监控</a></li>
            <input id='search-button' type='submit' value='搜索' onClick={() => dispatch(textChange(searchInput))} />
            <input id='search-input' type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
        </ul>
    );
}