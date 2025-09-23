
export const STATIC_MACHINE_TYPES: {label: string, value: string}[] = [
    {
        label: "Drilling",
        value: "Drilling"
    },
    {
        label: "Turning",
        value: "Turning"
    },
    {
        label: "Milling",
        value: "Milling"
    },
    {
        label: "Grinding",
        value: "Grinding"
    },
    {
        label: "Boring",
        value: "Boring"
    },
    {
        label: "Broaching",
        value: "Broaching"
    },
    {
        label: "Sawing",
        value: "Sawing"
    }
]

export const STATIC_MACHINE_CATEGORIES: {label: string, value: string}[] = [
    {
        label: "3 Axis CNC",
        value: "3 Axis CNC"
    },
    {
        label: "4 Axis CNC",
        value: "4 Axis CNC"
    },
    {
        label: "5 Axis CNC",
        value: "5 Axis CNC"
    },
    {
        label: "6 Axis CNC",
        value: "6 Axis CNC"
    },
    {
        label: "Vertical Machining Center",
        value: "Vertical Machining Center"
    },
    {
        label: "Horizontal Machining Center",
        value: "Horizontal Machining Center"
    },
    {
        label: "CNC Lathe",
        value: "CNC Lathe"
    },
    {
        label: "CNC Swiss Lathe",
        value: "CNC Swiss Lathe"
    },
    {
        label: "CNC Router",
        value: "CNC Router"
    },
    {
        label: "CNC Grinding Machine",
        value: "CNC Grinding Machine"
    },
    {
        label: "CNC Broaching Machine",
        value: "CNC Broaching Machine"
    },
    {
        label: "CNC Bandsaw Machine",
        value: "CNC Bandsaw Machine"
    },
    {
        label: "CNC Cold Saw Machine",
        value: "CNC Cold Saw Machine"
    }
]




export const MachineFamily: Record<string, any> = {
	'CNC Lathe': [
		{ sub_type: 'Standard 2-Axis Lathe', inputs: ['2 Axis'] },
		{ sub_type: 'Turn-Mill Center', inputs: ['3 Axis', '4 Axis', '5 Axis'] },
		{
			sub_type: 'Swiss-Type Lathe',
			inputs: ['5 Axis', '6 Axis', '7 Axis', '9 Axis'],
		},
		{
			sub_type: 'Multi-Spindle Lathe',
			inputs: [
				'3 Axis per spindle',
				'4 Axis per spindle',
				'5 Axis per spindle',
			],
		},
	],
	'CNC Milling': [
		{ sub_type: 'VMC', inputs: ['3 Axis', '4 Axis', '5 Axis'] },
		{ sub_type: 'HMC', inputs: ['4 Axis', '5 Axis'] },
		{ sub_type: 'HBM', inputs: ['3 Axis', '4 Axis', '5 Axis'] },
	],
	'CNC Multi-Axis / Machining Center': [
		{ sub_type: 'VMC', inputs: ['4 Axis', '5 Axis', '7 Axis'] },
		{ sub_type: 'HMC', inputs: ['4 Axis', '5 Axis', '7 Axis'] },
		{ sub_type: 'HBM', inputs: ['4 Axis', '5 Axis', '7 Axis'] },
	],
};