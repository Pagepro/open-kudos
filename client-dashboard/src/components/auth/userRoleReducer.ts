import { AnyAction } from "redux"
import { userRoleActions } from "../../setup/actions";

const defaultState = {
    is_admin: false,
    is_owner: false,
    is_primary_owner: false
}

const userRole = (state = defaultState, action: AnyAction) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case userRoleActions.setUserRole:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}

export default userRole
