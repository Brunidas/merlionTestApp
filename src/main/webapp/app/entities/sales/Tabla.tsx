import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import ListaColapsable from './ListaColapsable';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    bfDescription: {
      maxWidth: 400,
    },
    bfButton: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
    bfButtonBlue: {
      background: '#2A6A9E',
      '&:hover': {
        background: '#1C496F',
      },
    },
    bfButtonBlueIcon: {
      color: '#2A6A9E',
    },
    bfButtonGreen: {
      background: '#4caf50',
      '&:hover': {
        background: '#388e3c',
      },
    },
    bfButtonGreenIcon: {
      color: '#4caf50',
    },
  })
);

function createData(id: number, description: string, state: string, date: string) {
  return { id, description, state, date };
}

const rows = [
  createData(
    1,
    'Refined De-engineered budgetary management Refined De-engineered budgetary management Refined ',
    'DELIVERED',
    '2020-08-13'
  ),
  createData(2, 'Australia Pizza', 'DELIVERED', '2020-08-14'),
  createData(3, 'customized Delaware Incredible Soft Chair', 'SHIPPED', '2020-08-14'),
];

function Tabla(props: WithWidth) {
  const classes = useStyles();
  const { width } = props;

  return (
    <TableContainer >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* Titulo de la tabla */}
            <TableCell align="left">
              <Typography variant="h4" gutterBottom>
                Sales
              </Typography>
            </TableCell>

            {/* Cuando el boton Crear esta demaciado comprimido aparece aqui */}
            <TableCell>
              <Hidden smUp>
                <Button
                  className={[classes.bfButton, classes.bfButtonBlue].join(' ')}
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                >
                  Crear Nuevo Sales
                </Button>
              </Hidden>
            </TableCell>

            {/* Se oculta para mantener correcta la tabla */}
            <Hidden mdDown>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </Hidden>

            {/* Pocicion normal de boton Crear */}
            <TableCell align="right">
              <Hidden xsDown>
                <Button
                  className={[classes.bfButton, classes.bfButtonBlue].join(' ')}
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                >
                  Crear Nuevo Sales
                </Button>
              </Hidden>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Description</TableCell>

            <Hidden mdDown>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Date</TableCell>
            </Hidden>

            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>

              <TableCell className={classes.bfDescription} align="left">
                <Hidden mdDown>{row.description}</Hidden>

                <Hidden lgUp>
                  <ListaColapsable description={row.description} state={row.state} date={row.date} />
                </Hidden>
              </TableCell>

              <Hidden mdDown>
                <TableCell align="left">{row.state}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
              </Hidden>

              <TableCell align="right">
                <div>
                  {width === 'lg' || width === 'xl' ? (
                    // acciones de en modo pantalla grande
                    <div>
                      <Button
                        className={[classes.bfButton, classes.bfButtonGreen].join(' ')}
                        size="small"
                        variant="contained"
                        color="secondary"
                        startIcon={<VisibilityIcon />}
                      >
                        Ver
                      </Button>

                      <Button
                        className={[classes.bfButton, classes.bfButtonBlue].join(' ')}
                        size="small"
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                      >
                        Editar
                      </Button>

                      <Button className={classes.bfButton} size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    // acciones de en modo pantalla pequeña
                    <div>
                      <IconButton className={classes.bfButtonGreenIcon} color="secondary" aria-label="upload picture" component="span">
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton className={classes.bfButtonBlueIcon} color="secondary" aria-label="upload picture" component="span">
                        <EditIcon />
                      </IconButton>

                      <IconButton color="secondary" aria-label="upload picture" component="span">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withWidth()(Tabla);
