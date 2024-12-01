type UserForBookingFetchType ={
  name: string
  email: string
  role: string
}
type FacilityForBookingFetchType = {
  type: string
  courtNumber: number
}

export interface Booking {
    _id?: string
    user: UserForBookingFetchType;
    facility: FacilityForBookingFetchType;
    date: Date;
    startTime: string;
    endTime: string;
    duration: number;
    paymentAmount: number;
    isPaid: boolean;
    paymentAtCounter: boolean;
    isCancelled: boolean;
    isRefunded: boolean;
  }

  export interface BookingCreateType {
    email: string
    facilityName?: string
    facilityId: string
    date: string
    startTime: string
  }

  export interface AdminBookingCreateType {
    email: string
    facilityName?: string
    facilityId: string
    dates: string[]
    startTime: string
    endTime: string
  }