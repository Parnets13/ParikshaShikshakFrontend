import React from 'react'
import Table from 'react-bootstrap/Table';

const BluePrint2 = () => {
    return (
        <div>

            <div style={{ fontFamily:"sans-serif"}}>
                <div className='blueprint2-container' style={{ padding: "20px 50px" }}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div><b>Time : 3 hrs.</b></div>
                        <div><b>BLUE PRINT</b></div>
                        <div><b>Marks : 100</b></div>
                    </div>

                    <div>
                    <Table responsive bordered style={{border:"1px solid"}} size='sm'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                {/* {Array.from({ length: 23 }).map((_, index) => (
                                    <th key={index}>Table heading</th>
                                ))} */}
                                <th>content</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>comprehension</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>expression</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>appreciation</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>total question</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>total marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                {/* {Array.from({ length: 23 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))} */}
                                <td></td>
                                <td>M.C</td>
                                <td>V.S.A</td>
                                <td>S.A</td>
                                <td>L.A</td>
                                <td>L.A</td>
                                <td>L.A</td>
                                <td>M.C</td>
                                <td>V.S.A</td>
                                <td>S.A</td>
                                <td>L.A</td>
                                <td>L.A</td>
                                <td>L.A</td>
                                <td>M.C</td>
                                <td>V.S.A</td>
                                <td>S.A</td>
                                <td>L.A</td>
                                <td>L.A</td>
                                <td>L.A</td>
                               <td></td>
                               <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                {/* {Array.from({ length: 23 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))} */}
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>                            
                            </tr>
                            <tr>
                                <td>3</td>
                                {/* {Array.from({ length: 23 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))} */}
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                {/* {Array.from({ length: 23 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))} */}
                                 <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                {/* {Array.from({ length: 23 }).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))} */}
                                 <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                            <td>7</td>
                            <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>14</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>15</td>
                                <td>lesson name</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BluePrint2
