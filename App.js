import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet, View, Text, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./assets/No_Internet.png";
export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const isShow = {
    justifyContent: isConnected ? "" : "center",
    alignItems: isConnected ? "" : "center",
  };
  const INJECTED_JAVASCRIPT = `(function() {
  const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
})();`;
  return (
    <View style={[styles.container, isShow]}>
      {isConnected ? (
        <WebView
          style={styles.webview}
          source={{ uri: "https://natnaelhailu.com/" }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
        />
      ) : (
        <View style={styles.nonet}>
          <Image style={styles.nonetimg} source={NoInternet} />
          <Text style={styles.errorText}>
            Please ensure that you are connected to the internet.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10, // Adjust this value to control the gap between the image and text
  },
  nonet: {
    justifyContent: "center",
    alignItems: "center",
  },
  nonetimg: {
    width: 180,
    height: 180,
  },
});
