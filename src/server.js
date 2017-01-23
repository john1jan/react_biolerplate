'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
const httpProxy = require('http-proxy');
import * as ROUTES from "./routes";
import { routes } from "./routes";
import DataWrapper from './components/DataWrapper'
import * as UrlHelper from "./config/url_helper";
import _ from 'lodash';
import url from 'url';
// const compression = require('compression');
import DocumentMeta from 'react-document-meta';
import * as VALUES from "./config/values"
import * as ENV from "./config/env"

console.log("ENV", ENV);

const app = new Express();
const server = new Server(app);

// Enabling HTTPS redirection starts here
if (ENV.isProd || ENV.isPreProd) {
    app.use(requireHTTPS);
}

function requireHTTPS(req, res, next) {
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
        let webHost = UrlHelper.URL_STRINGS.WEB_HOST;
        webHost = webHost.substring(0, webHost.length - 1);
        return res.redirect(301, webHost + req.url);
    }
    next();
}
// Code for HTTPS redirection ends here

// getting hashed bundle file name from build-manifest.json
import { readFileSync } from 'jsonfile';
let common = "";
let vendor = "";
let jsBundle = "";
const manifestPath = `${process.cwd()}/src/static/js/build-manifest.json`;
const manifest = readFileSync(manifestPath);
common = "\"/js/" + manifest['common.js'] + ".gz\"";
vendor = "\"/js/" + manifest['vendor.js'] + ".gz\"";
jsBundle = "\"/js/" + manifest['bundle.js'] + ".gz\"";
// we now have jsBundle which can be injected in our ejs template


// This code take any request of *app.css* and return gzipped version of that file with content encoding set to gzip
// this code is currently gzipping only 1 file declared in head of ejs file
app.get('*app.css*', function (req, res, next) {
    res.set('Content-Encoding', 'gzip');
    // app.use(compression())
    next();
});
// End of this code

// This code take any request of *.js.gz and return gzipped version of that file with content encoding set to gzip
// this code is currently gzipping only 3 files in body of ejs file
app.get('*.js.gz', function (req, res, next) {
    // req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});
// End of this code


// initialize the server and configure support for ejs templates

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// app.use(compression())
// define the folder that will be used for static assets
const oneDay = 86400000;
app.use(Express.static(path.join(__dirname, 'static'), { maxAge: oneDay }));

/*
app.all('/api/*', (req, res) => {
    const path = _.drop(req.url.split('/'), 3);
    console.log("final path", url.resolve(PROXY_HOST, path.join('/')))
    apiProxy.proxyRequest(req, res, {
        target: url.resolve(PROXY_HOST, path.join('/')),
        ignorePath: true,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    //
    // Listen for the `error` event on `proxy`.
    apiProxy.on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    });
});
*/

// universal routing and rendering
app.get('*', (req, res) => {
    let isMobileDevice = false;

    let str = req.headers["user-agent"];

    let searchString = str.search("Mobi");
    if (!(searchString === -1)) {
        isMobileDevice = true;
    }

    match(
        { routes, location: req.url },
        (err, redirectLocation, renderProps) => {

            // in case of error display the error message
            if (err) {
                return res.status(500).send(err.message);
            }
            // in case of redirect propagate the redirect to the browser
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            // generate the React markup for the current route
            // let markup = "";
            if (renderProps) {
                // if the current route matched we have renderProps
                let preloadedData = {
                    isMobileDevice: isMobileDevice,
                    data: []
                }

                switch (renderProps.routes[1].path) {


                    case ROUTES.HOME:
                        renderSSRPage(res, preloadedData, renderProps);
                        break;

                    default:
                        render404Page(res, preloadedData, renderProps)
                        break;
                }
            }
        }
    );
});


const segmentAnalyticsKey = VALUES.segmentAnalyticsKey;

function renderNormalPage(res, preloadedData) {
    let markup = ""
    let meta = DocumentMeta.renderAsHTML();

    return res.render('index', {
        meta,
        markup,
        segmentAnalyticsKey,
        preloadedData: JSON.stringify(preloadedData),
        common,
        vendor,
        jsBundle
    });
}

function renderSSRPage(res, preloadedData, renderProps) {
    let markup = renderToString(<DataWrapper data={preloadedData}><RouterContext {...renderProps} /></DataWrapper>);
    let meta = DocumentMeta.renderAsHTML();
    return res.render('index', {
        meta,
        markup,
        segmentAnalyticsKey,
        preloadedData: JSON.stringify(preloadedData),
        common,
        vendor,
        jsBundle
    });
}

function render404Page(res, preloadedData, renderProps) {
    let markup = renderToString(<DataWrapper data={preloadedData}><RouterContext {...renderProps} /></DataWrapper>);
    let meta = DocumentMeta.renderAsHTML();
    res.status(404);
    return res.render('index', {
        meta,
        markup,
        segmentAnalyticsKey,
        preloadedData: JSON.stringify(preloadedData),
        common,
        vendor,
        jsBundle
    });
}


// start the server
const port = process.env.PORT || 3001;
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info("Server running on" + ENV.HOST + ":" + port);
});
