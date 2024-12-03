import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NumberTicker from "../ui/number-ticker";

function Stats({ value, text }) {
  return (
    <Card className="bg-white shadow-lg p-3 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 pointer-events-none bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl sm:text-6xl font-semibold text-black">
          <NumberTicker value={value} />+
        </CardTitle>
        <CardDescription className="text-gray-500 text-base flex flex-col items-center">
        {text}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default Stats;
