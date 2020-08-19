export const login = (ft) => {
    return {
        type: 'LOGIN',
        firstTime: ft
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

