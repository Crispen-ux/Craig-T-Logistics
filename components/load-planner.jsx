"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Boxes, Weight, Ruler } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vehicles, vehicleNotes, palletArea } from "@/lib/fleet";
import { cn } from "@/lib/utils";

export default function LoadPlanner() {
  const [pallets, setPallets] = useState(12);
  const [weight, setWeight] = useState(8);
  const [palletType, setPalletType] = useState("euro");
  const [stackHeight, setStackHeight] = useState("1.2");

  const volume = useMemo(
    () => (pallets > 0 ? pallets * palletArea[palletType] * parseFloat(stackHeight) : 0),
    [pallets, palletType, stackHeight]
  );

  const matches = useMemo(() => {
    return vehicles
      .filter((v) => v.spec.palletsN > 0 && v.spec.palletsN >= pallets && v.spec.payloadT >= weight && v.spec.volumeM3 >= volume * 0.92)
      .sort((a, b) => a.spec.payloadT - b.spec.payloadT);
  }, [pallets, weight, volume]);

  const primary = matches[0];
  const alternatives = matches.slice(1, 3);
  const oversize = !primary && (pallets > 42 || weight > 30);
  const partLoad = pallets < 20 && weight < 15;

  return (
    <Card className="overflow-hidden">
      <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="pallets" className="flex items-center gap-2 text-[13px] font-bold">
                <Boxes className="h-4 w-4 text-amber" /> Number of pallets
              </Label>
              <Input id="pallets" type="number" min={1} max={200} value={pallets} onChange={(e) => setPallets(Math.max(0, +e.target.value))} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="weight" className="flex items-center gap-2 text-[13px] font-bold">
                <Weight className="h-4 w-4 text-amber" /> Total weight (tons)
              </Label>
              <Input id="weight" type="number" min={0} max={80} step="0.5" value={weight} onChange={(e) => setWeight(Math.max(0, +e.target.value))} />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-[13px] font-bold">Pallet type</Label>
              <Select value={palletType} onValueChange={setPalletType}>
                <SelectTrigger aria-label="Pallet type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="euro">Euro pallet (1200 × 800 mm)</SelectItem>
                  <SelectItem value="industrial">Industrial pallet (1200 × 1000 mm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="flex items-center gap-2 text-[13px] font-bold">
                <Ruler className="h-4 w-4 text-amber" /> Loaded height
              </Label>
              <Select value={stackHeight} onValueChange={setStackHeight}>
                <SelectTrigger aria-label="Loaded height">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Standard — 1.2 m</SelectItem>
                  <SelectItem value="1.6">High stack — 1.6 m</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/50 p-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Volume you are asking for</span>
            <p className="mt-1 font-display text-4xl font-extrabold tracking-tight tabular-nums">{volume.toFixed(1)} m³</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {pallets} × {palletArea[palletType]} m² × {stackHeight} m — single deck, no aisle space.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/fleet" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}>
              See the full vehicle guide
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {oversize ? (
            <div className="rounded-2xl border border-dashed border-border p-6">
              <h4 className="font-display text-lg font-extrabold">This load needs more than one vehicle</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                At {pallets} pallets and {weight} t it exceeds a single standard trailer. We will split it across two
                departures or use a super link where the route allows — send the details and we will plan it.
              </p>
            </div>
          ) : primary ? (
            <>
              <div className="rounded-2xl border-2 border-amber bg-primary/10 p-6">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-amber" /> Best fit
                </div>
                <h4 className="mt-2 font-display text-2xl font-extrabold">{primary.type}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{primary.best}</p>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["Payload", primary.payload],
                    ["Volume", primary.volume],
                    ["Pallets", primary.pallets],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-card p-3 shadow-soft dark:bg-muted/40">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{k}</dt>
                      <dd className="mt-1 text-xs font-bold leading-tight">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={partLoad ? "secondary" : "ink"}>
                  {partLoad ? "Part load likely cheapest" : "Full truck load"}
                </Badge>
                <Badge variant="outline">{partLoad ? "Consolidated weekly departures" : "Dedicated vehicle"}</Badge>
              </div>

              {alternatives.length > 0 && (
                <div className="rounded-2xl border border-border p-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Also suitable</span>
                  <ul className="mt-3 space-y-2">
                    {alternatives.map((v) => (
                      <li key={v.key} className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="font-semibold">{v.type}</span>
                        <span className="text-muted-foreground">{v.payload}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/#quote" className={cn(buttonVariants({ variant: "default" }), "h-11 px-6")}>
                Quote this load <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              Enter your pallet count and weight to see the recommended vehicle.
            </div>
          )}

          <ul className="space-y-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            {vehicleNotes.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
