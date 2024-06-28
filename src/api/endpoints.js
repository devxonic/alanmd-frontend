const endpoint = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signUp',
  CATEGORIES: '/getAllCategories',
  DOCTORS: '/doctor/getAllDoctors',
  APPOINTMENT: '/doctor/getAllAppointments',
  UPDATE_APPOINTMENT: '/doctor/updateAppointment',
  NURSE: '/doctor/getAllNurses',
  ASSIGN_NURSE: '/doctor/assignNurse',
  BOOKING: '/patient/bookAppointment',
  MY_APPOINTMENT: '/nurse/getMyAppointments',
  GET_PATIENT_PROFILE: '/patient/getProfile',
  UPDATE_PATIENT_PROFILE: '/patient/editProfile',
  GET_DOCTOR_PROFILE: '/doctor/getProfile',
  UPDATE_DOCTOR_PROFILE: '/doctor/editProfile',
  GET_NURSE_PROFILE: '/nurse/getProfile',
  UPDATE_NURSE_PROFILE: '/nurse/editProfile',
  PATIENT_PROFILE_INFO: '/patient/PersonalInfomation',
  PATIENT_MEDICAL_INFO: '/patient/insuranceAndMedical',
};

export default endpoint;
