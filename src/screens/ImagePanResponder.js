import { StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function ImagePanResponder({ navigation: { goBack } }) {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
    const savedPosition = useSharedValue({
        x: 0,
        y: 0,
    });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onStart(() => {
            savedScale.value = scale.value;
        });

    const panGesture = Gesture.Pan()
        .onUpdate(({ translationX, translationY }) => {
            positionX.value =
                savedPosition.value.x + translationX / scale.value;
            positionY.value =
                savedPosition.value.y + translationY / scale.value;
        })
        .onStart(() => {
            savedPosition.value = {
                x: positionX.value,
                y: positionY.value,
            };
        });
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (
                scale.value !== 1 ||
                positionX.value !== 0 ||
                positionY.value !== 0
            ) {
                scale.value = withSpring(1, {
                    overshootClamping: true,
                });
                positionX.value = withSpring(0, {
                    overshootClamping: true,
                });
                positionY.value = withSpring(0, {
                    overshootClamping: true,
                });
            } else {
                scale.value = withSpring(2, {
                    overshootClamping: true,
                });
            }
        });

    const composed = Gesture.Simultaneous(
        panGesture,
        Gesture.Simultaneous(pinchGesture, doubleTapGesture)
    );

    const animatedImage = useAnimatedStyle(() => ({
        transform: [
            {
                scale: scale.value,
            },
            { translateX: positionX.value },
            { translateY: positionY.value },
        ],
    }));

    return (
        <ScreenContainer style={styles.container} goBack={goBack}>
            {/* @ts-ignore */}
            <GestureDetector gesture={composed}>
                <Animated.Image
                    style={[styles.image, animatedImage]}
                    // @ts-ignore
                    source={require('../../assets/images/passport.jpeg')}
                />
            </GestureDetector>
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
