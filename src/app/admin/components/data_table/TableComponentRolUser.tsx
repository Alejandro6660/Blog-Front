import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableComponentRolUser } from "./DataTableComponentRolUser";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { RolUserModel } from "../../models/RolUserModel";

interface TableProps {
  rol: RolUserModel[];
  setRole: React.Dispatch<React.SetStateAction<RolUserModel[]>>;
  isLoading: boolean;
  progress: number;
}

export const TableComponentRolUser = ({
  rol,
  setRole,
  isLoading,
  progress,
}: TableProps) => {
  return (
    <>
      <div className="rounded-sm border">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Id</TableHead>
              <TableHead className="w-[50%]">Name</TableHead>
              <TableHead className="w-[20%]">Level</TableHead>
              <TableHead className="w-[10%]">Update</TableHead>
              <TableHead className="w-[10%]">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Progress value={progress} />
                </TableCell>
              </TableRow>
            ) : Array.isArray(rol) && rol.length > 0 ? (
              rol.map((item) => (
                <DataTableComponentRolUser
                  info={item}
                  key={item.id}
                  setRole={setRole}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex">
        <div className="ml-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};
