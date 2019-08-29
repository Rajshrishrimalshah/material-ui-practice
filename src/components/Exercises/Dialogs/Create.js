import React, { Fragment, Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  FormControl: {
    width: 500
  }
};

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      exercise: {
        title: "",
        description: "",
        muscles: ""
      }
    };

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        exercise: {
          ...this.state.exercise,
          [name]: value
        }
      });
    };

    handleSubmit = () => {
      //Todo validate

      const { exercise } = this.state;
      this.props.onCreate({
        ...exercise,
        id: exercise.title.toLocaleLowerCase().replace(/ /g, "-")
      });

      this.setState({
        exercise: {
          title: "",
          description: "",
          muscles: ""
        },
        open: false
      });
    };

    render() {
      const {
        open,
        exercise: { title, description, muscles }
      } = this.state;

      const { muscles: categories, classes } = this.props;
      return (
        <Fragment>
          <Fab size="small" onClick={this.handleToggle}>
            <AddIcon />
          </Fab>

          <Dialog
            classes={styles.dialogPaper}
            open={open}
            onClose={this.handleToggle}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Create a New Exercise
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Please fill out the form below.
              </DialogContentText>

              <form>
                <TextField
                  label="Name"
                  value={title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  className={classes.FormControl}
                />
                <br />

                <FormControl className={classes.FormControl}>
                  <InputLabel htmlFor="muscles">Muscles</InputLabel>

                  <Select
                    value={muscles}
                    onChange={this.handleChange("muscles")}
                  >
                    {categories.map(muscle => (
                      <MenuItem key={muscle} value={muscle}>
                        {muscle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <br />
                <TextField
                  label="Description"
                  multiline
                  rows="4"
                  defaultValue={description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                  className={classes.FormControl}
                />
              </form>
            </DialogContent>

            <DialogActions>
              <Button color="primary" onClick={this.handleToggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={this.handleSubmit}>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
