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
import { H2 } from "@/components/ui/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { RefreshCw } from "lucide-react";
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
    | "array"
    | "email";
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
  placeholder?: string;
}

// const templates = [
//   {
//     name: "Signup Form",
//     fields: [

//     ]
//   }
// ]
const defaultFields: DynamicFieldData[] = [
  {
    id: "email",
    label: "Email",
    inputType: "text",
    subType: "email",
    fieldName: "email",
    defaultValue: "",
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
    defaultValue: false,
    optional: false,
  },
];

function DynamicFieldLabel({
  id,
  field,
}: {
  id?: string;
  field: DynamicFieldData;
}) {
  if (!field.label) return null;
  return (
    <Label htmlFor={id}>
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
        <DynamicFieldLabel field={field} id={field.id} />
        <Controller
          control={control}
          name={field.fieldName}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { value, ref, onChange } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger id={field.id}>
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
        <DynamicFieldLabel field={field} id={field.id} />
        <Input
          type="text"
          {...register(field.fieldName)}
          placeholder={field.label}
          defaultValue={field.defaultValue}
          id={field.id}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }
  if (field.inputType === "number") {
    return (
      <>
        <DynamicFieldLabel field={field} id={field.id} />
        <Input
          type="number"
          {...register(field.fieldName)}
          placeholder={field.label}
          defaultValue={field.defaultValue}
          step={field.step}
          id={field.id}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }

  if (field.inputType === "checkbox") {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Controller
            control={control}
            name={field.fieldName}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { value, ref, onChange } }) => (
              <Checkbox
                checked={value}
                onCheckedChange={onChange}
                id={field.id}
              />
            )}
          />
          <DynamicFieldLabel field={field} id={field.id} />
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
          id={field.id}
        />
        <DynamicFieldError field={field} />
      </>
    );
  }

  return null;
}

function DynamicInputList({ fields }: { fields: DynamicFieldData[] }) {
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
        if (field.subType === "email") {
          fieldSchema = yup.string().email("Invalid email address");
        } else {
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
        }

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
        fieldSchema = yup
          .boolean()
          .default(false) // Default value should be false unless otherwise specified
          .transform((value, originalValue) => {
            // Convert empty string or other falsy values to false
            return originalValue === "" ? false : value;
          });

        // If required, ensure the checkbox is checked (true)
        if (!field.optional) {
          fieldSchema = fieldSchema.oneOf(
            [true],
            `This is not optional, please check the box`
          );
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
  const [output, setOutput] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <div className="space-y-4">
      {/* <div className="space-y-0">
        <H2>Templates</H2>
        <ul className="flex flex-wrap gap-4">
          <li>
            <Button variant={"outline"}>Signup Form</Button>
          </li>
          <li>
            <Button variant={"outline"}>Sign in Form</Button>
          </li>
        </ul>
      </div> */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-0 flex flex-col">
          <H2 className="!mt-0">Input</H2>

          <Textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className="font-mono h-full"
            autoHeight
          />
        </div>
        <div className="space-y-0">
          <div className="flex justify-between">
            <H2 className="!mt-0">Preview</H2>

            <Button
              size={"icon-sm"}
              variant={"outline"}
              onClick={() => setIsRefreshing(true)}
            >
              <RefreshCw size="12" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
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
        <div></div>
      </div>

      <div className="space-y-0">
        <H2>Form output</H2>
        <pre className="border border-gray-700 p-4 rounded">{output}</pre>
      </div>
    </div>
  );
};

export default FormBuilder;
