
import {apiSlice} from "./apiSlice.js";

const CLIENTS_URL = '/api/client'

export const clientsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        saveClient: builder.mutation({
            query:(data)=>({
                url: `${CLIENTS_URL}/add-client`,
                method: 'POST',
                body: data
            })
        }),
        updateClient: builder.mutation({
            query:(data)=>({
                url: `${CLIENTS_URL}/update-client`,
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
        deleteClient: builder.mutation({
            query:(data)=> ({
                url: `${CLIENTS_URL}/delete-client`,
                method: 'DELETE',
                body:data
            })
        }),
        getAllClients:builder.query({
            query:()=>({
                url: `${CLIENTS_URL}`,
                method:'GET'
            })
        }),
        getClientDetails:builder.query({
            query:(id)=>({
                url: `${CLIENTS_URL}/${id}`,
                method:'GET'
            })
        })
    })
})





export const {useSaveClientMutation,useUpdateClientMutation, useDeleteClientMutation, useGetAllClientsQuery, useGetClientDetailsQuery} = clientsApiSlice