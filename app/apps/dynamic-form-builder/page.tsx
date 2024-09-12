import FormBuilder from "@/components/examples/dynamic-form-builder";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/typography";
import { Smile } from "lucide-react";

export default function FormBuilderPage() {
  return (
    <div className="space-y-8">
      <FormBuilder />
      <Separator />
      <div className="space-y-4">
        <H3>Todo:</H3>
        <ul className="space-y-2 [&_li]:flex [&_li]:items-center [&_li]:gap-2">
          <li>
            <Checkbox checked disabled /> Validation
          </li>
          <li>
            <Checkbox checked disabled /> Generate react hook form schema from
            form items
          </li>
          <li>
            <Checkbox checked disabled /> Proof of concept{" "}
            <Smile size={16} className="stroke-green-500" />
          </li>
          <li>
            <Checkbox disabled /> Element: Textarea
          </li>
          <li>
            <Checkbox disabled /> Element: Input file
          </li>
          <li>
            <Checkbox disabled /> Element: Utilize subType for more complex form
            items and validation
          </li>
          <li>
            <Checkbox disabled /> Element: Input file
          </li>
          <li>
            <Checkbox disabled /> Drag and drop
          </li>
          <li>
            <Checkbox disabled /> Nested elements
          </li>
          <li>
            <Checkbox disabled /> Embeddable & Exportable
          </li>
        </ul>
      </div>
    </div>
  );
}
