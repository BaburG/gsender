import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from 'app/components/shadcn/Popover.tsx';
import { FaPaperPlane } from 'react-icons/fa6';
import { Button } from 'app/components/Button';
import { UnitInput } from 'app/components/UnitInput';
import { DROPosition } from 'app/features/DRO/utils/DRO.ts';
import { Switch } from 'app/components/shadcn/Switch.tsx';
import { useState } from 'react';

interface GotoProps {
    units: string;
    wpos: DROPosition;
}

export function GoTo({ units, wpos }: GotoProps) {
    const [movementMode, setMovementMode] = useState(false);
    const [movementPos, setMovementPos] = useState({
        x: 0,
        y: 0,
        z: 0,
        a: 0,
        b: 0,
        c: 0,
    });

    const onToggleSwap = () => {
        setMovementMode(!movementMode);
        console.log(movementMode);
    };

    return (
        <Popover>
            <PopoverTrigger className="border rounded hover:opacity-90 py-1 px-3 shadow border-robin-500 text-white bg-robin-500">
                <FaPaperPlane />
            </PopoverTrigger>
            <PopoverContent className="bg-white">
                <div className="w-full gap-2 flex flex-col">
                    <h1>Go To Location</h1>
                    <UnitInput units={units} label="X" value={wpos.x} />
                    <UnitInput units={units} label="Y" value={wpos.y} />
                    <UnitInput units={units} label="Z" value={wpos.z} />
                    <UnitInput units="deg" label="A" value={wpos.a} />
                    <div className="flex flex-row text-sm text-gray-400 justify-between">
                        <span>G90</span>
                        <Switch onClick={onToggleSwap} />
                        <span>G91</span>
                    </div>
                    <Button color="primary">Go!</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
