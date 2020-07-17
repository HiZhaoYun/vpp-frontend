import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from './utils/loadable'
import { Dimmer, Loader } from 'semantic-ui-react';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import 'animate.css'
import './style/base.scss'
import './style/App.scss'

// 公共模块
const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面
const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
const View500 = loadable(() => import(/* webpackChunkName: '500' */ './views/Others/500'))
const Login = loadable(() => import(/* webpackChunkName: 'login' */ './views/Login'))


function Main () {
    const [accountAddress, setAccountAddress] = useState(null);
    const { apiState, keyring, keyringState } = useSubstrate();
    const accountPair =
        accountAddress &&
        keyringState === 'READY' &&
        keyring.getPair(accountAddress);

    const loader = text => (
        <Dimmer active>
            <Loader size='small'>{text}</Loader>
        </Dimmer>
    );

    if (apiState === 'ERROR') return loader('Error connecting to the blockchain');
    else if (apiState !== 'READY') return loader('Connecting to the blockchain');

    if (keyringState !== 'READY') {
        return loader(
            "Loading accounts (please review any extension's authorization)"
        );
    }

    return (
        <Router>
            <Switch>
                <Route path='/' exact render={() => <Redirect to='/index' />} />
                <Route path='/500' component={View500} />
                <Route path='/login' component={Login} />
                <Route path='/404' component={View404} />
                <Route component={DefaultLayout} />
            </Switch>
        </Router>
    )
}

export default function App() {
    return (
        <SubstrateContextProvider>
            <Main />
        </SubstrateContextProvider>
    )
}
