import { ALL_INTERVALS, Interval } from "@/core/definitions/intervals.definition";
import { useEffect, useState } from "react";
import { IntervalUtils } from "@/core/utils/intervals.utils";
import { ifClass } from "@/shared/utils/react-dom-utils";
import { CheckSquare, Square } from "lucide-react";

type IntervalsSelectorProps = {
    initialSelectedIntervals?: Interval[]
    intervalUpdated?: (intervals: Interval[]) => void
    activateOnly?: boolean;
}

export default function IntervalsSelector({
                                              initialSelectedIntervals,
                                              intervalUpdated,
                                              activateOnly
                                          }: IntervalsSelectorProps) {
    const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>(initialSelectedIntervals ?? []);
    const toggleInterval = (interval: Interval) => {
        if (!selectedIntervals.includes(interval)) {
            setSelectedIntervals([...selectedIntervals, interval]);
        } else if (!activateOnly) {
            setSelectedIntervals(selectedIntervals.filter((i) => i !== interval));
        }
    };
    useEffect(() => {
        if (intervalUpdated) {
            intervalUpdated(selectedIntervals);
        }
    }, [intervalUpdated, selectedIntervals])
    const intervalColSpan = (interval: Interval): string => {
        switch (interval) {
            case Interval.Octave:
            case Interval.Unison:
                return "col-span-4";
            case Interval.Tritone:
                return "col-span-2";
            default:
                return "col-span-1";
        }
    }
    const selectAllIntervals = () => {
        setSelectedIntervals(ALL_INTERVALS);
    }
    const deselectAllIntervals = () => {
        setSelectedIntervals([]);
    }
    return (
      <div className="flex flex-col gap-2 intervals-selector">
          <div className="grid grid-cols-4 gap-4">
              <div className="intervals-selector-item col-span-2" onClick={selectAllIntervals}>
                  <div className="text-center"><CheckSquare className="w-5 h-5 text-green-600" color={"var(--theme-grey)"}/>Select All</div>
              </div>
              <div className="intervals-selector-item col-span-2" onClick={deselectAllIntervals}>
                  <div className="text-center"><Square className="w-5 h-5 text-gray-600" color={"var(--theme-grey)"}/>Deselect All</div>
              </div>
              {ALL_INTERVALS.map((interval) => (
                <div key={interval}
                     className={`${intervalColSpan(interval)} intervals-selector-item  ${ifClass(selectedIntervals.includes(interval), "selected")}`}
                     onClick={() => {
                         toggleInterval(interval)
                     }}>
                    <div className="text-center">{IntervalUtils.getIntervalName(interval)}</div>
                </div>

              ))}
          </div>
      </div>
    );
}
