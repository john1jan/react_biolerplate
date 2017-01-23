'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import DataWrapper from './components/DataWrapper';
import axios from 'axios';
import { Router, browserHistory } from 'react-router';
import { routes } from './routes';

const preloadedData = JSON.parse(document.getElementById('preloadedData').textContent);

ReactDOM.render(
    <DataWrapper data={preloadedData}>
        <Router history={browserHistory} routes={routes} />
    </DataWrapper>, document.getElementById('main')
);


//onUpdate={() => window.scrollTo(0, 0)}