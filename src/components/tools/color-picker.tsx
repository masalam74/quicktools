'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Palette, Copy, Shuffle, Droplets, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// ─── Color Conversion Helpers ────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

// ─── Copy Button Sub-component ───────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const { toast } = useToast();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copied!',
        description: `"${text}" copied to clipboard`,
        duration: 2000,
      });
    });
  }, [text, toast]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0 text-muted-foreground hover:text-emerald-600"
      onClick={handleCopy}
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
}

// ─── Conversion Row Sub-component ────────────────────────────────────────────

function ConversionRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <Icon className="h-4 w-4 shrink-0 text-emerald-600" />
        <Badge variant="outline" className="shrink-0 border-emerald-200 text-emerald-700 text-xs font-medium">
          {label}
        </Badge>
        <span className="font-mono text-sm text-foreground truncate">{value}</span>
      </div>
      <CopyButton text={value} />
    </div>
  );
}

// ─── Slider Row Sub-component ────────────────────────────────────────────────

function SliderRow({
  label,
  value,
  max = 255,
  onChange,
  displayValue,
}: {
  label: string;
  value: number;
  max?: number;
  onChange: (val: number) => void;
  displayValue?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span className="text-sm font-mono text-emerald-600 font-medium">
          {displayValue ?? value}
        </span>
      </div>
      <Slider
        value={[value]}
        max={max}
        min={0}
        step={1}
        onValueChange={([v]) => onChange(v)}
        className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-emerald-400 [&_[role=slider]]:shadow-sm [&>span:first-child]:bg-emerald-200 [&>span:first-child]:h-2"
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ColorPicker() {
  const { toast } = useToast();
  const [hex, setHex] = useState('#10b981');
  const [alpha, setAlpha] = useState(100);
  const [hexInput, setHexInput] = useState('#10b981');

  const rgb = useMemo(() => hexToRgb(hex) ?? { r: 0, g: 0, b: 0 }, [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
  const hsv = useMemo(() => rgbToHsv(rgb.r, rgb.g, rgb.b), [rgb]);

  const hexUpper = hex.toUpperCase();

  const hexWithAlpha = alpha < 100
    ? `${hexUpper}${Math.round((alpha / 100) * 255).toString(16).padStart(2, '0').toUpperCase()}`
    : hexUpper;

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const rgbaString = alpha < 100
    ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(alpha / 100).toFixed(2)})`
    : rgbString;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hslaString = alpha < 100
    ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${(alpha / 100).toFixed(2)})`
    : hslString;
  const hsvString = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;

  const handleColorPickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    setHexInput(val);
  }, []);

  const handleHexInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setHexInput(val);
    let clean = val;
    if (!clean.startsWith('#')) clean = '#' + clean;
    if (isValidHex(clean)) {
      let normalized = clean.length === 4
        ? `#${clean[1]}${clean[1]}${clean[2]}${clean[2]}${clean[3]}${clean[3]}`
        : clean;
      setHex(normalized);
    }
  }, []);

  const handleRgbSliderChange = useCallback((channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHexInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }, [rgb]);

  const handleRandomColor = useCallback(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const newHex = rgbToHex(r, g, b);
    setHex(newHex);
    setHexInput(newHex);
    toast({
      title: 'Random Color!',
      description: `Generated ${newHex.toUpperCase()}`,
      duration: 2000,
    });
  }, [toast]);

  // Checkerboard background for transparency preview
  const checkerboardBg = `
    linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
  `;

  return (
    <Card className="w-full max-w-2xl mx-auto border-emerald-200 shadow-lg">
      <CardContent className="space-y-6 pt-6">
        {/* ── Color Picker & Preview Row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Native color input */}
          <div className="flex flex-col items-center gap-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">1. Choose Color</Label>
            <input
              type="color"
              value={hex}
              onChange={handleColorPickerChange}
              className="h-[88px] w-[88px] rounded-lg border-2 border-emerald-200 cursor-pointer bg-transparent p-1 hover:border-emerald-400 transition-colors"
            />
          </div>

          {/* Color swatch preview */}
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Selected Color</Label>
            <div className="w-full h-[88px] rounded-lg border-2 border-emerald-200 relative overflow-hidden">
              {/* Checkerboard layer for transparency */}
              {alpha < 100 && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
                    background: checkerboardBg,
                  }}
                />
              )}
              {/* Color layer */}
              <div
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: hex, opacity: alpha / 100 }}
              />
            </div>
          </div>

          {/* Random color button */}
          <div className="flex flex-col items-center gap-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide invisible">Action</Label>
            <Button
              onClick={handleRandomColor}
              variant="outline"
              className="h-[88px] w-[104px] rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-400 flex flex-col gap-1.5 transition-colors"
            >
              <Shuffle className="h-6 w-6" />
              <span className="text-xs font-medium">Random Color</span>
            </Button>
          </div>
        </div>

        <Separator className="bg-emerald-100" />

        {/* ── HEX Input ── */}
        <div className="space-y-2">
          <Label htmlFor="hex-input" className="text-sm font-medium text-foreground">
            HEX Value
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="hex-input"
              value={hexInput}
              onChange={handleHexInputChange}
              placeholder="#000000"
              className="font-mono text-lg tracking-wider border-emerald-200 focus-visible:ring-emerald-400 focus-visible:border-emerald-400 max-w-[220px]"
              maxLength={7}
            />
            <CopyButton text={hexWithAlpha} />
          </div>
        </div>

        <Separator className="bg-emerald-100" />

        {/* ── RGB Sliders ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-emerald-600" />
            <Label className="text-sm font-semibold text-foreground">RGB Channels</Label>
          </div>

          <div className="space-y-3 p-4 rounded-lg border border-emerald-100 bg-emerald-50/30">
            <SliderRow
              label="Red"
              value={rgb.r}
              onChange={(v) => handleRgbSliderChange('r', v)}
              displayValue={`${rgb.r}`}
            />
            <SliderRow
              label="Green"
              value={rgb.g}
              onChange={(v) => handleRgbSliderChange('g', v)}
              displayValue={`${rgb.g}`}
            />
            <SliderRow
              label="Blue"
              value={rgb.b}
              onChange={(v) => handleRgbSliderChange('b', v)}
              displayValue={`${rgb.b}`}
            />
          </div>
        </div>

        <Separator className="bg-emerald-100" />

        {/* ── Alpha / Opacity Slider ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-emerald-600" />
            <Label className="text-sm font-semibold text-foreground">Opacity / Alpha</Label>
            <Badge variant="outline" className="border-emerald-200 text-emerald-700 text-xs ml-auto">
              {alpha}%
            </Badge>
          </div>

          <div className="space-y-3 p-4 rounded-lg border border-emerald-100 bg-emerald-50/30">
            <Slider
              value={[alpha]}
              max={100}
              min={0}
              step={1}
              onValueChange={([v]) => setAlpha(v)}
              className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-emerald-400 [&_[role=slider]]:shadow-sm [&>span:first-child]:bg-emerald-200 [&>span:first-child]:h-2"
            />
            {/* Opacity preview bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-8">0%</span>
              <div className="flex-1 h-8 rounded-md border border-emerald-100 relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0',
                    background: checkerboardBg,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, transparent, ${hex})`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-10 text-right">100%</span>
            </div>
          </div>
        </div>

        <Separator className="bg-emerald-100" />

        {/* ── Color Conversions ── */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Color Conversions</Label>
          <div className="grid gap-2">
            <ConversionRow label="HEX" value={hexWithAlpha} icon={Palette} />
            <ConversionRow label="RGB" value={rgbaString} icon={Droplets} />
            <ConversionRow label="HSL" value={hslaString} icon={Sun} />
            <ConversionRow label="HSV" value={hsvString} icon={Shuffle} />
          </div>
        </div>

        {/* ── Quick Reference Swatches ── */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Quick Reference</Label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: 'HEX', bg: hex, opacity: 1 },
              { label: 'R', bg: `rgb(${rgb.r}, 0, 0)`, opacity: 1 },
              { label: 'G', bg: `rgb(0, ${rgb.g}, 0)`, opacity: 1 },
              { label: 'B', bg: `rgb(0, 0, ${rgb.b})`, opacity: 1 },
              { label: 'α', bg: hex, opacity: alpha / 100 },
            ].map((swatch) => (
              <div key={swatch.label} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-full aspect-square rounded-lg border border-emerald-200 relative overflow-hidden"
                >
                  {swatch.label === 'α' && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0',
                        background: checkerboardBg,
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: swatch.bg, opacity: swatch.opacity }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{swatch.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}