import React from 'react';

interface SidebarItem {
    section: string,
    first?: boolean
}

function SidebarItem(props:any) {
    if (props.first == true) {
        return(
            <div className = "sidebar-item sidebar-first">{props.section}</div>
        )
    }
    else {
        return(
            <div className = "sidebar-item ">{props.section}</div>
        )
    }
}

export default SidebarItem;
