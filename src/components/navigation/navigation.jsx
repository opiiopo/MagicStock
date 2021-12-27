import React from 'react';
import './navigation.css';

export const Navigation = () => {
    return (
        <ul>
            <li><a className="active" href="/stockboard">概览</a></li>
            <li><a href="/trading">量比</a></li>
            <li><a href="/rise">涨幅</a></li>
            <li><a href="/number">次数</a></li>
        </ul>
    );
}