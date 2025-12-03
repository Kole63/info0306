import {Image, StyleSheet, StyleProp, ViewStyle, type ImageSourcePropType, View} from 'react-native';

interface Props {
    source: ImageSourcePropType;
    style?: StyleProp<ViewStyle>;
}

export default function CustomImage({ source, style }: Props) {
    return (
        <View style={[styles.container, style]}>
            <Image source={source} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});



