import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const styles = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 380,
    overflowY: "auto"
  },
  marginRight: {
    marginRight: 10
  },
  marginTop: {
    marginTop: 20
  }
};

export default ({
  exercises,
  category,
  onSelect,
  exercise: {
    id,
    title = "Welcome!",
    description = "Please select an exercise from the list on the left."
  }
}) => {
  return (
    <Grid container>
      <Grid item sm>
        <Paper style={{ ...styles.Paper, ...styles.marginRight }}>
          {exercises.map(([group, exercises]) =>
            !category || category === group ? (
              <Fragment key={exercises.id}>
                <Typography
                  variant="h5"
                  style={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>

                <List component="ul" aria-label="secondary mailbox folders">
                  {exercises.map(({ id, title }) => (
                    <ListItem button key={id} onClick={() => onSelect(id)}>
                      <ListItemText primary={title} />
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ) : null
          )}
        </Paper>
      </Grid>

      <Grid item sm>
        <Paper style={styles.Paper}>
          <Typography variant="h6"> {title}</Typography>

          <Typography variant="subtitle1" style={{ marginTop: 10 }}>
            {description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
