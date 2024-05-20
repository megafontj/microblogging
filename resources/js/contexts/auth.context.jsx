import React, {createContext, useReducer, useContext, useMemo} from 'react';
import { getToken } from "../utils/token.js";

const initialState = {
    isAuthorized: !!getToken(),
    account: null,
};

export const AuthContext = createContext(initialState);

function authReducer(state, action) {
    switch (action.type) {
        case 'SET_AUTHORIZED': {
            return {
                ...state,
                isAuthorized: true,
            };
        }
        case 'SET_UNAUTHORIZED': {
            return {
                ...state,
                isAuthorized: false
            }
        }
        case 'SET_ACCOUNT_INFO': {
            return {
                ...state,
                account: action.value,
            };
        }
        default:
            return state;
    }
}

export function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const authorize = () => dispatch({ type: 'SET_AUTHORIZED' });
    const unAuthorize = () => dispatch({ type: 'SET_UNAUTHORIZED' });
    const setAccountInfo = (value) => dispatch({ type: "SET_ACCOUNT_INFO", value: value });

    const value = useMemo(() => {
        return {
            ...state,
            authorize,
            unAuthorize,
            setAccountInfo
        }
    }, [state]);

    return (<AuthContext.Provider value={value} {...props} />);
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
