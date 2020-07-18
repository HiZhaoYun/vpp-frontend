import React, { useState } from 'react'
import { Layout, message, Typography, Spin, Space } from 'antd'
import { withRouter } from 'react-router-dom'
import '@/style/view-style/login.scss'
import { useSubstrate } from '../../substrate-lib'

const Login = props => {
    const [loadingText, setLoadingText] = useState('connecting to the blockchain')
    const { apiState, keyringState } = useSubstrate()

    let values = {}
    if (apiState === 'ERROR') {
        setLoadingText('Error connecting to the blockchain')
    } else if (apiState !== 'READY') {
        //setLoadingText('Connecting to the blockchain')

        values.auth = 0
        localStorage.setItem('user', JSON.stringify(values))
        setTimeout(() => {
            message.success('Login success!')
            props.history.push('/')
        }, 5000)
    }

    if (keyringState !== 'READY') {
        //setLoadingText("Loading accounts (please review any extension's authorization)")
    }

    return (
        <Layout>
            <div className='test'>
                <Space>
                    <Spin />
                    <Typography>{loadingText}</Typography>
                </Space>
            </div>
        </Layout>
    )
}

export default withRouter(Login)
