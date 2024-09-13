import FormBuilder from "@/components/examples/dynamic-form-builder";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Code, H1, H3, P, Pre } from "@/components/ui/typography";
import { siteConfig } from "@/lib/seo";
import { Smile } from "lucide-react";
import { Metadata } from "next";

export default function FormBuilderPage() {
  return (
    <div className="space-y-8">
      <H1>Dynamic form builder</H1>
      <P>
        What&apos;s this? This is a proof of concept app that allows you to
        build highly dynamic forms from a JSON api. This includes valiation
        provided by <Code>yup</Code> and <Code>react-hook-form</Code>
      </P>
      <P>
        Try editing the JSON on the left, and immediately see the resulting form
        on the right.
      </P>
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

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  return {
    title: `App: Dynamic Form Builder | ${siteConfig.name}`,
    description:
      "Generate highly functional forms from a JSON API with React hook form, yup validation.",
  };
}
