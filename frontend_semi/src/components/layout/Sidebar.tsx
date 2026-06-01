import "./Sidebar.css"

function Sidebar(){
    return (

    <aside className="sidebar">
        {location.pathname === "/lecture/list" && (
                <div className="sidebar-dom sidebar-dom1">
                    특정 URL(/special)에서만 보이는 DOM3
                </div>
            )}

    </aside>
    );
}
export default Sidebar;