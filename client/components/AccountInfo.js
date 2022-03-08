import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../store/user";
import { me } from "../store/auth";

class AccountInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = this.props.auth;
    console.log('this is the user', user)

    this.setState({
      username: user.username || "",
      email: `${user.username}@StreetStack.com` || "",
      phone: user.phone || "",
    });
  }

 

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    try {
      await event.preventDefault();
      await this.props.toUpdateUser({ ...this.props.auth, ...this.state });
      await this.props.refreshUser();
      await this.props.history.push("/myAccount");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { username, email, phone } =
      this.state;
      let formatPhone = "(" + phone.slice(0, 3) + ")-" + phone.slice(3, 6) + "-" + phone.slice(6, 10)

    return (
      <div>
        <h3>Username: {username}</h3>
        <h3>Email : {email}</h3>
        <h3>Phone : {formatPhone}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  toUpdateUser: user => dispatch(updateUser(user)),
  refreshUser: () => dispatch(me()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
