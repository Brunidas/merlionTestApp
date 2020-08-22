import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

// Importado por @Brunidas
import { Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bfSubtitule: {
      marginTop: theme.spacing(1.5),
    },
    bfButtonBack: {
      border:'none',
      marginTop: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
      background: '#4caf50',
      '&:hover': {
        background: '#388e3c',
      },
    },
    bfButtonSave: {
      border:'none',
      marginTop: theme.spacing(1.5),
      background: '#2A6A9E',
      '&:hover': {
        background: '#1C496F',
      },
    },
    bfAlingForm: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bfCard: {
      margin: theme.spacing(1.5),
    },
    
  })
);

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesDetail = (props: ISalesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);
  
  const classes = useStyles();

  const { salesEntity } = props;
  return (
    // <Row>
    //   <Col md="8" >
      
    <div className={classes.bfCard}>

      <Grid container className={classes.bfAlingForm}>
      
        {/* Encabezado */}
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" component="h2">
            Sale #{salesEntity.id}
          </Typography>  
        </Grid>
      


        {/* Descripcion */}
        <Grid item xs={12} className={classes.bfSubtitule} sm={8}>
          <Typography variant="subtitle2" className={classes.bfSubtitule} gutterBottom>
            Description
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" gutterBottom>
            {salesEntity.description}
          </Typography>
        </Grid>
      
      
        {/* Estado */}
        <Grid item xs={12} className={classes.bfSubtitule} sm={8}>
          <Typography variant="subtitle2" className={classes.bfSubtitule} gutterBottom>
            State
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>          
          <Typography variant="body1" gutterBottom>
            {salesEntity.state}
          </Typography>
        </Grid>


        {/* Fecha */}
        <Grid item xs={12} className={classes.bfSubtitule} sm={8}>
          <Typography variant="subtitle2" className={classes.bfSubtitule} gutterBottom>
            Date
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>          
          <Typography variant="body1" gutterBottom>
            {salesEntity.date}
          </Typography>
        </Grid>

        <Grid item xs={12}sm={8}> 
          <Button tag={Link} to="/sales" replace color="info" className={classes.bfButtonBack}>
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/sales/${salesEntity.id}/edit`} replace color="primary" className={classes.bfButtonSave}> 
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Grid>

      </Grid>
    </div>

  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail);
