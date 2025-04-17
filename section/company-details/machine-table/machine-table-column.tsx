import { Switch } from "@/components/ui/switch"
import NewMachineDetails from "@/section/comapny/new-machine-details.form"
import { IMachine } from "@/types/machine.type"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const machineTableColumn: ColumnDef<IMachine>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-sm">{row.original.status === 'active' ? 'Active' : 'Inactive'}</span>
          <Switch checked={row.original.status === 'active'} />
        </div>
      ),
    },
    {
      accessorKey: "plant",
      header: "Plant",
      cell: ({ row }) => <div >{row.original.plant}</div>,
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      cell: ({ row }) => <div >{row.original.addedBy}</div>,
    },
    {
      accessorKey: "avgSetupTime",
      header: "Avg Setup Time",
      cell: ({ row }) => <div >{row.original.avgSetupTime}</div>,
    },
    {
      accessorKey: "hourlyCost",
      header: "Hourly Cost",
      cell: ({ row }) => <div >{row.original.hourlyCost}</div>,
    }, 
    {
      accessorKey: "action",
      header: " ",
      cell: ({ row }) => <div className="flex items-center justify-end gap-2">
        <NewMachineDetails defaultValues={{plantName: row.original.plant,
                                            machineName: row.original.name,
                                            machineType: row.original.machineType,
                                            machineCategory: row.original.machineCategory,
                                            machineManufacturer: row.original.manufacturer,
                                            spindleMaxRPM: row.original.spindleMaxRPM,
                                            efficiency: row.original.efficiency,
                                            powerConsumption: row.original.powerConsumption,
                                            allowance: row.original.allowance,
                                            setupBaseTime: row.original.setupBaseTime,
                                            ratePerHour: row.original.machineHourlyRate,
                                            setupRatePerHour: row.original.setupHourRate,
                                            maxToolLength: row.original.maxToolLength,
                                            maxToolDiameter: row.original.maxToolDiameter,
                                            maxTableLength: row.original.maxTableLength,
                                            maxTableBreadth: row.original.maxTableBreadth,
                                            maxWorkpieceWeight: row.original.maxWorkpieceWeight,
                                            toolChangeTime: row.original.toolChangeTime,
        }} />
        <Link href={`/company/${row.original.companyId}/machine/${row.original.id}`}>
          Show Details
        </Link>
      </div>,
    },
  ]