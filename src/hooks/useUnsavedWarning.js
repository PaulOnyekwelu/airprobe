import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';

const useUnsavedWarning = (message = "There are unsaved changed, do you really want to exit?") => {
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        window.onbeforeunload = isDirty && (() => message);

        return () => {
            window.onbeforeunload = null;
        }
    }, [isDirty, message]);

    const unsavedPrompt = (<Prompt when={isDirty} message={message} />)

    return [unsavedPrompt, () => setIsDirty(true), () => setIsDirty(false)]
}

export default useUnsavedWarning;