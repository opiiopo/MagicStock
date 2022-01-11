import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectText } from '../../components/navigation/navigationSlice';
import './stockboard.css';
import stockData from '../../data/data.json';
import turnover from '../../data/turnover.json';
import yidong from '../../data/yidong.json';
import turnover_5_day from '../../data/turnover_5_day.json';
import chg_5_day from '../../data/chg_5_day.json';

const colorCell = (number) => {
    if (number > 0) {
        return { backgroundColor: "#fc5050" }
    } else if (number < 0) {
        return { backgroundColor: "#15AA6B" }
    } else {
        return { backgroundColor: "#4B4B4B" }
    }
}

const colorYiDong = (number) => {
    if (number >= 1) {
        return 'rocket';
    } else if (number >= 0.5) {
        return 'plane';
    } else {
        return 'normal';
    }
}

export const Stockboard = () => {
    const [data, setData] = useState([]);
    const [markup, setMarkup] = useState({});
    const [sortBy, setSortBy] = useState({});
    const [isMobile, setIsMobile] = useState(false);
    const [lastSort, setLastSort] = useState('出现次数');
    const searchText = useSelector(selectText);

    const markStock = (e) => {
        setMarkup((markup) => {
            const id = e.target.id;
            let newMarkup = {...markup};
            newMarkup[id] = !markup[id];
            return newMarkup;
        })
    }

    const markKeChuang = (code) => {
        if (code.startsWith('300', 0) || code.startsWith('688', 0) || code.startsWith('8', 0)) {
            return 'blue';
        } else {
            return 'normal';
        }
    }

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    const sortByField = (e) => {
        let key = e.target.textContent;
        let newSortBy = {...sortBy};
        newSortBy[key] = !sortBy[key];
        setLastSort(e.target.textContent);
        setSortBy(newSortBy);
    }

    useEffect(() => {
        let sortedData = [...stockData];
        sortedData  = sortedData.sort((a,b) => {
            if(sortBy[lastSort]) {
                return parseFloat(a[lastSort]) - parseFloat(b[lastSort]);
            } else {
                return parseFloat(b[lastSort]) - parseFloat(a[lastSort]);
            }
        });
        setData(sortedData);
    }, [lastSort, sortBy]);

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        let newMarkup = {};
        for (let i = 0; i < stockData.length; i++) {
            let id = stockData[i]['股票代码']
            newMarkup[id] = false;
        }
        setMarkup(newMarkup);

        let newSortBy = {};
        newSortBy['涨跌幅'] = false;
        newSortBy['最新价'] = false;
        newSortBy['换手率'] = false;
        newSortBy['量比'] = false;
        newSortBy['动态市盈率'] = false;
        newSortBy['总市值'] = false;
        newSortBy['今开涨幅'] = false;
        newSortBy['出现次数'] = false;
        newSortBy['概念增加次数'] = false;
        newSortBy['三十秒涨幅'] = false;
        newSortBy['上涨次数'] = false;

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setMarkup((JSON.parse(window.localStorage.getItem('markup'))) || {});
    }, []);

    useEffect(() => {
        window.localStorage.setItem('markup', JSON.stringify(markup));
    }, [markup]);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>代码</th>
                    <th>名称</th>
                    <th className='sortable-field' onClick={sortByField}>涨跌幅</th>
                    <th className='sortable-field' onClick={sortByField}>{isMobile ? '最新' : '最新价'}</th>
                    {!isMobile ? <th>最高</th> : null}
                    {!isMobile ? <th>最低</th> : null}
                    {!isMobile ? <th>今开</th> : null}
                    <th className='sortable-field' onClick={sortByField}>{isMobile ? '换手' : '换手率'}</th>
                    {!isMobile ? <th>五日换手</th> : null}
                    {!isMobile ? <th>五日涨幅</th> : null}
                    <th className='sortable-field' onClick={sortByField}>量比</th>
                    {!isMobile ? <th className='sortable-field' onClick={sortByField}>动态市盈率</th> : null}
                    {!isMobile ? <th>昨日收盘</th> : null}
                    {!isMobile ? <th className='sortable-field' onClick={sortByField}>总市值</th> : null}
                    <th className='sortable-field' onClick={sortByField}>{isMobile ? '今开' : '今开涨幅'}</th>
                    <th className='sortable-field' onClick={sortByField}>出现次数</th>
                    <th className='sortable-field' onClick={sortByField}>概念增加次数</th>
                    {!isMobile ? <th>概念板块</th> : null}
                    <th className='sortable-field' onClick={sortByField}>三十秒涨幅</th>
                    <th className='sortable-field' onClick={sortByField}>上涨次数</th>
                </tr>
                </thead>
                <tbody>
                {data.map(
                    (record, index) => {
                            const textArray = searchText.split(' ');
                            const tr = (
                                <tr key={record.股票代码}>
                                    <td className={markKeChuang(record.股票代码)}>{index}</td>
                                    <td className={markup[record.股票代码] ? 'markup' : 'stock-id'}
                                        id={record.股票代码}
                                        onClick={markStock}>
                                        {record.股票代码}
                                    </td>
                                    <td className={colorYiDong(record.三十秒涨幅)}>{record.股票名称}</td>
                                    <td style={colorCell(record.涨跌幅)}>{record.涨跌幅}</td>
                                    <td className='normal'>{record.最新价}</td>
                                    {!isMobile ? <td className='normal'>{record.最高}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.最低}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.今开}</td> : null}
                                    <td className='normal'>{record.换手率}</td>
                                    {!isMobile ? <td className='normal'><pre>{turnover_5_day[record.股票代码]}</pre></td> : null}
                                    {!isMobile ? <td className='normal'><pre>{chg_5_day[record.股票代码]}</pre></td> : null}
                                    <td className='normal'>{record.量比}</td>
                                    {!isMobile ? <td className='normal'>{record.动态市盈率}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.昨日收盘}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.总市值}</td> : null}
                                    <td style={colorCell(record.今开涨幅)}>{record.今开涨幅}</td>
                                    <td className='normal'>{record.出现次数}</td>
                                    <td className='normal'>{record.概念增加次数}</td>
                                    {!isMobile ? <td className='normal'>{record.概念板块}</td> : null}
                                    {record.hasOwnProperty('三十秒涨幅') ? <td style={colorCell(record.三十秒涨幅)}>{record.三十秒涨幅}</td> :
                                        <td className='normal'>{}</td>}
                                    {record.hasOwnProperty('上涨次数') ? <td className='normal'>{record.上涨次数}</td> :
                                        <td className='normal'>{}</td>}
                                </tr>
                            );

                            if (textArray.includes('出现次数') && record.出现次数 > 0) {
                                return (<tr key={record.股票代码}>
                                    <td className={markKeChuang(record.股票代码)}>{index}</td>
                                    <td className={markup[record.股票代码] ? 'markup' : 'stock-id'}
                                        id={record.股票代码}
                                        onClick={markStock}>
                                        {record.股票代码}
                                    </td>
                                    <td className={colorYiDong(record.三十秒涨幅)}>{record.股票名称}</td>
                                    <td style={colorCell(record.涨跌幅)}>{record.涨跌幅}</td>
                                    <td className='normal'>{record.最新价}</td>
                                    {!isMobile ? <td className='normal'>{record.最高}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.最低}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.今开}</td> : null}
                                    <td className='normal'>{record.换手率}</td>
                                    {!isMobile ? <td className='normal'><pre>{turnover_5_day[record.股票代码]}</pre></td> : null}
                                    {!isMobile ? <td className='normal'><pre>{chg_5_day[record.股票代码]}</pre></td> : null}
                                    <td className='normal'>{record.量比}</td>
                                    {!isMobile ? <td className='normal'>{record.动态市盈率}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.昨日收盘}</td> : null}
                                    {!isMobile ? <td className='normal'>{record.总市值}</td> : null}
                                    <td style={colorCell(record.今开涨幅)}>{record.今开涨幅}</td>
                                    <td className='normal'>{record.出现次数}</td>
                                    <td className='normal'>{record.概念增加次数}</td>
                                    {!isMobile ? <td className='normal'>{record.概念板块.slice(0, record.概念板块.lastIndexOf(')') + 1)}</td> : null}
                                    {record.hasOwnProperty('三十秒涨幅') ? <td style={colorCell(record.三十秒涨幅)}>{record.三十秒涨幅}</td> :
                                        <td className='normal'>{}</td>}
                                    {record.hasOwnProperty('上涨次数') ? <td className='normal'>{record.上涨次数}</td> :
                                        <td className='normal'>{}</td>}
                                </tr>);
                            } else if(textArray.includes('关注') && markup[record.股票代码]) {
                                return tr;
                            } else if (textArray.includes('预测')) {
                                if (record.今开涨幅 > -1 && record.今开涨幅 < 1
                                    && !(record.股票代码.startsWith('300', 0) || record.股票代码.startsWith('688', 0) || record.股票代码.startsWith('8', 0))
                                    && record.出现次数 >= 2 && record.出现次数 <= 4) {
                                    return tr;
                                }
                            } else if(textArray.includes('量价齐升')) {
                                if (record.最新价 > record.昨日收盘 &&record.换手率 > turnover[record.股票代码] && record.今开涨幅 > -1 && record.今开涨幅 < 1
                                    && !(record.股票代码.startsWith('300', 0) || record.股票代码.startsWith('688', 0) || record.股票代码.startsWith('8', 0))) {
                                    return tr;
                                }
                            } else if(textArray.includes('异动') && yidong.includes(record.股票代码)) {
                                return tr;
                            } else {
                                if (textArray.some(subString => record.概念板块.includes(subString))
                                    || textArray.some(subString => record.股票名称.includes(subString))
                                    || textArray.some(subString => record.股票代码.includes(subString))) {
                                    return tr;
                                }
                            }
                            return null;
                    }
                )}
                </tbody>
            </table>
        </div>
    );
}