import React, { createContext, useContext, useState } from "react";


const LoaderContext = createContext({ loading: false, setLoading: (arg: boolean) => {} });

export function UseLoader() {
    return useContext(LoaderContext);
}

export function LoaderProvider({ children }: { children: JSX.Element}) {
    const [loading, setLoading] = useState(false);
    return (
    <LoaderContext.Provider value = {{ loading, setLoading }}>
        { children }
    </LoaderContext.Provider>
    );
}