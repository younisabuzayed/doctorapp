import React from 'react';
import HeaderButton from '../components/headerButton';

const withHeader = (WrappedComponent, title) =>
{
    return class extends React.Component
    {
        static navigationOptions = ({navigation}) =>
        {
            return {
                title: title,
                headerStyle:
                {
                    backgroundColor: '#007bff'
                },
                headerTintColor: '#fff',
                headerTitleStyle:
                {
                    marginHorizontal: 10,
                    textAlign: 'left',
                    flexGrow: 1
                },
                headerRight: <HeaderButton direction="right" iconName="md-arrow-back" headerPassed={() => navigation.goBack(null)} />,
                headerLeft: <HeaderButton direction="left" iconName="md-menu" headerPassed={navigation.openDrawer} />,
            }
        }
        componentDidMount()
        {
            this.props.navigation.setParams({
                openDrawer: this.props.navigation.openDrawer,
                goBack: this.props.navigation.goBack, 
            })
        }
        render()
        {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withHeader;