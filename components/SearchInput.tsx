import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbWorldSearch } from "react-icons/tb";
export function SearchInput() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="border-violet-500">
          <TbWorldSearch size={20} className="mr-2 text-gray-600" />
          <span className="text-gray-500">Search Here...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search The Missing Person</DialogTitle>
          <DialogDescription>
            Search with name of the missing person
          </DialogDescription>
        </DialogHeader>
        <div  className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Type Here"
              name="search"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button  type="submit" className="text-center bg-my-gradient">
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
