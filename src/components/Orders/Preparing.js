import React from 'react'
import OrderTemplate from '../../HelperComponents/OrderTemplate'

export default class Received extends React.Component {

    render()
    {
        return (
            <OrderTemplate
                navigation={this.props.navigation}
                showStatus={[1]}
                nextStatus={2}
                reverse={false}
            />
        )
    }
}