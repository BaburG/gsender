import React from 'react';

import ControlledInput from './ControlledInput';

import styles from './index.module.styl';

const PasswordInput = ({ setting, info, onChange, disabled }) => {
    const { unit = null } = info;
    let { value } = setting;

    return (
        <div className={styles.inputRow}>
            <ControlledInput
                type="password"
                className={styles.textInput}
                value={value}
                externalOnChange={onChange}
                disabled={disabled}
            />
            {unit && <span className={styles.unit}>{unit}</span>}
        </div>
    );
};

export default PasswordInput;
