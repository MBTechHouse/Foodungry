import React from 'react'
import OrderTemplate from '../../HelperComponents/OrderTemplate'

export default class Received extends React.Component {

    render()
    {
        return (
            <OrderTemplate
                navigation={this.props.navigation}
                showStatus={[0]}
                nextStatus={1}
                reverse={false}
            />
        )
    }
}