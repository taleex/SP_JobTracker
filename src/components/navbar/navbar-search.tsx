import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import SearchIcon from "../shared/search-icon";

export default function NavbarSearch() {
  return (
    <>
      <InputGroup className="max-w-[40%] p-5">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
