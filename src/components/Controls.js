import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const containerStyle = {
  backgroundColor: "#f5ba13",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.5em",
  padding: "0.5em 1em",
  width: "100%"
};

export default props => {
  return (
    <div style={containerStyle} id="titlebar">
    <header>
      <h1> Schedule </h1>
      <Button
        variant="contained"
        style={{background:"#f1f6f9"}}
        startIcon={<AddIcon />}
        onClick={props.onShowFormClick}
        title={props.formVisible ? `Hide Form` : `Show Form`}
        disabled={props.formVisible}
      >
        Create
      </Button>
    </header>

    </div>
  );
};
