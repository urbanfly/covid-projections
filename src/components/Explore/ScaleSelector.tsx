import React, { FunctionComponent } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Scale } from './interfaces';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const ScaleSelector: FunctionComponent<{
  scale: Scale;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}> = ({ scale, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="scale-label">Scale</InputLabel>
      <Select
        labelId="scale-label"
        id="select-scale"
        value={scale}
        onChange={onChange}
        label="Scale"
        defaultValue={Scale.LINEAR}
      >
        <MenuItem value={Scale.LINEAR}>Linear</MenuItem>
        <MenuItem value={Scale.LOG}>Log</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ScaleSelector;
