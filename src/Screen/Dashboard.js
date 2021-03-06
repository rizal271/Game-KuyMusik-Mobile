import React, { Fragment, Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import Sound from "react-native-sound";
import isEmpty from "lodash.isempty";
import Axios from "axios";
import { pointGET, pointGETMe } from "../Public/redux/actions/point";
import { usersGETMe } from "../Public/redux/actions/users";
import { getPatternNow } from "../Public/redux/actions/pattern";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

class Dashboard extends Component {
  constructor() {
    super();
    this.onButtonPress = this.onButtonPress.bind(this);
    this.state = {
      hasil: 0,
      combo: 0,
      combodb: 0,
      point: 0,
      pattern: [],
      isNow: 0,
      button: 1,
      id: 0,
      isLogin: false,
      data: [],
      patternfromdb: [],
      spinner: true,
      img: ''
    };
    AsyncStorage.getItem("img", (error, result) => {
      if (result) {
        this.setState({
          img: result
        });
      }
    });
  }
  componentDidMount = async () => {
    AsyncStorage.getItem("id", (error, result) => {
      if (result) {
        this.setState({
          id: result,
          isLogin: true
        });
      }
    });
    // await this.props.dispatch(usersGETMe(this.state.id)).then(() => {
    //   this.setState({
    //     spinner: false,
    //     data: this.props.point.listPoint.result
    //   });
    // });
    await this.props.dispatch(getPatternNow());
    this.setState({
      pattern: this.props.listpattern.patternList.result[0].pattern_type
        .split("")
        .map(Number),
      combo: this.props.listpattern.patternList.result[0].combo_lengt,
      combodb: this.props.listpattern.patternList.result[0].combo_lengt,
      spinner: false
    });
    this.setState({
      // pattern : this.state.patternfromdb.map(Number),
      button: this.state.pattern[0]
    });

    console.log("xxxxxx", this.state.combodb);
  };
  add = () => {

    this.setState({
      combo: this.state.combodb
    });
    if (this.state.id === 0) {
      alert('please Login to Save Point')
      this.props.navigation.push("Login")
    }else{
      alert('ada')
    }
    // if (this.state.data === undefined) {
    //   if (this.state.id === null) {
    //     Alert.alert(
    //       "Please Login !!!"[
    //         ({
    //           text: "Login",
    //           onPress: () => this.props.navigation.push("Login")
    //         },
    //         {
    //           text: "Cancel ",
    //           onPress: () => this.props.navigation.push("dashboard")
    //         })
    //       ]
    //     );
    //     this.setState({
    //       point: 0,
    //       hasil: 0,
    //       isNow: 0,
    //       combo: 0
    //     });
    //   } else {
    //     console.log(this.state.token);
    //     const data = {
    //       id_user: Number(this.state.id),
    //       point: this.state.point
    //     };
    //     Axios.post(
    //       `http://192.168.100.42:3344/point/me/${this.state.id}`,
    //       data
    //     ).then(res => {
    //       this.setState({
    //         point: 0,
    //         hasil: 0,
    //         isNow: 0,
    //         combo: 0
    //       });
    //       this.props.navigation.push("dashboard");
    //     });
    //   }
    // } else {
    //   console.log(this.state.data.point);
    //   if (this.state.data.point < this.state.point) {
    //     console.log(this.state.data.point);
    //     const data = {
    //       idUser: Number(this.state.id),
    //       point: this.state.point
    //     };
    //     Axios.patch(
    //       `http://192.168.100.42:3344/point/me/${this.state.id}`,
    //       data
    //     ).then(res => {
    //       this.setState({
    //         point: 0,
    //         hasil: 0,
    //         isNow: 0,
    //         combo: 0
    //       });
    //       this.props.navigation.push("dashboard");
    //     });
    //   } else {
    //     this.setState({
    //       point: 0,
    //       hasil: 0,
    //       isNow: 0,
    //       combo: 0
    //     });
    //     this.props.navigation.push("dashboard");
    //   }
    // }
  };
  onButtonPress = async (sing, numButton) => {
    if (numButton === 1) {
      await this.setState({
        button: 1
      });
      console.log("Tombol " + this.state.button);
      const audio = new Sound(sing, Sound.MAIN_BUNDLE, err => {
        if (err) {
          return;
        } else {
          audio.play(() => audio.release());
          this.setState({
            button: this.state.pattern[this.state.isNow]
          });
        }
      });
    } else if (numButton === 2) {
      await this.setState({
        button: 2
      });
      console.log("Tombol " + this.state.button);
      const audio = new Sound(sing, Sound.MAIN_BUNDLE, err => {
        if (err) {
          return;
        } else {
          audio.play(() => audio.release());
          this.setState({
            button: this.state.pattern[this.state.isNow]
          });
        }
      });
    } else if (numButton === 3) {
      await this.setState({
        button: 3
      });
      console.log("Tombol " + this.state.button);
      const audio = new Sound(sing, Sound.MAIN_BUNDLE, err => {
        if (err) {
          return;
        } else {
          audio.play(() => audio.release());
          this.setState({
            button: this.state.pattern[this.state.isNow]
          });
        }
      });
    } else if (numButton === 4) {
      await this.setState({
        button: 4
      });
      console.log("Tombol " + this.state.button);
      const audio = new Sound(sing, Sound.MAIN_BUNDLE, err => {
        if (err) {
          return;
        } else {
          audio.play(() => audio.release());
          this.setState({
            button: this.state.pattern[this.state.isNow]
          });
        }
      });
    }

    if (this.state.combo < 1) {
      alert(
        "Selamat Anda Masuk Ke Level Selanjutnya dengan Point " +
          this.state.point
      );
      this.add();
    } else {
      if (this.state.pattern[this.state.isNow] === this.state.button) {
        if (this.state.pattern.length === this.state.isNow + 1) {
          await this.setState({
            combo: this.state.combo - 1,
            isNow: 0
          });
        }
        await this.setState({
          point: this.state.point + 10,
          isNow: this.state.isNow + 1
        });
      } else {
        await this.setState({
          point: 0,
          hasil: 0,
          isNow: 0,
          combo: this.state.combo
        });
        alert("Game Over !!!, Nub Banget Si Lu, ");
      }
    }
    console.log(
      "xxxxxxxx" +
        this.state.pattern[this.state.isNow] +
        "==" +
        this.state.button
    );
    console.log("sisa combo", this.state.combo);
    console.log("point", this.state.point);
  };
  setpoint() {
    this.setState(() => {
      this.state.button = 1;
    });
    console.log("setpoint " + this.state.button);
  }
  render() {
    return (
      <View style={style.body}>
        <View style={style.navbar}>
          {this.state.isLogin === true ? (
            <TouchableOpacity
              style={style.profilnavbar}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Image
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  overflow: "hidden"
                }}
                source={{uri: this.state.img}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.profilnavbar}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="bars" style={{ fontSize: 32, color: "#fff" }} />
            </TouchableOpacity>
          )}

          {!isEmpty(this.state.id) ? (
            <TouchableOpacity
              style={style.scornavbar}
              onPress={() => this.props.navigation.navigate("Leaderboard")}
            >
              <Image
                style={{ width: 32, height: 32 }}
                source={require("../Assets/img/crown.png")}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.scornavbar}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Icon name="sign-in" style={{ fontSize: 32, color: "#fff" }} />
            </TouchableOpacity>
          )}
        </View>
        <Spinner
          // visible={true}
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={{ color: "#fff" }}
        />
        <View style={{ marginTop: 90 }}>
          <Text style={{ textAlign: "center", fontSize: 30, color: "#f79237" }}>
            POINT : {this.state.point}
          </Text>
        </View>
        <Text style={style.text}>Combo Hit : {this.state.combo}</Text>
        <Text style={style.text2}>Kuy Musik</Text>
        <Text style={style.text3}>Jos Jos Aye Aye</Text>
        {this.state.button == 1 ? (
          <TouchableOpacity
            style={[style.ellipse, { backgroundColor: "#212c3e" }]}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("boom.wav", 1)}
          />
        ) : (
          <TouchableOpacity
            style={style.ellipse}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("boom.wav", 1)}
          />
        )}

        {this.state.button == 2 ? (
          <TouchableOpacity
            style={[style.ellipse2, { backgroundColor: "#212c3e" }]}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("hihat.wav", 2)}
          />
        ) : (
          <TouchableOpacity
            style={style.ellipse2}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("hihat.wav", 2)}
          />
        )}
        {this.state.button == 3 ? (
          <TouchableOpacity
            style={[style.ellipse4, { backgroundColor: "#212c3e" }]}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("tom.wav", 3)}
          />
        ) : (
          <TouchableOpacity
            style={style.ellipse4}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("tom.wav", 3)}
          />
        )}
        {this.state.button == 4 ? (
          <TouchableOpacity
            style={[style.ellipse6, { backgroundColor: "#212c3e" }]}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("clap.wav", 4)}
          />
        ) : (
          <TouchableOpacity
            style={style.ellipse6}
            activeOpacity={0.4}
            onPress={() => this.onButtonPress("clap.wav", 4)}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users,
    point: state.point,
    listpattern: state.pattern
  };
};

