import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function JobTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Frontend Dev</TableCell>
          <TableCell>Google</TableCell>
          <TableCell>APPLIED</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
