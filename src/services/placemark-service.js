import axios from "axios";
import {user} from "../stores";

export class PlacemarkService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const placemarkCredentials = localStorage.placemark;
    if (placemarkCredentials) {
      const savedUser = JSON.parse(placemarkCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
        userID: savedUser.userID,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
          userID: response.data.userID,
        });
        localStorage.placemark = JSON.stringify({email: email, token: response.data.token, userID: response.data.userID});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
      userID: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("placemark");
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async userID(email) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + email);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async addPlacemark(placemark) {
    try {
      const response = await axios.post(this.baseUrl + "/api/placemarks", placemark);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  }

  async getPlacemarks() {
    try {
      const response = await axios.get(this.baseUrl + "/api/placemarks");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getUserPlacemarks(userID) {
    try {
      const response = await axios.get(this.baseUrl + "/api/placemarks/user/" + userID);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async deletePlacemark(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/placemarks/" + id);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async logVisit(visit) {
    try {
      const response = await axios.post(this.baseUrl + "/api/visit", visit);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getAllVisits() {
    try {
      const response = await axios.get(this.baseUrl + "/api/visit");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getPlacemarkVisits(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/visit/" + id);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getActivities() {
    try {
      const response = await axios.get(this.baseUrl + "/api/placemarks/activities");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(this.baseUrl + "/api/placemarks/categories");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async storeImage(image_url) {
    try {
     const response = await axios.post(this.baseUrl + "/api/visit/image", image_url);
      return response.data;
    } catch (error) {
      return [];
    }
  }
}