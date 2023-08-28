import store from "../store/TodoStore";

const themeChannel = new BroadcastChannel('theme');

export const handleSwitch = (action: string) => {
    store.changeTheme(action);
    themeChannel.postMessage(action);
}

export const handleListenTheme = () => {
    themeChannel.onmessage = (event) => {
        store.changeTheme(event.data);
    }

    return () => themeChannel.close();
}
