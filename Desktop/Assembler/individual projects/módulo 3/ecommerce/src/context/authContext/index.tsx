import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AuthStates } from "../../interfaces/authStates";

type Action =
  | {
      type: "LOGIN";
    }
  | {
      type: "LOGOUT";
    };


type Dispatch = (action: Action) => void;


const AuthStateContext = createContext<AuthStates | undefined>(undefined);

const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);

const authReducer = (state: AuthStates, action: Action): AuthStates => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true };
    case "LOGOUT":
      return { isAuthenticated: false };
    default:
      return state;
  }
};


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
  });
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};


const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };