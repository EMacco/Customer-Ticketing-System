import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Auth from "../layouts/Auth";
import NewRequest from "../pages/NewRequest";
import FullRequest from "../pages/FullRequest";
import Users from "../pages/Users";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/requests/new" component={NewRequest} />
            <Route exact path="/requests/:id" component={FullRequest} />
            <Route exact path="/users" component={Users} />

            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;
