import { StyleSheet, PanResponder, Animated } from 'react-native';
import { useRef } from 'react';
import distanceBetweenCoord from '../helperFunctions/distanceBetweenCoord';
import ScreenContainer from '../components/ScreenContainer';

export default function NativePanResponder({ navigation: { goBack } }) {
    const translate = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const initialDistanceBetweenCoord = useRef(0);
    const initialScale = useRef(1);

    const pan = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                translate.setOffset({
                    // @ts-ignore
                    x: translate.x._value,
                    // @ts-ignore
                    y: translate.y._value,
                });
                translate.setValue({
                    x: 0,
                    y: 0,
                });
                // @ts-ignore
                initialScale.current = scale._value;
            },

            onPanResponderMove: ({ nativeEvent }, gestureState) => {
                const activeTouches = nativeEvent.changedTouches;
                if (
                    activeTouches.length === 1 &&
                    !initialDistanceBetweenCoord.current
                ) {
                    translate.setValue({
                        x: gestureState.dx,
                        y: gestureState.dy,
                    });
                } else if (activeTouches.length === 2) {
                    const activeTouches = nativeEvent.changedTouches;
                    const touch1 = activeTouches[0];
                    const touch2 = activeTouches[1];
                    const pointsDistance = distanceBetweenCoord(
                        [touch1.pageX, touch1.pageY],
                        [touch2.pageX, touch2.pageY]
                    );
                    if (initialDistanceBetweenCoord.current) {
                        scale.setValue(
                            initialScale.current *
                                Math.abs(
                                    pointsDistance /
                                        initialDistanceBetweenCoord.current
                                )
                        );
                    } else {
                        initialDistanceBetweenCoord.current = pointsDistance;
                    }
                }
            },
            onPanResponderRelease: () => {
                translate.flattenOffset();
                initialDistanceBetweenCoord.current = 0;
                Animated.parallel([
                    Animated.spring(translate, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }),
                    Animated.spring(scale, {
                        toValue: 1,
                        useNativeDriver: false,
                    }),
                ]).start();
            },
        })
    ).current;

    return (
        <ScreenContainer style={styles.container} goBack={goBack}>
            <Animated.Image
                {...pan.panHandlers}
                style={[
                    styles.image,
                    {
                        transform: [
                            ...translate.getTranslateTransform(),
                            { scale },
                        ],
                    },
                ]}
                // @ts-ignore
                source={require('../../assets/images/passport.jpeg')}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: { height: 200, width: 200 },
});
