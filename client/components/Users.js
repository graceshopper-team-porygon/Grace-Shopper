import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllUsers, fetchDeleteUser } from "../store/users";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  withStyles,
} from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";

const useStyles = () => ({
  container: {
    display: "flex",
    "justify-content": "center",
  },
  listItem: {
    width: 900,
    height: 25,
    "border-style": "none none ridge none",
    "border-radius": 10,
    "box-shadow": "0 3px 5px rgb(123, 161, 10)",
    margin: -5,
    padding: 12,
    background: "rgba(191, 255, 0, .5)",
    color: "rgb(57, 77, 0)",
  },
  listItemId: {
    "flex-grow": 1,
  },
  listItemElement: {
    width: 100,
    "flex-grow": 5,
  },
  button: {
    height: 25,
    background: "transparent",
    "&:hover": {
      background: "rgba(134, 179, 0, 0.4)",
    },
  },
  icon: {
    color: "rgba(57, 77, 0, .7)",
    margin: 0,
  },
  hr: {
    margin: 10,
  },
});

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { users, classes, fetchDeleteUser } = this.props;

    return (
      <div>
        <div className={(classes.container, classes.listTitle)}>
          {/* <p className={classes.listItemElement}>ID</p> */}
          {/* <p className={classes.listTitleElement}>EMAIL</p> */}
          {/* <h4 className={classes.listTitleElement}>REGISTRATION DATE</h4> */}
        </div>
        {users.map((user) => (
          <div key={user.id}>
            <List className={classes.container}>
              <ListItem className={classes.listItem}>
                <ListItemText
                  className={classes.listItemId}
                  secondary={user.id}
                />
                <ListItemText
                  className={classes.listItemElement}
                  secondary={user.username}
                />
                <ListItemText
                  className={classes.listItemElement}
                  secondary={`Member Since: ${new Date(
                    user.createdAt
                  ).toLocaleDateString()}`}
                />
                <Button className={classes.button}>
                  <EditOutlined className={classes.icon} />
                </Button>
                <hr className={classes.hr} />
                <Button
                  className={classes.button}
                  onClick={() => fetchDeleteUser(user.id)}
                >
                  <DeleteOutline className={classes.icon} />
                </Button>
              </ListItem>
            </List>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchDeleteUser: (id) => dispatch(fetchDeleteUser(id)),
  };
};

export default connect(mapState, mapDispatch)(withStyles(useStyles)(Users));
