import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    textChange,
    selectText
} from './searchSlice';
import './search_bar.css';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('')

    return (
        <div id={'search-container'}>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
            <input type='submit' value='提交' onClick={() => dispatch(textChange(searchInput))}/>
        </div>
    );
}