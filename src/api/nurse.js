import ApiHandler from "./apihandler";
import endpoint from "./endpoints";

export const getMyAppointment = async () => {
    try {
      const response = await ApiHandler().get(endpoint.MY_APPOINTMENT);
      console.log('Get All Appointment Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get All Appointment Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const getNurseProfile = async () => {
    try {
      const response = await ApiHandler().get(endpoint.GET_NURSE_PROFILE);
      console.log('Get Nurse Profile Response:', response.data);
      return response.data;
      } catch (error) {
        console.error('Get Nurse Profile Error:', error.response ? error.response.data : error.message);
        throw error;
      }
  }
  
  export const updateNurseProfile = async (body) => {
    console.log("update Nurse Profile BODY => ",body)
    try {
      const response = await ApiHandler().patch(endpoint.UPDATE_NURSE_PROFILE, body);
      console.log('Update Nurse Profile Response:', response.data);
      return response.data;
      } catch (error) {
        console.error('Update Nurse Profile Error:', error.response ? error.response.data : error.message);
        throw error;
        }
  }
    