import { StyleSheet, View, Dimensions, Image } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    useDerivedValue,
} from 'react-native-reanimated';
import { memo } from 'react';

export const { height } = Dimensions.get('screen');
export const imageBigHeight = Math.round(height * 0.7);
const imageSmallHeight = 80;

const ChanelItem = ({ path, scrollY, index, credit }) => {
    const inputRange = [imageBigHeight * (index - 1), imageBigHeight * index];
    const animatedImageHeight = useDerivedValue(() =>
        interpolate(
            scrollY.value,
            inputRange,
            [imageSmallHeight, imageBigHeight],
            Extrapolate.CLAMP
        )
    );
    const animatedImage = useAnimatedStyle(() => ({
        height: animatedImageHeight.value,
    }));
    const animatedTitleScale = useDerivedValue(() =>
        interpolate(scrollY.value, inputRange, [0.5, 1], Extrapolate.CLAMP)
    );
    const animatedTitle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: animatedTitleScale.value,
            },
        ],
    }));
    const animatedSubTitleOpacity = useDerivedValue(() =>
        interpolate(scrollY.value, inputRange, [0, 1], Extrapolate.CLAMP)
    );
    const animatedSubTitle = useAnimatedStyle(() => ({
        opacity: animatedSubTitleOpacity.value,
    }));

    return (
        <Animated.View style={animatedImage}>
            <Image source={path} style={styles.image} />
            <View style={styles.textContainer}>
                <Animated.Text style={[styles.title, animatedTitle]}>
                    Car {index + 1}
                </Animated.Text>
                <Animated.Text
                    style={[styles.subtitle, animatedSubTitle]}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    Captured by - {credit} from Unsplash.
                </Animated.Text>
            </View>
        </Animated.View>
    );
};

export default memo(ChanelItem);

const styles = StyleSheet.create({
    image: {
        height: undefined,
        width: undefined,
        ...StyleSheet.absoluteFillObject,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 28,
    },
    subtitle: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 15,
    },
});
