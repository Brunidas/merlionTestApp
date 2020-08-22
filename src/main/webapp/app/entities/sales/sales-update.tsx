import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

// Importado por @Brunidas
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bfInput: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
    bfTest1: {
      background: 'red',
    },

    bfAlingForm: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    bfButtonBlue: {
      border:'none',
      marginTop: theme.spacing(1.5),
      background: '#2A6A9E',
      '&:hover': {
        background: '#1C496F',
      },
    },
    bfCard: {
      margin: theme.spacing(4),
    },
    bfButtonGreen: {
      border:'none',
      marginTop: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
      background: '#4caf50',
      '&:hover': {
        background: '#388e3c',
      },
    },
  })
);

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <div className={classes.bfCard}>
      <Row className="justify-content-center">
        <Col md="8" >
          <Typography variant="h4" gutterBottom>
            Crear o ediar Sales
          </Typography>
        
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <FormControl fullWidth>
                  <TextField
                    className={classes.bfInput} 
                    id="sales-id" 
                    type="text" 
                    name="id" 
                    label="ID"
                    helperText="No editable"
                    defaultValue={salesEntity.id}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>

              ) : null}

              {/* DESCRIPTION */}
              {!isNew ? (
                <FormControl fullWidth>
                  <TextField
                    className={classes.bfInput} 
                    id="sales-description" 
                    type="text" 
                    name="description" 
                    defaultValue={salesEntity.description}
                    label="Description" 
                    helperText="Ingresar Descripcion"
                  />
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <TextField
                    className={classes.bfInput} 
                    id="sales-description" 
                    type="text" 
                    name="description" 
                    defaultValue="Descripcion de Ejemplo"
                    label="Description" 
                    helperText="Ingresar Descripcion"
                  />
                </FormControl>
              )}

            
              {/* STATE */}
              <FormControl fullWidth>
                <TextField
                  className={classes.bfInput}
                  id="sales-state"
                  select
                  label="State"
                  name="state"
                  onChange={handleChange}
                  value={(!isNew && salesEntity.state) || 'IN_CHARGE'}
                  helperText="Porfavor seleccione un  state"
                >
                  <MenuItem key={1} value="IN_CHARGE" >IN_CHARGE</MenuItem>
                  <MenuItem key={2} value="SHIPPED" >SHIPPED</MenuItem>
                  <MenuItem key={3} value="DELIVERED" >DELIVERED</MenuItem>
                </TextField>
              </FormControl>


              {/* DATE PICKER */}
              <AvGroup>
                <FormControl fullWidth>
                  <TextField
                    id="sales-date"
                    label="Date"
                    type="date"
                    className={classes.bfInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </AvGroup>


              <Button tag={Link} id="cancel-save" to="/sales" replace color="info" className={classes.bfButtonGreen}>
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating} className={classes.bfButtonBlue}> 
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>


          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
