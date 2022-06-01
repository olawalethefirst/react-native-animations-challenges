import ChanelListScreen from '../screens/ChanelList';
import PenguinSwiperScreen from '../screens/PenguinSwiper';
import NativePanResponderScreen from '../screens/NativePanResponder';

const screens = [
    {
        name: 'NativePanResponder',
        description: 'Native PanResponder Implementation',
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
