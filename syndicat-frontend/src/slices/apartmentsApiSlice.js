
import {apiSlice} from "./apiSlice.js";

const APARTMENTS_URL = '/api/apartment'

export const apartmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        saveApartment: builder.mutation({
            query:(data)=>({
                url: `${APARTMENTS_URL}/add`,
                method: 'POST',
                body: data
            })
        }),
        updateApartment: builder.mutation({
            query:(data)=>({
                url: `${APARTMENTS_URL}/update-apartment`,
                method: 'PATCH',
                body: data
            })
        }),
        // updateUser: builder.mutation({
        //     query:(data)=>({
        //         url: `${USERS_URL}/users/updateUser`,
        //         method: 'PATCH',
        //         body: data
        //     })
        // }),
        // verifyEmail: builder.mutation({
        //     query:(data)=>({
        //         url: `${USERS_URL}/mail/verify-email`,
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        // forgotPassword: builder.mutation({
        //     query:(data)=>({
        //         url: `${USERS_URL}/forgotPassword`,
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        // resetPassword: builder.mutation({
        //     query:(data)=>({
        //         url: `${USERS_URL}/resetPassword`,
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        deleteApartment: builder.mutation({
            query:(data)=> ({
                url: `${APARTMENTS_URL}/delete`,
                method: 'DELETE',
                body:data
            })
        }),
        getAllApartments:builder.query({
            query:()=>({
                url: `${APARTMENTS_URL}`,
                method:'GET'
            })
        }),
        getApartmentDetails:builder.query({
            query:(id)=>({
                url: `${APARTMENTS_URL}/${id}`,
                method:'GET'
            })
        })
    })
})





export const {useSaveApartmentMutation,useUpdateApartmentMutation, useDeleteApartmentMutation, useGetAllApartmentsQuery, useGetApartmentDetailsQuery} = apartmentsApiSlice