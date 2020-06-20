import {StackActions} from '@react-navigation/stack';

export function resetScreen(navigation, routeName) {
  navigation.reset({
    routes: [{name: routeName}],
  });
}
