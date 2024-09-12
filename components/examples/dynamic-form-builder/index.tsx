"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  RegisterOptions,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as yup from "yup";

interface FormValues {
  [key: string]: any; // Adjust the type according to your actual form structure
}
export interface DynamicFieldData {
  id: string;
  label: string; // Label, while the same value as fieldName, is used for display purposes
  inputType: "text" | "select" | "number" | "checkbox" | "file";
  subType:
    | "integer"
    | "string"
    | "fp"
    | "dictionary"
    | "boolean"
    | "none"
    | "array";
  fieldName: string;
  fieldDescription?: string;
  defaultValue?: any;
  options?: string[];
  config?: RegisterOptions;
  min?: number;
  max?: number;
  step?: number;
  dicts?: DynamicFieldData[];
  // decimalPlaces?: number;
  optional?: boolean;
}

const defaultFields: DynamicFieldData[] = [
  {
    id: "1",
    label: "First Name",
    inputType: "text",
    subType: "string",
    fieldName: "firstName",
    defaultValue: "John",
    optional: false,
  },
  {
    id: "2",
    label: "Last Name",
    inputType: "text",
    subType: "string",
    fieldName: "lastName",
    defaultValue: "Doe",
    optional: false,
  },
  {
    id: "3",
    label: "Age",
    inputType: "number",
    subType: "integer",
    fieldName: "age",
    defaultValue: 5,
    optional: true,
    max: 5,
    min: 0,
  },
  {
    id: "4",
    label: "List items",
    inputType: "select",
    subType: "array",
    fieldName: "options",
    defaultValue: "option-1",
    optional: false,
    options: ["option-1", "option-2", "option-3"],
  },
  {
    id: "5",
    label: "are you happy?",
    inputType: "checkbox",
    subType: "boolean",
    fieldName: "happy",
    defaultValue: true,
    optional: false,
  },
];

function DynamicFieldLabel({ field }: { field: DynamicFieldData }) {
  return (
    <Label>
      {field.label}{" "}
      {!field.optional ? (
        <span className="text-[10px] text-gray-400">* required</span>
      ) : (
        ""
      )}
    </Label>
  );
}

function DynamicFieldError({ field }: { field: DynamicFieldData }) {
  const { formState } = useFormContext();
  const { errors } = formState;
  const error = errors[field.fieldName];
  return error ? (
    <Label className="text-red-500 text-xs">{error.message?.toString()}</Label>
  ) : null;
}

