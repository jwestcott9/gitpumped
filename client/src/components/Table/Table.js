import React from "react";
import "./style.scss";
import TableData from "./tableData"

function Table (props ){
    return(
       
            <tr>
                <TableData>{props.name}</TableData>
                <TableData>{props.amount}</TableData>
                <TableData>{props.image}</TableData>
            </tr>
    
    )
}
export default Table;
