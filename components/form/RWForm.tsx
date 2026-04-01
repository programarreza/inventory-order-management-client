"use client";

import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export interface FormRef {
  submit: () => void;
}

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const RWForm = forwardRef<FormRef, IProps>(({ children, onSubmit, defaultValues, resolver }, ref) => {
  const formConfig: formConfig = {};
  const formRef = useRef<HTMLFormElement>(null);

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);

  useImperativeHandle(ref, () => ({
    submit: () => {
      methods.handleSubmit(onSubmit)();
    }
  }));

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
});

RWForm.displayName = 'RWForm';

export default RWForm;
