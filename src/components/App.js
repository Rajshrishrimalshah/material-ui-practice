import React, { Component, Fragment } from "react";

import { Header, Footer } from "./layouts";
import Exercises from "./Exercises";
import { muscles, exercises } from "../config/store";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises,
      category: "",
      exercise: {}
    };

    this.getExercisesByMuscles = this.getExercisesByMuscles.bind(this);
  }

  getExercisesByMuscles() {
    const { exercises } = this.state;
    return Object.entries(
      exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise];

        return exercises;
      }, {})
    );
  }

  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  handleExerciseSelect = id => {
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id)
    }));
  };

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles();
    const { category, exercise } = this.state;
    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Exercises
          exercises={exercises}
          category={category}
          onSelect={this.handleExerciseSelect}
          exercise={exercise}
        />

        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}
