import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsersThunk } from "../store/users";

export function UsersList(props) {
    console.log("// [ UsersList Functional Component ] - props: ", props);
    useEffect(() => {
        props.setUsers()
    }, [])
    const users = props.users;
    if (users.length === 0) {
        return (<p> Users Loading </p>)
    } else {
        return (
            <div className="listView">
                <div><h2> Total Users: {users.length} </h2></div>
                <div className="cards">
                    {users.map((user) => (
                        <div key={user.id} className="card">
                            <h4>usersId: {user.id}</h4>
                            <h4>Email: {user.email} </h4>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    console.log("// logging state from mapState in UsersList", state);
    return {
        users: state.users,
        // auth: state.auth
    }

}

function mapDispatch(dispatch) {
    return {
        setUsers: () => dispatch(fetchUsersThunk()),
    };
}

export default connect(mapState, mapDispatch)(UsersList);