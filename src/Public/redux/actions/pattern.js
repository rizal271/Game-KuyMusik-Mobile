import axios from "axios";
// let URL = "http://192.168.6.195:3344";
let URL = 'https://kuymusik.herokuapp.com';

export const patternALL = () => {
  return {
    type: "PATTERN_ALL",
    payload: axios.get(URL + "/pattern", {
      headers: {
        authorization: "w3lc0meto4pp"
      }
    })
  };
};

export const getPatternNow = () => {
  return {
    type: "GET_PATTERN_NOW",
    payload: axios.get(URL + "/pattern/now/", {
      headers: {
        authorization: "w3lc0meto4pp"
      }
    })
  };
};

export const insertpattern = data => {
    console.log('ini id', data)
  return {
    type: "INSERT_PATTERN",
    payload: axios.post(URL + "/pattern", data[0], {
      headers: {
        authorization: "w3lc0meto4pp"
      }
    })
  };
};
export const updatepatternaktif = id_pattern => {
    
    return {
      type: "ACTIVE_PATTERN",
      payload: axios.patch(URL + `/pattern/${id_pattern}`, {
        headers: {
          authorization: "w3lc0meto4pp"
        }
      })
    };
  };
