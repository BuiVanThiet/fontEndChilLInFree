import * as React from 'react';

import { request } from './Axios_helper';
import { data } from 'react-router-dom';

export default class AuthContent extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            data
        }
    }
}