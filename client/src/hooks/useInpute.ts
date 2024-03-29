import React, { useState } from "react"

export const useInput = (initialValue:string) => {

    const [value, set$value] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        set$value(e.target.value);
    }
    return { value, onChange }
}
