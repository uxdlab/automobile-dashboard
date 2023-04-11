import React from 'react'
import  './Style.css'

export default function UsersListing() {
  return (
    <>
    <div class="container-fluid">
        <div class="row">
            {/* <div class="col">
                <span class="para1">Dashboard / Student</span>
            </div> */}
        </div>
            <div class="col mt-2 d-flex justify-content-between">
                <h1 class="d-inline-block">Users</h1>
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
                    <th scope="col">User Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Akash</td>
                    <td>22</td>
                    <td>Male</td>
                    <td>Akash@gmail.com</td>
                    <td>6598653265</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Rajeev</td>
                    <td>20</td>
                    <td>Male</td>
                    <td>Rajeev@gmail.com</td>
                    <td>9854345659</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Larry</td>
                    <td>26</td>
                    <td>Male</td>
                    <td>Larry@gamil.com</td>
                    <td>9865873265</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>vidhi</td>
                    <td>21</td>
                    <td>Female</td>
                    <td>vidhi@gamil.com</td>
                    <td>9865873265</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Ankush</td>
                    <td>26</td>
                    <td>Male</td>
                    <td>Ankush@gamil.com</td>
                    <td>8986587326</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Rahul</td>
                    <td>24</td>
                    <td>Male</td>
                    <td>Rahul@gamil.com</td>
                    <td>7896573265</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Nisha</td>
                    <td>25</td>
                    <td>Female</td>
                    <td>Nisha@gamil.com</td>
                    <td>9535473265</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="toggle_button"/>
                            <label class="form-check-label" for="toggle_button"></label>
                        </div>
                    </td>
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
