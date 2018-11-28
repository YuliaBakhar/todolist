import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { styled } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const MyCard = styled(Card)({
  padding: "10px",
  height: "100vh",
  overflow: "auto"
});

const styles = theme => ({
  width: {
    width: "5px"
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      error: ""
    };
  }

  componentDidMount() {
    this.todoProjectInput.focus();
  }

  onSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    if (text.trim() === "" || text === "/") return;
    this.props.onCreate(text, this.props.projectId);
    this.setState({
      text: ""
    });
  };

  onChange = e => {
    this.setState({
      text: /[^а-яёa-z0-9-]/i.test(e.target.value)
        ? this.state.text
        : e.target.value,
      error: /[^а-яёa-z0-9- ]/i.test(e.target.value)
        ? `Project name cannot contain "${e.target.value.slice(
            e.target.value.length - 1
          )}"`
        : ""
    });
  };

  render() {
    const { text } = this.state;
    const { projects, onDelete, classes } = this.props;
    return (
      <div>
        <MyCard className="todo-project-form">
          <div className="todo-project-title">
            <h2>Projects:</h2>
          </div>

          <form onSubmit={this.onSubmit}>
            <input
              className="todo-input"
              placeholder="Enter project name"
              value={text}
              ref={input => {
                this.todoProjectInput = input;
              }}
              onChange={this.onChange}
            />
            <div className="todo-project-error">{this.state.error}</div>
            <div className="todo-project-prompt">
              *Project name must contain only letters, numbers and dashes.
            </div>
          </form>
          {projects.map(project => (
            <div key={project.id}>
              <ListItem button>
                <Link
                  to={{
                    pathname: `/${project.text}`
                  }}
                  className="todo-project-list"
                >
                  <ListItemText primary={project.text} />
                </Link>
                <Badge
                  color="primary"
                  badgeContent={`${project.todos.length}`}
                  className={`${classes.margin}`}
                >
                  <Typography className={classes.padding}>Task</Typography>
                </Badge>
                <IconButton
                  onClick={() => onDelete(project.id)}
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </MyCard>
      </div>
    );
  }
}

TodoForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoForm);
