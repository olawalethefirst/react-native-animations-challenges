import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavigationBackButton = ({ goBack }) => {
    return (
        <TouchableOpacity
            onPress={goBack}
            style={{ position: 'absolute', zIndex: 1, left: 20, top: 0 }}
        >
            <Ionicons color={'#215ab8'} name="chevron-back-circle" size={40} />
        </TouchableOpacity>
    );
};

export default NavigationBackButton;

const styles = StyleSheet.create({});
