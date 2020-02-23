import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import DevList from '../pages/DevList';
import SignIn from '../pages/SignIn';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={SignIn} />
            <Route path="/devs/:id" component={DevList} />
        </BrowserRouter>
    )
}
 