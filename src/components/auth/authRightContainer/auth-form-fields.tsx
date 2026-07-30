import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function AuthForm() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />

        {/* Checkbox - Remember me */}
        <FieldGroup className="mx-auto w-56">
          <Field orientation="horizontal" data-invalid>
            <Checkbox
              id="terms-checkbox-invalid"
              name="terms-checkbox-invalid"
              aria-invalid
            />
            <FieldLabel htmlFor="terms-checkbox-invalid">
              Accept terms and conditions
            </FieldLabel>
          </Field>
        </FieldGroup>
        <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription>
      </Field>

      <Field orientation="horizontal">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
  );
}
