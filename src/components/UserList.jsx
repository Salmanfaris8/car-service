import React, { useEffect, useState } from 'react'
import { allUserAPI } from '../services/allAPI'

const UserList = () => {

    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        try {
            const result = await allUserAPI()
            if (result.status === 200) {
                setAllUser(result.data)
            }
        } catch (err) {
            // console.log(err);
        }
    }

    return (
        <>
            <section className="mb-5 border rounded p-3">
                <h2>All Users</h2>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUser?.length > 0 ?
                                    allUser?.map((user, index) => (
                                        user?.role !== "admin" &&
                                            <tr key={user.id || index}>
                                                <td>{index}</td>
                                                <td>{user?.username}</td>
                                                <td>{user?.email}</td>
                                            </tr>
                                    ))
                                    :
                                    <tr>
                                        <td className="text-danger">No Users</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default UserList
