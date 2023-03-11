import * as yup from 'yup'


export const otpSchema = yup
    .object()
    .shape({
        otp: yup
            .string()
            .length(3, "enter a valid otp")
            .required("Please enter the otp sent.")
        ,
    })

export const passwordSchema = yup
    .object()
    .shape({
        password: yup
            .string()
            .min(6, ({ min }) => `Password should be at least ${min} characters`)
            .max(30, ({ max }) => `Password should not be more than ${max} characters`)
            .required()
    })

export const emailSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .email('Please enter a valid email address')
            .required('email address is required')
    })

export const refSchema = yup
    .object()
    .shape({
        serial_no: yup
            .string()
            .matches(/^\D{3}\/d{2}\/d{2}/, "Provide a valid reference number")
            .required('reference no is required')
    })


export const basicInfoSchema = yup
    .object()
    .shape({
        firstname: yup
            .string()
            .min(3, ({ min }) => `Firstname must be at least ${min} characters`)
            .max(20, ({ max }) => `Firstname must not be more than ${max} characters`)
            .matches(/^[a-zA-Z\S]{2,30}$/, "No space allowed between names")
            .required("Please enter your firstname")
        ,
        lastname: yup
            .string()
            .min(3, ({ min }) => `Firstname must be at least ${min} characters`)
            .max(20, ({ max }) => `Firstname must not be more than ${max} characters`)
            .matches(/^[a-zA-Z\S]{2,30}$/, "No space allowed between names")
            .required("Please enter your lastname")
        ,
        nickname: yup
            .string()
            .min(3, ({ min }) => `Firstname must be at least ${min} characters`)
            .max(20, ({ max }) => `Firstname must not be more than ${max} characters`)
            .optional()
        ,
        phone: yup
            .string()
            .matches(/^\d{11}$/, "Enter a valid phone number")
            .length(11, "phone number must be 11 characters long")
            .required("Please enter your phone number")
    })