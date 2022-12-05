import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

import React, { Component } from "react";
import { BackHandler } from "react-native";

export default class App extends Component {
	WEBVIEW_REF: React.RefObject<any>;
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.WEBVIEW_REF = React.createRef();
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
	}

	handleBackButton = () => {
		this.WEBVIEW_REF.current.goBack();
		return true;
	};

	onNavigationStateChange(navState: { canGoBack: any }) {
		this.setState({
			canGoBack: navState.canGoBack,
		});
	}

	render(): React.ReactNode {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<StatusBar style="auto" />
					<WebView
						source={{ uri: "https://www.goldenworldfashion.com/" }}
						ref={this.WEBVIEW_REF}
						onNavigationStateChange={this.onNavigationStateChange.bind(this)}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
});
