import React from 'react';
import { Dimensions, ImageBackground, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import bg from './assets/images/bg.png';
import snowFlower from './assets/images/ice.png';
// import moneyBack from './assets/images/money-back@2x.png';
// import moneyBack from './assets/images/money-back.png';

const MONEY_DIMENSIONS = { width: 49, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;

const FlippingImage = ({ back = false, delay, duration = 1000, source, style = {} }) => (
    <Animatable.Image
        animation={{
            from: { rotateX: back ? '0deg' : '180deg', rotate: !back ? '180deg' : '0deg' },
            to: { rotateX: back ? '360deg' : '-180deg', rotate: !back ? '180deg' : '0deg' },
        }}
        duration={duration}
        delay={delay}
        easing="linear"
        iterationCount="infinite"
        useNativeDriver
        source={source}
        style={{
            ...style,
            backfaceVisibility: 'hidden',
        }}
    />
);

const Swinging = ({ amplitude, rotation = 7, delay, duration = 700, children }) => (
    <Animatable.View
        animation={{
            0: {
                translateX: -amplitude,
                translateY: -amplitude * 0.8,
                rotate: `${rotation}deg`,
            },
            0.5: {
                translateX: 0,
                translateY: 0,
                rotate: '0deg',
            },
            1: {
                translateX: amplitude,
                translateY: -amplitude * 0.8,
                rotate: `${-rotation}deg`,
            },
        }}
        delay={delay}
        duration={duration}
        direction="alternate"
        easing="ease-in-out"
        iterationCount="infinite"
        useNativeDriver
    >
        {children}
    </Animatable.View>
);

const Falling = ({ duration, delay, style, children }) => (
    <Animatable.View
        animation={{
            from: { translateY: -MONEY_DIMENSIONS.height - WIGGLE_ROOM },
            to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM },
        }}
        duration={duration}
        delay={delay}
        easing={t => Math.pow(t, 1.7)}
        iterationCount="infinite"
        useNativeDriver
        style={style}
    >
        {children}
    </Animatable.View>
);

const ErlichBachman = ({ children }) => (
    <ImageBackground source={bg} style={{ flex: 1 }}>
        {children}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{
                textAlign:'center'
            }}>
                SEBENTAR LAGI TAHUN 2019 
            </Text>
            <Text style={{ textAlign: 'center', margin: 10, }}>
                MARI KITA BERDOA SEJENAK UNTUK INDONESIA ATAS MUSIBAH BENCANA ALAM BELAKANGAN INI, AGAR KITA KEMBALI KE JALAN YG TELAH DIAJARKAN TUHAN PADA KITAB ANDA MASING-MASING.
            </Text><Text style={{ textAlign: 'center' }}>
                ^_^
            </Text>
            <Text style={{ textAlign: 'center' }}>
                Zayed Elfasa
            </Text>
        </View>
    </ImageBackground>
);

const randomize = max => Math.random() * max;

const range = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(i);
    }
    return array;
};

const MakeItRain = ({ count = 15, duration = 3000 }) => (
    <ErlichBachman>
        {range(count)
            .map(i => randomize(10))
            .map((flipDelay, i) => (
                <Falling
                    key={i}
                    duration={duration}
                    delay={i * (duration / count)}
                    style={{
                        position: 'absolute',
                        paddingHorizontal: WIGGLE_ROOM,
                        left: randomize(SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width) - WIGGLE_ROOM,
                    }}
                >
                    <Swinging amplitude={MONEY_DIMENSIONS.width / 5} delay={randomize(duration)}>
                        <FlippingImage style={{ width: 20, height: 20 }} source={snowFlower} delay={flipDelay} />
                        <FlippingImage
                            style={{ width: 20, height: 20 }}
                            source={snowFlower}
                            delay={flipDelay}
                            back
                            style={{ position: 'absolute' }}
                        />
                    </Swinging>
                </Falling>
            ))}
    </ErlichBachman>
);

export default MakeItRain;