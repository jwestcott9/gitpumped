import React from "react";
import "./style.scss"

function tableData(props){

return(
    <td className = "tableData">{props.children}</td>
)


}
export default tableData;