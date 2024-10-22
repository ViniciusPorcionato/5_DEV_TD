import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const LoginInput = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      maxLength={39}
      placeholder="Digite seu usuário do GitHub"
      className="h-16 w-[480px] border border-primary/50 rounded-lg bg-transparent focus:outline-none placeholder:text-center text-lg placeholder:text-primary text-center text-primary focus:placeholder:text-transparent"
    ></input>
  );
};

export const SearchInput = (props) => {
  return (
    <div className="flex justify-evenly mt-5">
      <Input
        value={props.value}
        onChange={props.onChange}
        className="w-[80%] h-[55px]"
        type="text"
        placeholder="Pesquisar..."
      />
      <button>
        <Search />
      </button>
    </div>
  );
};
