import {
  Card,
  CardBody,
  CardHeader, getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react'

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    sujet: "CEO",
  },
  {
    key: "2",
    name: "Zoey Lang",
    sujet: "Technical Lead",
  },
  {
    key: "3",
    name: "Jane Fisher",
    sujet: "Senior Developer",
  },
  {
    key: "4",
    name: "William Howard",
    sujet: "Community Manager",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "sujet",
    label: "SUJET",
  },
];import React from "react";

const  OldList: React.FC = () => {
  const handleRowClick = (item:any) => {
    alert(`You clicked on ${item.name}, who is the ${item.sujet}.`);
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">

        <Table
          aria-label="Example static collection table"
          color={"primary"}
          defaultSelectedKeys={["1"]}
          selectionMode="single"

        >
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}
                        onClick={()=>
                          handleRowClick(item)
                        }
              >
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );

}
export default OldList