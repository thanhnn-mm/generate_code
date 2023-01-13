import { ErrorMessage } from '@hookform/error-message';
import { Checkbox, Form, RadioGroupProps, Typography } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '../../interfaces/form';

const { Text } = Typography;

function CustomCheckBoxGroup(props: CommonFormProps<RadioGroupProps>) {
    const { name, label, showError = true, childProps, wrapperProps, onChangeCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, `${name}`, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item {...wrapperProps} label={label} htmlFor={name} help={errorElement} validateStatus={isHaveError ? 'error' : undefined}>
                    <Checkbox.Group {...childProps} ref={ref} id={name} value={value} onChange={handleOnChange(onChange)} />
                </Form.Item>
            )}
        />
    );
}

export default CustomCheckBoxGroup;
