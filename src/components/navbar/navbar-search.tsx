import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import SearchIcon from "../shared/search-icon";

export default function NavbarSearch() {
  return (
    <>
      <InputGroup className="app-search-input">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
