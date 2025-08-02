function ManageTable(){
    return(
        <>
            <div className="manage-table">
                <div className="header-table"></div>
                <div className="body-table"></div>
            </div>
        </>
    )
}

function InsertItem(){
    return(
        <>
            <div className="insert-form">
                <div></div>
            </div>
        </>
    )
}

export default function ManageItem(){
    return  (
        <>
            <div className="manageItem-page">
                <ManageTable/>
                <InsertItem />
            </div>
        </>
    )
}