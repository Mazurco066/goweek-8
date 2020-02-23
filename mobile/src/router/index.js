import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DevList from '../pages/DevList';
import SignIn from '../pages/SignIn';

export default createAppContainer(
    createSwitchNavigator({
        SignIn,
        DevList
    })
)