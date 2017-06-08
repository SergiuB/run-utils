
import React from 'react';
import { Route } from 'react-router';
import { withProps } from 'recompose';

const Subapp = ({ isDefault, title, id, component, ...other }) => <Route path={`/${id}`} component={withProps({ ...other })(component)}/>;

export default Subapp;