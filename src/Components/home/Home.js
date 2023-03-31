import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";

export const Home = () => {
    return (
        <Sidebar>
            <div className="mt-2 fs-2 text-center">Vehicle</div>
            <div className="p-3">

                <table class="table border">
                    <thead>
                        <tr>
                            <th scope="col">Sno.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>2-Vehicles</td>
                            <th>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                                <i class="mx-2 fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>3-Vehicles</td>
                            <td>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                                <i class="mx-2 fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>22-Vehicles</td>
                            <th>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                                <i class="mx-2 fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>


        </Sidebar>
    )
}