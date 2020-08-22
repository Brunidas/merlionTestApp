import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

type ListaColapsableProps = {
  description: string;
  state: string;
  date: string;
};

function ListaColapsable({ description, state, date }: ListaColapsableProps) {
  //   const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const stringState = `State: ${state}`;
  const stringDate = `Date: ${date}`;
  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={description} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText primary={stringState} />
          </ListItem>

          <ListItem button>
            <ListItemText primary={stringDate} />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default ListaColapsable;
