import { API } from './axiosUrl'
import customAxios from './axiosConfig'
import { FacilityUnit } from '../types/FacilityUnit'
import { Facility } from '../types/Facility'
import { OpeningHour } from '../types/OpeningHour'
import { User, SignInType } from '../types/User'
import { AxiosRequestForFetchDataType } from '../types/AxiosRequestForFetchData'
import { BookingCreateType } from '../types/Booking'
import { CreateBookingObjType } from '../page/BookingClient'


//auth
export const axiosSignUp= async (newUser: User) => await API.post('/auth/signup', newUser) //signup (create user)
export const axiosEmailConfirm = async (token: string) => await API.get(`/auth/confirm/${token}`) //confirm email
export const axiosSignIn = async (user: SignInType) => await API.post('/auth/signin', user) //signin
export const axiosForgotPassword = async({email}:{email:string})=>
   await API.post('/auth/forgot-password', {email})
export const axiosResetPassword = async(token: string, {password}:{password: string})=> 
    await API.post(`/auth/reset-password/${token}`, {password})
//auth Google
export const axiosGoogleSignIn = async()=> await API.get('/auth/google')

//When user is trying to create a booking
//find available time.Param: facility and date (object body)
export const axiosAvailableTime = async (bodyObject: AxiosRequestForFetchDataType) =>
    await API.post('/booking-client/available-time', bodyObject)
export const axiosAvailableCourt = async (bodyObject: AxiosRequestForFetchDataType) =>
    await API.post('/booking-client/available-court', bodyObject)
export const axiosAvailableDuration = async (bodyObject: AxiosRequestForFetchDataType) =>
    await API.post('/booking-client/available-duration', bodyObject)

// When user is submitting for final booking
export const axiosUserBookingCreate = async (facililyId: string, bookingObj: CreateBookingObjType) =>
    await customAxios.post(`/booking-client-final/${facililyId}`, bookingObj)
export const axiosFetchBookingsByUser = async()=>
    await customAxios.get(`/booking-client/booking-for-user`)
export const axiosCancelBookingByUser = async(bookingId:string)=>
    await customAxios.post(`/booking-client/${bookingId}`)


//admin
//facility Unit CRUD
export const axiosCreateFacilityUnit = async (facilityUnit: FacilityUnit) =>
    await customAxios.post('/facilityunit', facilityUnit)
export const axiosFetchFacilityUnits = async () => await API.get('/facilityunit')
export const axiosDeleteFacilityUnit = async (facilityUnitId: string) =>
    await customAxios.delete(`/facilityunit/${facilityUnitId}`)

//facility CRUD
export const axiosFetchFacility = async () => await customAxios.get('/facility')
export const axiosDeleteFacility = async (facililyId: string) => await customAxios.delete(`/facility/${facililyId}`)
export const axiosCreateFacility = async (newFicility: Facility) => await customAxios.post('/facility', newFicility)
export const axiosFetchFacilityById = async (facilityId: string) => await customAxios.get(`/facility/${facilityId}`)
export const axiosUpdateFacility = async (facilityId: string, editFacility: Facility) =>
    await customAxios.post(`/facility/${facilityId}`, editFacility)

//opening hour CRUD
export const axiosFetchOpeningHour = async () => await customAxios.get('/openinghour')
export const axiosDeleteOpeningHour = async (openingHourtId: string) => customAxios.delete(`/openinghour/${openingHourtId}`)
export const axiosFetchOpeningHourById = async (openingHourtId: string) => customAxios.get(`/openinghour/${openingHourtId}`)
export const axiosUpdateOpeningHour = async (openingHourtId: string, editOpeningHour: OpeningHour) =>
    customAxios.post(`/openinghour/${openingHourtId}`, editOpeningHour)
export const axiosCreateOpeningHour = async (newOpeningHour: OpeningHour) => customAxios.post('/openinghour', newOpeningHour)

//booking CRUD
export const axiosFetchBookings = async () => await customAxios.get('/booking')
// export const axiosFetchBookingById = async(bookingId:string)=>
//     await API.get(`/booking/${bookingId}`) // This is for Edit booking
export const axiosAdminCreateBooking = async(bookingObjAdmin:BookingCreateType) =>
    await customAxios.post(`/booking`, bookingObjAdmin)
//export const axiosDeleteBooking = async (id: string) => await API.get(`/booking/${id}`)
export const axiosGetBookingByDate = async(date: string) =>
    await customAxios.get(`/booking/booking-by-date/${date}`)
export const axiosFetchBookingForRefund = async()=> await customAxios.get('/booking/refund')
export const updateBookingAfterRefund_A = async(bookingId: string)=> await customAxios.post(`/booking/refund/${bookingId}`)

// users
export const axiosFetchUsers = async () => await customAxios.get('/user')
export const axiosDeleteUser = async (userId: string) => await customAxios.delete(`/user/${userId}`)
export const axiosUserById = async(userId: string)=> await customAxios.get(`/user/${userId}`)
export const axiosEditUser = async(userId:string, userData: User) => customAxios.post(`/user/${userId}`, userData)
