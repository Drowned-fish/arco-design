import { useRef } from 'react';
import Store from './store';
import { FormInstance, InnerMethodsReturnType, KeyType } from './interface';

export function getFormInstance<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(): FormInstance<FormData, FieldValue, FieldKey> {
  const store = new Store<FormData, FieldValue, FieldKey>();
  return {
    getFieldsValue: store.getFieldsValue,
    getFieldValue: store.getFieldValue,
    getFieldError: store.getFieldError,
    getFieldsError: store.getFieldsError,
    getTouchedFields: store.getTouchedFields,
    getFields: store.getFields,
    setFieldValue: store.setFieldValue,
    setFieldsValue: store.setFieldsValue,
    setFields: store.setFields,
    resetFields: store.resetFields,
    submit: store.submit,
    validate: store.validate,
    scrollToField: () => {},
    getInnerMethods: (inner?: boolean): InnerMethodsReturnType<FormData, FieldValue, FieldKey> => {
      const methods = {} as InnerMethodsReturnType<FormData, FieldValue, FieldKey>;
      if (inner) {
        [
          'registerField',
          'innerSetInitialValues',
          'innerSetInitialValue',
          'innerSetCallbacks',
          'innerSetFieldValue',
          'innerGetStore',
        ].map((key) => {
          methods[key] = store[key];
        });
      }
      return methods;
    },
  };
}

export default function useForm<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(
  form?: FormInstance<FormData, FieldValue, FieldKey>
): [FormInstance<FormData, FieldValue, FieldKey>] {
  const formRef = useRef<FormInstance<FormData, FieldValue, FieldKey>>(form);

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    }
    formRef.current = getFormInstance<FormData, FieldValue, FieldKey>();
  }
  return [formRef.current];
}
