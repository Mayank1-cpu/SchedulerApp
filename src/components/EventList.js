import React from "react";
import { useSubscription, useMutation, gql } from "@apollo/client";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
import { dateFormat } from "../utils/DateUtils";

const SCHEDULE = gql`
subscription Schedule {
  schedule(order_by: {created_at:desc}) {
    id
    dtstart
    dtend
    title
    location
    description
    created_at
  }
}
`;

const DELETE_SCHEDULE = gql`
mutation deleteSchedule($id: uuid!) {
  delete_schedule_by_pk(id: $id) {
    id
    dtstart
    dtend
    title
    location
    description
  }
}
`;


const containerStyle = {
  overflowY: "scroll",
  width: "100%",
  backgroundColor:"#eee",
};
const item ={
  width:"80%",
  backgroundColor:"#fff",
  margin:"0.8rem auto",
  borderRadius:"10px",
  boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.3)",
  borderTop:"10px solid #f5ba13"
}

export default props => {

  const { loading, error, data } = useSubscription(SCHEDULE);
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE);
     if(loading) return <p>Loading...</p>
     if(error)   return <p>Error :({console.log(error)}</p>
  const events = data.schedule
    .slice().sort((a, b) => {
      return new Date(a.dtstart) > new Date(b.dtend) ? 1 : -1;
    })
    .map((node, index) => {
      const fmtDTStart = format(new Date(node.dtstart), dateFormat);
      const fmtDTEnd = format(new Date(node.dtend), dateFormat);
      return (
        <div key={index} style={item}>
          <ListItem id="main" button alignItems="flex-start">
            <ListItemIcon>
              <EventIcon style={{ color: "#14274e", fontSize: "2em" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "gray" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em",color: "#14274e"  }}>
                      From:
                    </span>
                    {fmtDTStart}
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "gray" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em",color:"#14274e" }}>
                      To:
                    </span>
                    {fmtDTEnd}
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "#14274e", fontWeight: "bold" }}
                  >
                    {node.title}
                  </Typography>
                  <Typography
                    component="p"
                    //variant="body2"
                    style={{ color: "gray" }}
                  >
                    <span style={{ fontWeight: "bold", marginRight: ".5em",color:"#14274e" }}>
                      Location:
                    </span>
                    {node.location}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    //variant="body2"
                    style={{ color: "grey", fontSize: "1em" }}
                  >
                    {node.description}
                  </Typography>
                </React.Fragment>
              }
            />
            <div className="edit-delete">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => deleteSchedule({ variables: {id:node.id}})}
                title="Cancel (Delete) Appointment"
                disabled={props.formVisible}
                className="deletebutton"
                style={{ marginBottom: "1em" }}
              >
                <span className="buttontext">Delete</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => props.onEditItem(node)}
                title="Edit Appointment"
                disabled={props.formVisible}
                className="editbutton"
              >
                <span className="buttontext">Edit</span>
              </Button>
            </div>
          </ListItem>
        </div>
      );
    });
  return (
    <div style={containerStyle}>
      <List>{events}</List>
    </div>
  );
};
