
import {apiSlice} from "./apiSlice.js";

const INVOICES_URL = '/api/payment'

export const invoiceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        saveInvoice: builder.mutation({
            query:(data)=>({
                url: `${INVOICES_URL}/add`,
                method: 'POST',
                body: data
            })
        }),
        updateInvoice: builder.mutation({
            query:(data)=>({
                url: `${INVOICES_URL}/update`,
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
        deleteInvoice: builder.mutation({
            query:(data)=> ({
                url: `${INVOICES_URL}/delete`,
                method: 'DELETE',
                body:data
            })
        }),
        getAllInvoices:builder.query({
            query:()=>({
                url: `${INVOICES_URL}`,
                method:'GET'
            })
        }),
        getInvoiceDetails:builder.query({
            query:(id)=>({
                url: `${INVOICES_URL}/${id}`,
                method:'GET'
            })
        })
    })
})





export const {useSaveInvoiceMutation,useUpdateInvoiceMutation, useDeleteInvoiceMutation, useGetAllInvoicesQuery, useGetInvoiceDetailsQuery} = invoiceApiSlice