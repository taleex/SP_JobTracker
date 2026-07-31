import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function AuthForm() {
  return (
    <form>
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
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox-invalid"
                name="terms-checkbox-invalid"
              />
              <FieldLabel htmlFor="terms-checkbox-invalid">
                remember me?
              </FieldLabel>
            </Field>
          </FieldGroup>
        </Field>

        <Field orientation="horizontal">
          <Link href="/">
            <Button type="reset" variant="outline">
              back
            </Button>
          </Link>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
