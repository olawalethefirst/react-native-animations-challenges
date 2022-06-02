import { StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    Extrapolate,
    useDerivedValue,
} from 'react-native-reanimated';
import { chanelItems } from '../constants';
import ChanelItem, { imageBigHeight, height } from '../components/ChanelItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenContainer from '../components/ScreenContainer';

export default function ChanelList({ navigation: { goBack } }) {
    const { top } = useSafeAreaInsets();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((e) => {
        scrollY.value = e.contentOffset.y;
    });
    const animatedFooterOpacity = useDerivedValue(() =>
        interpolate(
            scrollY.value,
            [
                (chanelItems.length - 2) * imageBigHeight,
                (chanelItems.length - 1) * imageBigHeight,
            ],
            [0, 1],
            Extrapolate.CLAMP
        )
    );
    const animatedFooterStyle = useAnimatedStyle(() => ({
        opacity: animatedFooterOpacity.value,
    }));

    return (
        <ScreenContainer style={styles.container} goBack={goBack}>
            <View
                style={[
                    styles.footerContainer,
                    { height: height - imageBigHeight - top },
                ]}
            >
                <Animated.Text style={[styles.footer, animatedFooterStyle]}>
                    The End
                </Animated.Text>
            </View>
            <Animated.FlatList
                data={chanelItems}
                renderItem={({ item: { path, credit }, index }) => (
                    <ChanelItem
                        path={path}
                        scrollY={scrollY}
                        index={index}
                        credit={credit}
                    />
                )}
                onScroll={onScroll}
                contentContainerStyle={{
                    height:
                        (chanelItems.length - 1) * imageBigHeight +
                        (height - top),
                }}
                scrollEventThrottle={16}
                snapToInterval={imageBigHeight}
                decelerationRate={'fast'}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    footer: { color: 'white', textAlign: 'center' },
});
