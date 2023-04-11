import React from 'react'

export default function PaymentListing() {
  return (
    <>
    <div class="container-fluid">
        <div class="row">
            {/* <div class="col">
                <span class="para1">Dashboard / Student</span>
            </div> */}
        </div>
            <div class="col mt-2 d-flex justify-content-between">
                <h1 class="d-inline-block">Orders</h1>
                {/* <input type="search" placeholder='Search here' class="search_box mt-1 border"></input> */}
            </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
            <div class="table-responsive">
            <table class="table my-3 border">
                <thead class="thead-light">
                <tr>
                    <th scope="col">OrderID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Subscription</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">View</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Order_Ldfdyd5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Akash</td>
                    <td>Subject</td>
                    <td>Physics</td>
                    <td>1000</td>
                    <td>Success</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Ldfdyd5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Physics</td>
                    <td>1000</td>
                    <td>Success</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Fgf565d5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>150</td>
                    <td>Test</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Tfg45f45dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Ashok</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>100</td>
                    <td>Test</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Fgf565d5dfg8sfg5</td>
                    <td>mar 20,2023</td>
                    <td>Ankush</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>100</td>
                    <td>Test</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Fgf565d5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>15</td>
                    <td>Alpha_Testing</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_R54f5gf5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>250</td>
                    <td>Alpha_Testing</td>
                    <td>...</td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
