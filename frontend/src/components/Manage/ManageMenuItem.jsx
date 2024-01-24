import React from 'react';
import { useMainDashContext } from '../../context/AppContext';

const ManageMenuItem = (props) => {
    const { managetab, setManagetab } = useMainDashContext();
    const handleTabClick = (tab) => {
        setManagetab(tab);
    };
    const { tab } = props;
    return (
        <>
            <button className={`${managetab === tab ? 'border-b-2 border-white text-white' : 'text-zinc-200/80'} hover:text-white transition-all hover:border-b-2 hover:border-white py-1.5 px-4`} onClick={() => handleTabClick(tab)}>{tab}</button>
        </>
    )
}

export default ManageMenuItem