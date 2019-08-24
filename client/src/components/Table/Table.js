import React from "react";
import "./style.scss";
import TableData from "./tableData"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
function Table (props) {
  
  
    return(
       
            <tr>
                <TableData>{props.name}</TableData>
                {props.summary?
                <TableData>{ReactHtmlParser(props.summary)}</TableData>
                :
                <TableData>{props.amount}</TableData>}
                <TableData>{props.image}</TableData>
            </tr>
    
    )
}
export default Table;
