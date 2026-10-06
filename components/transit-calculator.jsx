"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Gauge, MapPin, Route as RouteIcon, Timer } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { towns, routeDistance, estimateTransit } from "@/lib/places";
import { corridors } from "@/lib/corridors";
import { formatKm, formatDuration, cn } from "@/lib/utils";

const findId = (name) => towns.find((t) => t.name === name)?.id;

export default function TransitCalculator() {
  const [from, setFrom] = useState("johannesburg");
  const [to, setTo] = useState("durban");

  const result = useMemo(() => routeDistance(from, to), [from, to]);
  const est = useMemo(() => (result ? estimateTransit(result.km) : null), [result]);
  const corridor = useMemo(() => corridors.find((c) => c.from === from && c.to === to), [from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const valid = from !== to;

  return (
    <Card className="overflow-hidden">
      <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div className="grid gap-1.5">
              <Label className="text-[13px] font-bold">From</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger aria-label="Collection town">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {towns.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                      {t.province ? ` · ${t.province}` : ` · ${t.country}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={swap}
              aria-label="Swap origin and destination"
              className="mb-0.5 hidden h-11 w-11 rounded-full sm:inline-flex"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="grid gap-1.5">
              <Label className="text-[13px] font-bold">To</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger aria-label="Delivery town">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {towns.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                      {t.province ? ` · ${t.province}` : ` · ${t.country}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/50 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Road distance</span>
              <Badge variant={result?.source === "known" ? "ink" : "outline"}>
                {result?.source === "known" ? "Known corridor" : "Estimate"}
              </Badge>
            </div>
            <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">
              {valid && result ? formatKm(result.km) : "—"}
            </p>
            {valid && result && (
              <p className="mt-1 text-sm text-muted-foreground">
                {result.road}
                {result.from.crossBorder || result.to.crossBorder ? " · cross-border — clearing time applies" : ""}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/#quote" className={cn(buttonVariants({ variant: "ink" }), "h-11 px-6")}>
              Get a price for this route
            </Link>
            <Link href="/corridors" className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}>
              Corridor guides
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {!valid ? (
            <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              Choose two different towns to see a transit estimate.
            </p>
          ) : (
            <>
              <Rows
                rows={[
                  { icon: Gauge, label: "Average truck speed used", value: `${est.speed} km/h` },
                  { icon: Timer, label: "Driving time (before statutory breaks)", value: formatDuration(est.driving) },
                  { icon: RouteIcon, label: "Typical door-to-door transit", value: formatDuration(est.transit) },
                  { icon: MapPin, label: "Planning band", value: est.days === 1 ? (est.wheelTime <= 4.5 ? "Same day possible" : "Next day") : `${est.days} days` },
                ]}
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Estimates assume a loaded truck, statutory rest breaks after every 4.5 hours of driving and normal loading
                windows. Weather, roadworks, terminal queues and cross-border clearance can extend transit — your quote
                confirms the date we will commit to.
              </p>
              {corridor && (
                <Link href={`/corridors/${corridor.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground underline decoration-amber decoration-2 underline-offset-4">
                  Read the {corridor.title} corridor guide <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Rows({ rows }) {
  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
      {rows.map(({ icon: Icon, label, value }) => (
        <li key={label} className="flex items-center gap-4 px-5 py-4">
          <Icon className="h-5 w-5 shrink-0 text-amber" strokeWidth={1.8} />
          <span className="flex-1 text-sm text-muted-foreground">{label}</span>
          <span className="font-display text-base font-extrabold tabular-nums">{value}</span>
        </li>
      ))}
    </ul>
  );
}
