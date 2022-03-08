import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../store/user";
import { me } from "../store/auth";

class AccountInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = this.props.auth;
    console.log('this is the user', user)

    this.setState({
      email: user.email || "",
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
    const { email } = this.state;
    return (
      <div>
        <h3>Email : {email}</h3>
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
