
import ApiHandler from "./apihandler";
import endpoint from "./endpoints";
export const getCategories = async () => {
    try {
      const response = await ApiHandler().get(endpoint.CATEGORIES);
      console.log('Get Categories Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get Categories Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
export const getPateintProfile = async () => {
    try {
      const response = await ApiHandler().get(endpoint.GET_PATIENT_PROFILE);
      console.log('Get patient Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get patient Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
 export const bookAppointment = async (body)=> {
  console.log('Booking appoitnment body',body)
  try {
    const response = await ApiHandler().post(endpoint.BOOKING, body);
    console.log('BOOKING APPOINTMENT Response', response.data)
    return response.data
  }catch(error){
    console.error('Book Appointment Error:', error.response ? error.response.data : error.message);
    throw error;
  }
 } 
  
 export const updatePateintProfile = async (body) => {
  console.log("update Pateint Profile BODY => ",body)
  try {
    const response = await ApiHandler().patch(endpoint.UPDATE_PATIENT_PROFILE, body);
    console.log('Update Nurse Profile Response:', response.data);
    return response.data;
    } catch (error) {
      console.error('Update Nurse Profile Error:', error.response ? error.response.data : error.message);
      throw error;
      }
}