function DynamicInput({ field }: { field: DynamicFieldData }) {
  const { register, control } = useFormContext();

  if (
    field.inputType === "select" &&
    field.options &&
    field.options.length >= 1
  ) {
    return (
      <>
        <DynamicFieldLabel field={field} />
        <Controller
          control={control}
          name={field.fieldName}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { value, ref, onChange } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder={"Please select an option"} />
              </SelectTrigger>

              <SelectContent>
                {field.options &&
                  field.options.map((option: string) => (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }
  if (field.inputType === "text") {
    return (
      <>
        <DynamicFieldLabel field={field} />
        <Input
          type="text"
          {...register(field.fieldName)}
          placeholder={field.label}
          defaultValue={field.defaultValue}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }
  if (field.inputType === "number") {
    return (
      <>
        <DynamicFieldLabel field={field} />
        <Input
          type="number"
          {...register(field.fieldName)}
          placeholder={field.label}
          defaultValue={field.defaultValue}
          step={field.step}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }

  if (field.inputType === "checkbox") {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <DynamicFieldLabel field={field} />
          <Controller
            control={control}
            name={field.fieldName}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { value, ref, onChange } }) => (
              <Checkbox checked={value} onCheckedChange={onChange} />
            )}
          />
        </div>
        <DynamicFieldError field={field} />
      </div>
    );
  }

  if (field.inputType === "file") {
    return (
      <>
        <DynamicFieldLabel field={field} />
        <Input
          type="file"
          {...register(field.fieldName)}
          placeholder={field.label}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }

  return null;
}

function DynamicInputList({ fields }: { fields: DynamicFieldData[] }) {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    setError,
    control,
    formState,
  } = useFormContext();

  const { errors } = formState;

  return (
    <ul className="space-y-4">
      {fields.map((field, index) => {
        return (
          <li key={field.fieldName}>
            {field.subType === "dictionary" &&
            field.dicts &&
            field.dicts.length ? (
              <DynamicInputList fields={field.dicts} />
            ) : (
              <DynamicInput field={field} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

// Dynamic function to generate Yup schema
const generateYupSchema = (fields: DynamicFieldData[]): yup.AnyObjectSchema => {
  const shape = fields.reduce((acc, field) => {
    // Define basic schema for the field
    let fieldSchema: yup.AnySchema = yup.mixed();

    // Customize schema based on input type and other properties
    switch (field.inputType) {
      case "text":
        fieldSchema = yup
          .string()
          .max(
            field.max || 255,
            `${field.label} must be less than ${field.max} characters`
          )
          .min(
            field.min || 0,
            `${field.label} must be at least ${field.min} characters`
          );
        break;

      case "number":
        fieldSchema = yup
          .number()
          .transform((value, originalValue) => {
            // If originalValue is an empty string or null, transform it to undefined
            return originalValue === "" || originalValue === null
              ? undefined
              : value;
          })
          // Apply min/max if provided
          .min(
            field.min !== undefined ? field.min : 0,
            `${field.label} must be at least ${field.min}`
          )
          .max(
            field.max !== undefined ? field.max : Number.MAX_VALUE,
            `${field.label} must be at most ${field.max}`
          );

        // If optional, make the field nullable and not required
        if (field.optional) {
          fieldSchema = fieldSchema.notRequired();
        } else {
          // If not optional, make the field required
          fieldSchema = fieldSchema.required(`${field.label} is required`);
        }

        break;

      case "checkbox":
        fieldSchema = yup.boolean();

        // if not optional, boolean === true is required
        if (!field.optional) {
          fieldSchema = fieldSchema.oneOf([true], `Must be checked to proceed`);
        }

        break;

      case "select":
        fieldSchema = yup
          .string()
          .oneOf(
            field.options || [],
            `${field.label} must be one of the allowed options`
          );
        break;

      case "file":
        fieldSchema = yup.mixed(); // More complex handling might be needed for files
        break;

      default:
        fieldSchema = yup.mixed();
    }

    // Handle the required/optional state for non-number fields
    if (!field.optional && field.inputType !== "number") {
      fieldSchema = fieldSchema.required(`${field.label} is required`);
    }

    acc[field.fieldName] = fieldSchema;
    return acc;
  }, {} as Record<string, yup.AnySchema>);

  return yup.object().shape(shape);
};

// Function to generate default values
const generateDefaultValues = (fields: DynamicFieldData[]): FormValues => {
  return fields.reduce((acc: FormValues, field: DynamicFieldData) => {
    if (field.subType === "dictionary" && field.dicts) {
      // Recursively handle subfields if the inputType is 'dictionary'
      acc[field.fieldName] = generateDefaultValues(field.dicts);
    } else {
      acc[field.fieldName] = field.optional
        ? undefined
        : field.defaultValue || ""; // Use defaultValue or set an empty string
    }
    return acc;
  }, {});
};

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<DynamicFieldData[]>(defaultFields);
  const [textareaValue, setTextareaValue] = useState(
    JSON.stringify(fields, null, 2)
  );
  const yupSchema = generateYupSchema(fields);
  const defaultValues = generateDefaultValues(fields);

  const formMethods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(yupSchema),
  });

  const {
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  useEffect(() => {
    // Update form values when textarea value changes
    try {
      const parsedFields = JSON.parse(textareaValue);
      if (Array.isArray(parsedFields)) {
        setFields(parsedFields);
        parsedFields.forEach((field: any) => {
          if (field.fieldName) {
            setValue(field.fieldName, field.defaultValue || "");
          }
        });
        trigger();
      }
    } catch (e) {
      console.error("Failed to parse JSON", e);
    }
  }, [textareaValue, setValue, trigger]);

  async function onSubmit(data: Record<string, any>) {
    console.log("submit", data);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <FormProvider {...formMethods}>
          <div className="flex flex-col gap-4 sticky bottom-8">
            <DynamicInputList fields={fields} />

            <Button
              variant="default"
              size="lg"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

export default FormBuilder;
