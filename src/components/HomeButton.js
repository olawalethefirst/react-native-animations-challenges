import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const HomeButton = ({ description, navigate, name }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => navigate(name)}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                {description}
            </Text>
        </TouchableOpacity>
    );
};

export default HomeButton;

const styles = StyleSheet.create({
    text: {
        color: '#215ab8',
        textAlign: 'center',
        fontSize: 18,
    },
    button: {
        padding: 10,
    },
});
