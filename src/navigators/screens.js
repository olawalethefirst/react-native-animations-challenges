import ChanelListScreen from '../screens/ChanelList';
import PenguinSwiperScreen from '../screens/PenguinSwiper';
import NativePanResponderScreen from '../screens/ImagePanResponder';

const screens = [
    {
        name: 'ImagePanResponder',
        description: 'Image Pan Responder',
        component: NativePanResponderScreen,
    },
    {
        name: 'ChanelListScreen',
        description: 'Chanel List',
        component: ChanelListScreen,
    },
    {
        name: 'PenguinSwiperScreen',
        description: 'Penguin Swiper',
        component: PenguinSwiperScreen,
    },
];

export default screens;
