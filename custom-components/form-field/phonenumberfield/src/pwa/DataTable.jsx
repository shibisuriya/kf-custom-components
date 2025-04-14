import React from 'react'

function DataTable(props) {
    const { value } = props
    return (
        <div>
            <span>{value}</span>&nbsp;    
            <a href={`tel:${value}`}>Call</a>&nbsp;
            <a href={`sms:${value}`}>Text</a>
        </div>
    )
}

export default DataTable