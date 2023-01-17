import React from "react";

const AssemblyLine = (props) => {
  const board = props.stages.map((stage) => ({ title: stage, tasks: [] }));

  const [state, setState] = React.useState({
    board: board,
    newTask: "",
  });

  const handleChangeNewTask = (task) => {
    setState((prev) => ({ ...prev, newTask: task }));
  };

  const handleCleanNewTask = () => {
    setState((prev) => ({ ...prev, newTask: "" }));
  };

  const handleAddNewTask = (e, newTask) => {
    e.preventDefault();

    const updatedBoard = state.board.map((col, colIndex) => {
      if (colIndex === 0) {
        return { ...col, tasks: [...col.tasks, newTask] };
      }
      return col;
    });
    const updatedState = { ...state, board: updatedBoard };
    setState(updatedState);

    handleCleanNewTask();
  };

  const handleMoveLeft = (e, colIndex, colTask, colTaskIndex) => {
    e.preventDefault();
    if (colIndex !== 0) {
      const updatedBoard = state.board.map((cl, clIndex) => {
        if (clIndex === colIndex) {
          return {
            ...cl,
            tasks: cl.tasks.filter(
              (task, taskIndex) => taskIndex !== colTaskIndex
            ),
          };
        }

        if (clIndex === colIndex - 1) {
          return {
            ...cl,
            tasks: [...cl.tasks, colTask],
          };
        }
        return cl;
      });
      const updatedState = { ...state, board: updatedBoard };
      setState(updatedState);
      return;
    }
    // if is first item, remove
    const updatedBoard = state.board.map((cl, clIndex) => {
      if (clIndex === colIndex) {
        return {
          ...cl,
          tasks: cl.tasks.filter(
            (task, taskIndex) => taskIndex !== colTaskIndex
          ),
        };
      }
      return cl;
    });
    const updatedState = { ...state, board: updatedBoard };
    setState(updatedState);
  };

  const handleMoveRight = (e, colIndex, colTask, colTaskIndex) => {
    e.preventDefault();
    const updatedBoard = state.board.map((cl, clIndex) => {
      if (clIndex === colIndex) {
        return {
          ...cl,
          tasks: cl.tasks.filter(
            (task, taskIndex) => taskIndex !== colTaskIndex
          ),
        };
      }

      if (clIndex === colIndex + 1) {
        return {
          ...cl,
          tasks: [...cl.tasks, colTask],
        };
      }
      return cl;
    });
    const updatedState = { ...state, board: updatedBoard };
    setState(updatedState);
  };

  // TODO add your code here.
  // Feel free to use a functional component.
  // Don't forget about candidate-written-response.md
  // when you finish coding!

  return (
    <div>
      <form onSubmit={(e) => handleAddNewTask(e, state.newTask)}>
        <span>Add an item:</span>
        <input
          className="assembly-add-item"
          value={state.newTask}
          onChange={(e) => handleChangeNewTask(e.target.value)}
        />
      </form>
      <div className="assembly-board">
        {state.board.map((col, colIndex) => {
          return (
            <div key={col.title} className="assembly-stage">
              <p>{col.title}</p>
              <br />
              {col.tasks.map((colTask, colTaskIndex) => {
                return (
                  <button
                    className="assembly-item"
                    key={colTask}
                    onClick={(e) =>
                      handleMoveLeft(e, colIndex, colTask, colTaskIndex)
                    }
                    onContextMenu={(e) =>
                      handleMoveRight(e, colIndex, colTask, colTaskIndex)
                    }
                  >
                    {colTask}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssemblyLine;
