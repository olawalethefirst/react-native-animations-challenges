import { StyleSheet, ScrollView, } from 'react-native';
import HomeButton from '../components/HomeButton';
import screens from '../navigators/screens';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation: { navigate } }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {screens.map(({ name, description }, index) => (
                    <HomeButton
                        navigate={navigate}
                        name={name}
                        description={description}
                        key={index}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        marginVertical: 20,
        justifyContent: 'center',
        flexGrow: 1,
    },
});
