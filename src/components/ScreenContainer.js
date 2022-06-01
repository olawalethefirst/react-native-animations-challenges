import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBackButton from './NavigationBackButton';

const ScreenContainer = ({ children, goBack, style = {} }) => {
    return (
        <SafeAreaView mode="margin" style={[styles.container, style]}>
            <NavigationBackButton goBack={goBack} />
            {children}
        </SafeAreaView>
    );
};

export default ScreenContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
