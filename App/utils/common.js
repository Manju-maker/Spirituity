import DeviceInfo from 'react-native-device-info';
export function isIphoneX() {
    return (
        DeviceInfo.getModel() === "iPhone X" || DeviceInfo.getModel() === "iPhone"
    );
}