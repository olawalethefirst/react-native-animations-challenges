import { StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const AnimatedPenguin = ({ size, penguinPressed }) => {
    const awakePenguin = useAnimatedStyle(() => ({
        opacity: penguinPressed.value ? 1 : 0,
    }));
    const asleepPenguin = useAnimatedStyle(() => ({
        opacity: penguinPressed.value ? 0 : 1,
    }));
    return (
        <View
            style={{
                height: size,
                width: size,
            }}
        >
            <Animated.Image
                style={[
                    StyleSheet.absoluteFill,
                    {
                        height: undefined,
                        width: undefined,
                    },
                    awakePenguin,
                ]}
                // @ts-ignore
                source={require('../../assets/images/awakePenguin.webp')}
            />

            <Animated.Image
                style={[
                    StyleSheet.absoluteFill,
                    {
                        height: undefined,
                        width: undefined,
                    },
                    asleepPenguin,
                ]}
                // @ts-ignore
                source={require('../../assets/images/asleepPenguin.webp')}
            />
        </View>
    );
};

export default AnimatedPenguin;
