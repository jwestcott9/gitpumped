import React from "react";
import "./style.scss";
import TableData from "./tableData"

function Table (props){
    console.log(props)
    return(
       
            <tr>
                <TableData>{props.name}</TableData>
                <TableData>{props.summary}</TableData>
                <TableData>{props.image}</TableData>
            </tr>
    
    )
}
export default Table;
