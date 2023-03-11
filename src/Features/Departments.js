import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'departments',
    initialState: {
        departments: {},
        userDepartments: {}
    },
    reducers: {
        updateDepartment: (state, { payload }) => {
            if (payload) {
                state.departments = payload
            }
        },
        updateUserDepartment: (state, { payload }) => {
            if (payload) {
                state.userDepartments = payload
            }
        }
    },
})

export const { updateDepartment, updateUserDepartment } = slice.actions

export default slice.reducer
