import React, { Fragment, Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import {pointGET, pointGETMe} from "../Public/redux/actions/point";
import {usersGETMe} from "../Public/redux/actions/users";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-community/async-storage";
import isEmpty from 'lodash.isempty'
class Ledearboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaderpoint: [],
      spinner: true,
      leaderpointme: [],
      profil: [],
      id: null
    };
    AsyncStorage.getItem("id", (error, result) => {
      if (result) {
        this.setState({
          id: result,
          isLogin : true
        });
      }
    });
  }
  componentDidMount = async () => {
    // await this.fetchUser();
    await this.props.dispatch(pointGET()).then(() => {
      this.setState({
        spinner: false,
        leaderpoint: this.props.point.listPoint.result
      });
    });
    await this.props.dispatch(pointGETMe(this.state.id)).then(() => {
      this.setState({
        spinner: false,
        leaderpointme: this.props.point.listPoint.result[0]
      });
    });
    await this.props.dispatch(usersGETMe(this.state.id)).then(() => {
      this.setState({
        spinner: false,
        profil: this.props.users.listUsers.result[0]
      });
    });
    console.log('ini props', this.state.leaderpointme)
  };
  
  render() {
    return (
      <Fragment>
        <View style={style.navbar}>
          <TouchableOpacity
            style={style.profilnavbar}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="long-arrow-left" style={style.iconback} />
          </TouchableOpacity>
          <Text style={style.textLeader}>Ledearboard</Text>
        </View>
        <View style={style.body}>
          <View style={style.board}>
            <View
              style={{
                flexDirection: "row",
                marginTop: "13%",
                marginLeft: "6%"
              }}
            >
              <View style={{ width: 80, height: 80, flexDirection: "column" }}>
                <Text style={style.textrankpoin}>Rank</Text>
                <Text style={style.textrankpoin}>100</Text>
              </View>
              <View style={{ width: 80, height: 80 }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    overflow: "hidden"
                  }}
                  source={{uri: this.state.leaderpointme.img_profile}}
                />
              </View>
              <View style={{ width: 80, height: 80, flexDirection: "column" }}>
                <Text style={style.textrankpoin}>Points</Text>
                <Text style={style.textrankpoin}>{this.state.leaderpointme.point}</Text>
              </View>
            </View>
            <Text style={style.textrankname}>{this.state.leaderpointme.full_name}</Text>
          </View>
          <View style={style.bodyboard}>
            <Spinner
              visible={this.state.spinner}
              textContent={"Loading..."}
              textStyle={{ color: "#fff" }}
            />
            <FlatList
              data={this.state.leaderpoint}
              renderItem={({ item }) => {
                return (
                  <View style={{ flex: 1, flexDirection: "row", margin: "1%" }}>
                    <Text style={style.textbodyboard}>1</Text>
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 100,
                        overflow: "hidden"
                      }}
                      source={{ uri: item.img_profile }}
                    />
                    <Text style={style.textbodyboardname}>{item.full_name}</Text>
                    <Text style={style.textbodyboard}>{item.point}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    point: state.point
  };
};

export default connect(mapStateToProps)(Ledearboard);
const style = StyleSheet.create({
  body: {
    flex: 3,
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
  textLeader: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: "2%",
    marginLeft: "12%"
  },
  iconback: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: "12%"
  },
  board: {
    flex: 1,
    marginTop: "30%",
    marginBottom: "99%",
    backgroundColor: "#f79237",
    width: "75%",
    height: 32,
    margin: "12%",
    borderRadius: 10,
    elevation: 5
  },
  textrankpoin: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  textrankname: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "29%"
  },
  bodyboard: {
    width: "92%",
    height: "59%",
    position: "absolute",
    marginTop: "75%",
    margin: "5%",
    marginRight: "10%"
  },
  textbodyboard: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f79237",
    textAlign: "center",
    padding: "1%"
  },
  textbodyboardname: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    paddingRight: "19%",
    paddingLeft: "2%",
    marginTop: "1%"
  }
});
