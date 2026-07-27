import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormInputs() {
  return (
    <>
      <FieldGroup>
        <div className="form-row">
          <Field>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              placeholder="e.g. Frontend Developer"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="e.g. Acme Corp"
              required
            />
          </Field>
        </div>
      </FieldGroup>
      <FieldGroup>
        <Field>
          <Label htmlFor="jobLink">Job Link</Label>
          <Input
            id="jobLink"
            name="jobLink"
            type="url"
            placeholder="https://..."
          />
        </Field>
        <Field>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            className="select-input"
            defaultValue="APPLIED"
          >
            <option value="SAVED">Saved</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="GHOSTED">Ghosted</option>
          </select>
        </Field>
      </FieldGroup>
      <FieldGroup>
        <div className="form-row">
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Job description..."
            />
          </Field>
          <Field>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Any notes..." />
          </Field>
        </div>
      </FieldGroup>
    </>
  );
}
