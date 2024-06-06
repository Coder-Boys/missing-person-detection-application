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
        <Button variant={"outline"} className="border-green-500">
          <TbWorldSearch size={20} className="mr-2 text-gray-600" />
          <span className="text-gray-500">Search found person...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View the found person</DialogTitle>
          <DialogDescription>
            Search the name of the found person
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Name of person"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="text-center">
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