export default connect(mapStateToProps)(Dashboard);
const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white"
  },
  navbar: {
    flex: 1,
    backgroundColor: "#a2c945",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    elevation: 5,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    top: 0,
    left: "0%",
    width: "100%",
    height: 56,
    position: "absolute"
  },
  profilnavbar: {
    top: 5,
    left: 5,
    position: "absolute",
    padding: 11
  },
  scornavbar: {
    top: 5,
    position: "absolute",
    alignItems: "center",
    right: 5,
    padding: 11
  },
  text: {
    top: 161.54,
    left: 133.6,
    color: "#f79237",
    position: "absolute"
  },
  text2: {
    top: 176.51,
    left: "16.39%",
    color: "#f79237",
    position: "absolute",
    fontSize: 51,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  text3: {
    top: 234.92,
    left: 125.13,
    color: "#f79237",
    position: "absolute",
    fontSize: 14
  },
  ellipse: {
    top: 356.22,
    left: 34.79,
    width: 90.34,
    height: 90.45,
    position: "absolute",
    backgroundColor: "rgba(238,206,206,1)",
    borderRadius: 100,
    elevation: 10
  },
  ellipse1: {
    top: 376.49,
    left: 54.76,
    width: 50.4,
    height: 49.91,
    position: "absolute",
    backgroundColor: "rgba(227,166,174,1)",
    borderRadius: 100
  },
  ellipse2: {
    top: 356.22,
    left: 234.38,
    width: 90.34,
    height: 90.45,
    position: "absolute",
    backgroundColor: "rgba(238,206,206,1)",
    borderRadius: 100,
    elevation: 10
  },
  ellipse3: {
    top: 376.49,
    left: 254.35,
    width: 50.4,
    height: 49.91,
    position: "absolute",
    backgroundColor: "rgba(227,166,174,1)",
    borderRadius: 100
  },

  ellipse4: {
    top: 267.29,
    left: 196.71,
    width: 75.34,
    height: 75.45,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 100,
    elevation: 10
  },
  ellipse5: {
    top: 285.01,
    left: 214.18,
    width: 40.4,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(183,200,203,1)",
    borderRadius: 100
  },
  ellipse6: {
    top: 267.29,
    left: 95.93,
    width: 75.34,
    height: 75.45,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 100,
    elevation: 10
  },
  ellipse7: {
    top: 285.01,
    left: 113.4,
    width: 40.4,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(183,200,203,1)",
    borderRadius: 100
  }

  // ellipsechange1: {
  //   top: 376.49,
  //   left: 54.76,
  //   width: 50.4,
  //   height: 49.91,
  //   position: "absolute",
  //   backgroundColor: "	#212c3e",
  //   borderRadius: 100
  // },
  // ellipsechange2: {
  //   top: 356.22,
  //   left: 234.38,
  //   width: 90.34,
  //   height: 90.45,
  //   position: "absolute",
  //   backgroundColor: "	#212c3e",
  //   borderRadius: 100,
  //   elevation: 10
  // },
  // ellipsechange4: {
  //   top: 267.29,
  //   left: 196.71,
  //   width: 75.34,
  //   height: 75.45,
  //   position: "absolute",
  //   backgroundColor: "	#212c3e",
  //   borderRadius: 100,
  //   elevation: 10
  // },
  // ellipsechange6: {
  //   top: 267.29,
  //   left: 95.93,
  //   width: 75.34,
  //   height: 75.45,
  //   position: "absolute",
  //   backgroundColor: "	#212c3e",
  //   borderRadius: 100,
  //   elevation: 10
  // },
});
